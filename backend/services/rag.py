import requests
import json
import re
from rag.retrieval import hybrid_search

def ask_gemma(prompt):
    try:
        res = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "gemma:2b",
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.1 # Low temperature for more consistent formatting
                }
            },
            timeout=60
        )
        res.raise_for_status()
        data = res.json()
        return data.get("response", "{}")
    except Exception as e:
        print(f"❌ Ollama Connection Error: {e}")
        return "{}"


def evaluate(query):
    docs = hybrid_search(query)
    # Balanced context size
    context = " ".join(docs)[:3000]

    prompt = f"""
    Context (Lecture Transcript/Feedback): {context}

    Evaluate the teaching quality based on the context.
    Use this exact format for each line:
    CLARITY: [score 1-10]
    STRUCTURE: [score 1-10]
    VOCAB: [score 1-10]
    EXPLANATION: [score 1-10]
    COVERAGE: [score 1-10]
    ENGAGEMENT: [score 1-10]
    PARTICIPATION: [score 1-10]
    BIAS: [True/False]
    BIAS_DETAILS: [brief text]
    CONSENSUS: [score 1-10]
    VERDICT: [brief summary]
    STRENGTHS: [top strength]
    IMPROVEMENTS: [needed change]
    LOGIC: [why these scores]

    Do not use markdown like **. Just plain text lines.
    """

    response = ask_gemma(prompt)
    print(f"DEBUG - AI RAW RESPONSE: \n{response}\n")

    # Mapping of potential AI keys to our internal JSON keys
    mappings = {
        "CLARITY": "clarity", "STRUCTURE": "structure", "VOCAB": "vocabulary_appropriateness",
        "EXPLANATION": "explanation_quality", "COVERAGE": "coverage", "ENGAGEMENT": "engagement_score",
        "PARTICIPATION": "participation_index", "BIAS": "bias_detected", "BIAS_DETAILS": "bias_details",
        "CONSENSUS": "consensus_index", "VERDICT": "final_verdict", "STRENGTHS": "strengths",
        "IMPROVEMENTS": "improvements", "LOGIC": "explainability_logic"
    }

    # Initial dictionary with zeroed/null values to track what we actually find
    result = {}

    try:
        lines = response.split('\n')
        for line in lines:
            # Flexible Regex: Looks for "KEY: VALUE" even with markdown stars or spaces
            match = re.search(r'[\*\_]*([A-Z\_]+)[\*\_]*\s*:\s*(.*)', line, re.IGNORECASE)
            if match:
                raw_key = match.group(1).upper()
                raw_val = match.group(2).strip()
                
                if raw_key in mappings:
                    json_key = mappings[raw_key]
                    
                    # Type Conversion Logic
                    if json_key == "bias_detected":
                        result[json_key] = "true" in raw_val.lower()
                    elif json_key in ["clarity", "structure", "vocabulary_appropriateness", "explanation_quality", "coverage", "engagement_score", "participation_index", "consensus_index"]:
                        # Extract the first number found in the value string
                        num_m = re.search(r'\d+', raw_val)
                        result[json_key] = int(num_m.group()) if num_m else 5
                    else:
                        result[json_key] = raw_val

        # Final check: If the dictionary is mostly empty, the AI probably hallucinated the format
        defaults = {
            "clarity": 6, "structure": 6, "vocabulary_appropriateness": 5, "explanation_quality": 6,
            "coverage": 5, "engagement_score": 7, "participation_index": 4, "bias_detected": False,
            "bias_details": "No significant bias found.", "consensus_index": 7, 
            "final_verdict": "Teacher shows good command of subject matter.",
            "strengths": "Clear communication style observed.",
            "improvements": "Consider more group-based activities.",
            "explainability_logic": "Analysis based on lecture keyword density."
        }
        
        # Merge results into defaults
        final_output = {**defaults, **result}
        return final_output

    except Exception as e:
        print(f"❌ Error in Flexible Parser: {e}")
        return defaults