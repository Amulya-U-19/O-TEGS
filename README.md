# 🧠 O-TEGS: Offline Teacher Evaluation & Growth Suite

> 🚀 An AI-powered, fully offline system to evaluate teaching quality using video lectures, speech-to-text, and RAG-based analysis.

---

## 📌 Overview

O-TEGS (Offline Teacher Evaluation & Growth Suite) is an end-to-end AI system designed to **evaluate teacher performance beyond traditional metrics** like exam scores.

It analyzes:
- 🎥 Lecture videos
- 🗣️ Speech-to-text transcripts
- 📊 Student feedback (CSV)

And produces:
- 📈 Teaching quality scores
- 🧠 AI-generated insights
- 📌 Actionable improvement suggestions

---

## 🎯 Problem Statement

Traditional teacher evaluation systems:
- Rely heavily on exam results
- Lack qualitative teaching analysis
- Are often biased and inconsistent

👉 O-TEGS solves this by providing:
- Objective AI-driven evaluation
- Multi-modal analysis (video + feedback)
- Fully offline & privacy-preserving system

---

## ⚙️ Core Features

✅ Offline speech-to-text (no internet required)  
✅ RAG-based evaluation using local LLM (Gemma via Ollama)  
✅ Vector database (ChromaDB) for semantic understanding  
✅ Student feedback analysis (CSV upload)  
✅ Teaching quality scoring system  
✅ Actionable improvement suggestions  

---

## 🧠 System Architecture
[Lecture Videos]
↓
[Speech-to-Text Engine]
↓
[Transcripts]
↓
[ChromaDB Vector Store]
↓
[RAG Pipeline (Ollama - Gemma 2B)]
↓
[Evaluation Engine]
↓
[Insights + Scores + Suggestions]

---

## 🛠️ Tech Stack

### 💻 Frontend
- React.js
- Tailwind CSS

### ⚙️ Backend
- Flask (Python)

### 🧠 AI/ML
- Ollama (Gemma 2B LLM)
- RAG (Retrieval-Augmented Generation)
- ChromaDB (Vector Database)

### 🎙️ Speech Processing
- Whisper / Vosk (Offline STT)

### 📊 Data Handling
- Pandas
- CSV Processing

---

## 📂 Project Structure
```
O-TEGS/
│── backend/
│ ├── app.py # Flask backend
│ ├── rag_engine.py # RAG pipeline logic
│ ├── stt.py # Speech-to-text processing
│ ├── evaluation.py # Teacher scoring logic
│ └── utils/
│
│── frontend/
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── pages/ # Screens (Upload, Dashboard)
│ │ └── App.js
│
│── data/
│ ├── videos/ # Uploaded lecture videos
│ ├── transcripts/ # Generated transcripts
│ └── feedback/ # Student CSV data
│
│── chroma_db/ # Vector database storage
│
│── models/ # Local LLM / embeddings
│
│── requirements.txt
│── README.md
```
---

## 🔄 Workflow

1. Upload lecture videos (5–10 recommended)
2. Convert videos → transcripts (offline STT)
3. Store transcripts in ChromaDB
4. Upload student feedback (CSV)
5. Run RAG-based evaluation
6. Generate:
   - Teaching score
   - Strengths & weaknesses
   - Personalized suggestions

---

## 📊 Evaluation Metrics

The system evaluates teachers based on:

- 🗣️ Clarity of explanation
- 📚 Concept depth
- 🔁 Engagement level
- 🧩 Structure & flow
- 💬 Student feedback sentiment

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Chandanakt/O-TEGS.git
cd O-TEGS
```
### 2️⃣ Backend Setup
```
cd backend
pip install -r requirements.txt
python app.py
```
### 3️⃣ Frontend Setup
```
cd frontend
npm install
npm start
```
### 4️⃣ Run Ollama (Gemma)
```
ollama run gemma:2b
🧪 Sample Input
🎥 Lecture videos (MP4)
📄 Student feedback CSV:
student_id,feedback
1,"Good explanation but fast"
2,"Very engaging session"
📈 Output Example
Teacher Score: 8.2 / 10
```

Strengths:
✔ Clear explanations
✔ Strong subject knowledge

Weaknesses:
✘ Low student interaction
✘ Fast pace

Suggestions:
→ Add pauses for questions
→ Include real-world examples
🔐 Key Highlights

🔥 100% Offline (Privacy-first)
🔥 No dependency on cloud APIs
🔥 Real-world applicable system
🔥 Scalable for institutions

🆚 How It Stands Out

Unlike typical projects using basic RAG:

Feature	              O-TEGS	 Others
Offline AI	            ✅	    ❌
Multi-modal input     	✅    	❌
Real-world use case	    ✅	    ⚠️
Teacher analytics	      ✅	    ❌

## 📌 Future Improvements
🎯 Real-time classroom evaluation
📹 Emotion detection (face analysis)
📊 Advanced dashboards & analytics
🌐 Multi-language support
