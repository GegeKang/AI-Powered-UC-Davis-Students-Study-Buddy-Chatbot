from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import torch, re

# — Load model/tokenizer once at startup —
MODEL_PATH = "./ucdavis-model-production"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

tokenizer = GPT2Tokenizer.from_pretrained(MODEL_PATH)
model = GPT2LMHeadModel.from_pretrained(MODEL_PATH).to(DEVICE)
model.eval()

# — FastAPI setup —
app = FastAPI(title="UC Davis Q&A Bot API")

# Enable CORS so your React app (likely on localhost:3000) can talk to it
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"],
)

class Query(BaseModel):
    prompt: str

def clean_answer(text: str) -> str:
    # strip any [TOKENS] and return only the first full sentence
    answer = re.sub(r'\[.*?\]', '', text).strip()
    return (answer.split(".")[0] + ".") if "." in answer else answer

@app.post("/generate")
def generate(q: Query):
    input_text = f"[LOC] UC Davis [Q] {q.prompt} [A]"
    inputs = tokenizer.encode(input_text, return_tensors="pt").to(DEVICE)
    try:
        out = model.generate(
            inputs,
            max_length=60,
            temperature=0.7,
            top_k=30,
            top_p=0.95,
            repetition_penalty=1.3,
            no_repeat_ngram_size=3,
            do_sample=True,
            num_beams=2,
            early_stopping=True,
            bad_words_ids=[[tokenizer.encode("http")[0]]],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    text = tokenizer.decode(out[0], skip_special_tokens=True)
    return {"answer": clean_answer(text)}