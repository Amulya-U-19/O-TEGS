import os
import chromadb
import requests
from services.transcribe import transcribe

from services.audio import extract_audio

client = chromadb.PersistentClient(path="data/chroma_db")
collection = client.get_or_create_collection("audio_knowledge")

AUDIO_DIR = "data/audio"
VIDEO_DIR = "data/video"
FEEDBACK_DIR = "data/feedback"

# Ensure directories exist
os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(VIDEO_DIR, exist_ok=True)
os.makedirs(FEEDBACK_DIR, exist_ok=True)

import csv


# 🔹 chunking
def chunk_text(text, size=200):
    words = text.split()
    return [
        " ".join(words[i:i+size])
        for i in range(0, len(words), size)
    ]


# 🔹 embeddings using Ollama
def get_embedding(text):
    try:
        res = requests.post(
            "http://localhost:11434/api/embeddings",
            json={
                "model": "nomic-embed-text",
                "prompt": text
            }
        )
        data = res.json()
        
        if "error" in data:
            raise Exception(f"Ollama Error: {data['error']}. Please run 'ollama pull nomic-embed-text' in your terminal.")
            
        if "embedding" in data:
            return data["embedding"]
        if "embeddings" in data:
            return data["embeddings"][0]
            
        raise KeyError(f"Neither 'embedding' nor 'embeddings' found in Ollama response: {data}")
    except requests.exceptions.ConnectionError:
        raise Exception("Ollama is not running. Please start the Ollama application.")


def ingest():
    # 1. First, process any videos to extract audio
    videos = [f for f in os.listdir(VIDEO_DIR) if f.endswith(('.mp4', '.mkv', '.avi'))]
    for video in videos:
        video_path = os.path.join(VIDEO_DIR, video)
        audio_filename = os.path.splitext(video)[0] + ".wav"
        audio_path = os.path.join(AUDIO_DIR, audio_filename)
        
        if not os.path.exists(audio_path):
            print(f"🎬 Extracting audio from {video}...")
            try:
                extract_audio(video_path, audio_path)
            except Exception as e:
                print(f"❌ Error extracting audio from {video}: {e}")
                continue

    # 2. Process all audio files as before
    files = [f for f in os.listdir(AUDIO_DIR) if f.endswith(".wav")]

    for file in files:
        path = os.path.join(AUDIO_DIR, file)
        
        # Check if already processed (basic check using ID existence)
        peek = collection.get(ids=[f"{file}_0"])
        if peek and peek["ids"]:
            print(f"⏭️ Skipping {file} (Already ingested)")
            continue

        print(f"🎧 Processing {file}")
        try:
            # 🔥 speech → text
            text = transcribe(path)
            chunks = chunk_text(text)

            for i, chunk in enumerate(chunks):
                embedding = get_embedding(chunk)

                collection.add(
                    documents=[chunk],
                    embeddings=[embedding],
                    ids=[f"{file}_{i}"],
                    metadatas=[{"source": file}]
                )
        except Exception as e:
            print(f"❌ Error processing {file}: {e}")

    # 3. Process CSV Feedback
    feedback_files = [f for f in os.listdir(FEEDBACK_DIR) if f.endswith(".csv")]
    for ffile in feedback_files:
        path = os.path.join(FEEDBACK_DIR, ffile)
        print(f"📄 Processing feedback: {ffile}")
        
        try:
            with open(path, mode='r', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for i, row in enumerate(reader):
                    # Combine all row content into a single string for analysis
                    text = " | ".join([f"{k}: {v}" for k, v in row.items()])
                    
                    # Check if already processed
                    row_id = f"feedback_{ffile}_{i}"
                    peek = collection.get(ids=[row_id])
                    if peek and peek["ids"]:
                        continue

                    embedding = get_embedding(text)
                    collection.add(
                        documents=[text],
                        embeddings=[embedding],
                        ids=[row_id],
                        metadatas=[{"source": ffile, "type": "feedback"}]
                    )
        except Exception as e:
            print(f"❌ Error processing CSV {ffile}: {e}")

    print("✅ Ingestion complete")


if __name__ == "__main__":
    ingest()