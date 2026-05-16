import chromadb
import requests

client = chromadb.PersistentClient(path="data/chroma_db")
collection = client.get_or_create_collection("audio_knowledge")


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


def search(query):
    embedding = get_embedding(query)

    results = collection.query(
        query_embeddings=[embedding],
        n_results=5
    )

    return results["documents"][0]


def hybrid_search(query):
    docs = search(query)

    # keyword boost
    return sorted(
        docs,
        key=lambda x: query.lower() in x.lower(),
        reverse=True
    )