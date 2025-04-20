# 🚀 HackDavis 2025 Project: AI-Powered UC Davis Students' Study Buddy Chatbot 🤝📚🧑‍🎓

An AI-powered chatbot that provides personalized, real-time recommendations to UC Davis students based on their everyday queries.

---

## 📚 Table of Contents

- [📌 Overview](#-overview)
- [🛠️ Built With](#️-built-with)
- [📥 Getting Started](#-getting-started)
  - [📋 Dependencies](#-dependencies)
  - [🔧 Installing](#-installing)
- [🧠 How the Model Works & How to Set It Up](#-how-the-model-works--how-to-set-it-up)
- [▶️ Executing Program](#️-executing-program)
- [👥 Team](#-team)
- [🗣️ Communication](#️-communication)
- [🛠 Development Progress](#-development-progress)
- [🚀 Future Enhancements](#-future-enhancements)
- [🎯 Summary](#-summary)
- [✨ Final Note](#-final-note)

---

## 📌 Overview

UC Davis Study Buddy is a full-stack **generative AI web application** designed to help students navigate campus life more effectively. It offers intelligent recommendations for study resources, food, entertainment, mental health, and social updates — acting as a one-stop solution for the UC Davis community.

### Key Features
- **🧋 Entertainment**: "I want to drink boba, recommend me a place."
- **📘 Study**: "I need a quiet study spot on or off-campus."
- **🧠 Mental Health**: "I'm feeling overwhelmed. Where can I relax?"
- **🎶 Music**: "I want some soft music to concentrate on homework."
- **🍔 Food**: "I want a burger. Where should I eat?"
- **📢 Social Hub**: "Letting students know about live events, like 'ducks near the Silo!'"

---

## 🛠️ Built With

- **Python 3.12** — Core programming language
- **Hugging Face Transformers** — Fine-tuning `distilgpt2` generative model
- **PyTorch** — Model training and inference
- **FastAPI** — Lightweight backend server for model interaction
- **Gradio** — Frontend web UI for user-friendly chatbot interface
- **Apple Silicon MPS Backend** — Mac M1/M2/M3 hardware acceleration
- **VSCode** — Primary development environment
- **MacOS Local Deployment** — Fully local model training and hosting

---

## 📥 Getting Started

### 📋 Dependencies

Make sure you have the following installed:
- Python 3.9–3.12
- Pip3
- Required Python packages:

```bash
pip3 install torch transformers fastapi uvicorn gradio requests accelerate
```

Or install from the provided `requirements.txt`:

```bash
pip3 install -r requirements.txt
```

> 💡 Ensure you are using the correct Python environment (not Conda `(base)` unless configured).

---

### 🔧 Installing

1. Clone the repository:

```bash
git clone https://github.com/GegeKang/AI-Powered-UC-Davis-Students-Study-Buddy-Chatbot.git
cd AI-Powered-UC-Davis-Students-Study-Buddy-Chatbot
```

2. (Optional but recommended) Create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

3. Make sure the fine-tuned model folder (`ucdavis-model-production/`) is present inside the project directory.

---

## 🧠 How the Model Works & How to Set It Up

Our chatbot is powered by a **fine-tuned `distilgpt2` model** trained on UC Davis-specific datasets.

### How We Built the Model:

1. **Training Dataset**:
   - A custom `d3.txt` file containing UC Davis locations, study spaces, restaurants, and entertainment spots.
2. **Fine-tuning**:
   - Using Hugging Face's `distilgpt2` model via PyTorch + Transformers library.
   - Trained locally for 40 epochs on an Apple Silicon MacBook (M1/M2) with MPS acceleration.
3. **Saving Model**:
   - The trained model files are saved inside the `ucdavis-model-production/` directory.

---

### 🛠 How to Get the Model Working on Your Machine:

1. Make sure you have the `ucdavis-model-production/` folder inside the project.
   > (It contains `pytorch_model.bin`, `config.json`, `special_tokens_map.json`, etc.)

2. If you don't have the folder:
   - Retrain the model locally using the provided script `ucd_server.py`
   - OR ask the team for a zip file of the trained model.

3. Model loading is handled automatically in the backend:
   - When you start `backend_server.py`, it loads the fine-tuned model from `ucdavis-model-production/`.

✅ No manual steps required after putting the model folder correctly!

---

### ❗ Important Note:

- Make sure your environment has enough memory to load `distilgpt2`.
- If you encounter memory issues, reduce batch size or fine-tune using `distilgpt2` instead of larger GPT-2 models.

---

## ▶️ Executing Program

**Step-by-Step:**

1. **Start Backend Server** (Terminal 1):
   ```bash
   uvicorn backend_server:app --reload --port 8000
   ```

2. **Start Frontend Web UI** (Terminal 2):
   ```bash
   python3 frontend_ui.py
   ```

3. **Interact with the Assistant**:
   - Open your browser at [http://127.0.0.1:7860](http://127.0.0.1:7860)
   - Enter your query into the chatbot box.
   - Instantly receive UC Davis-specific recommendations!

---

## 👥 Team

| Name | Email |
|:---|:---|
| Aliyah A | alazizi@ucdavis.edu |
| Gezheng K | gzkang@ucdavis.edu |
| Mark L | ltble@ucdavis.edu |
| Vivian S | vjsun@ucdavis.edu |

---

## 🗣️ Communication

Collaboration and communication throughout the project was maintained via our [Google Colab Development Space](https://colab.research.google.com/drive/1xd8s3wGSvPnfv4rlWHUSXP08Vzx9xdP4?usp=sharing).

---

## 🛠 Development Progress

View our working scripts, model experimentation, and overall project progress on [Google Colab Project Workspace](https://colab.research.google.com/drive/1E2UqUssxm1ouwbwJL_IxvNAXbC3HhQoD?usp=sharing).

---

## 🚀 Future Enhancements

1. **User Accounts** — Implement authentication for personalized recommendations.
2. **Real-Time Social Hub** — Add real-time live event posting and notifications.
3. **API Integration** — Connect to official UC Davis APIs for campus map data and event updates.
4. **Mobile App** — Develop a lightweight mobile version for iOS and Android.

---

## 🎯 Summary

✅ Built a **localized generative AI chatbot** customized for UC Davis students.  
✅ Fine-tuned and deployed Hugging Face `distilgpt2` **fully locally** using PyTorch and FastAPI.  
✅ Delivered a **production-ready** web experience using Gradio UI.

---

## ✨ Final Note

Thank you for exploring our project! 🌟  
We hope this Study Buddy assistant improves the daily lives of UC Davis students, and we look forward to expanding it in the future.

---
