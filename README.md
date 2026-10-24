# 🪟 Windows AI Portfolio OS (ChatFolio)

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Groq](https://img.shields.io/badge/LLM-Groq%20LLaMA%203.3-F05032)](https://groq.com/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=black)](https://render.com/)

> An interactive, Windows 11-style web operating system portfolio powered by a **FastAPI backend** and **Groq LLaMA-3.3-70B AI Copilot**. Explore projects, work experience, education, and match job descriptions in real-time right inside an immersive desktop interface.

---

## ✨ Key Features

- 🪟 **Authentic Windows 11 Desktop Experience**
  - Interactive Start Menu with search and pinned apps.
  - Draggable, minimizable, maximizable, and closable windows.
  - Active taskbar with running app indicators and system tray (WiFi, battery, volume, real-time clock).
  - Contextual power menu (Shut Down, Restart, Lock).

- 🤖 **AI Portfolio Copilot (Streaming)**
  - Integrated AI chatbot fine-tuned on the author's complete background, tech stack, and achievements.
  - Ultra-fast token streaming powered by **Groq (`llama-3.3-70b-versatile`)**.
  - Ask questions like *"What projects has Sagar built?"*, *"Tell me about his backend experience"*, or *"Why should we hire him?"*.

- 📄 **AI Job Description (JD) Matcher & Resume Analyzer**
  - Paste any job description or upload a JD PDF document.
  - Uses `pypdf` for server-side text extraction and Groq AI for in-depth ATS match analysis.
  - Returns a detailed match score, identified strengths, skill gaps, and custom interview talking points.

- 📁 **Interactive App Suite**
  - **Projects Explorer**: Filter projects by stack, read detailed descriptions, and launch live demos & GitHub repos.
  - **Resume / About**: Interactive breakdown of work experience, education, certifications, and skills.
  - **Contact & Terminal**: Quick links to LinkedIn, GitHub, email, and live communication channels.

---

## 🛠️ Architecture & Tech Stack

```
windows-ai-portfolio-os/
├── frontend/               # React 19 + TypeScript + Vite Desktop UI
│   ├── src/
│   │   ├── api.ts          # API Client (SSE streaming, health check, JD matcher)
│   │   ├── App.tsx         # Main Windows 11 Desktop OS engine
│   │   ├── data/           # Portfolio profile & project datasets
│   │   └── assets/         # Wallpapers, icons, and media
│   └── package.json
│
└── backend/                # FastAPI + Groq AI Python Backend
    ├── app/
    │   ├── api/            # API routes (health, ai, jd_matcher, portfolio)
    │   ├── core/           # Configuration, settings, and portfolio knowledge base
    │   └── services/       # AI streaming and JD matcher logic
    ├── main.py             # FastAPI entrypoint & CORS middleware
    └── requirements.txt    # Python dependencies
```

### Frontend
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: Vercel Analytics & Speed Insights
- **Styling**: Modern Vanilla CSS with glassmorphism, blur filters, and Windows 11 UI design tokens

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **ASGI Server**: [Uvicorn](https://www.uvicorn.org/)
- **AI Engine**: [Groq SDK](https://console.groq.com/) running `llama-3.3-70b-versatile`
- **PDF Processing**: [pypdf](https://pypi.org/project/pypdf/)
- **Data Validation & Settings**: [Pydantic v2](https://docs.pydantic.dev/) + `pydantic-settings`

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)
- **Groq API Key** (Free from [console.groq.com](https://console.groq.com/keys))

---

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
# On Windows:
python -m venv .venv
.venv\Scripts\activate

# On macOS/Linux:
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create your .env file
cp .env.example .env
```

Add your Groq API key in `backend/.env`:
```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

Start the FastAPI development server:
```bash
uvicorn main:app --reload --port 8000
```
The API will be running at `http://127.0.0.1:8000` (docs at `http://127.0.0.1:8000/docs`).

---

### 2. Frontend Setup

In a new terminal window:

```bash
# Navigate to the frontend directory
cd frontend

# Install Node dependencies
npm install

# Create local environment config
# (Make sure it points to your local backend)
echo "VITE_API_BASE_URL=http://127.0.0.1:8000" > .env

# Start the Vite development server
npm run dev
```

Open `http://localhost:5173` in your browser to experience the OS!

---

## 🌐 Production Deployment

### Backend (Render)
1. Go to [Render Dashboard](https://dashboard.render.com/) and create a **New Web Service**.
2. Connect your repository and configure:
   - **Root Directory**: `backend`
   - **Environment / Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`
3. Add Environment Variable:
   - `GROQ_API_KEY` = `your_groq_api_key`
4. Copy your live Render URL (e.g., `https://chatfolio-vxtf.onrender.com`).

### Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/) and click **Add New…** → **Project**.
2. Import the repository and configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variable:
   - `VITE_API_BASE_URL` = `https://<YOUR-RENDER-BACKEND-URL>` *(without trailing slash)*
4. Click **Deploy**.

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
| Variable | Required | Description | Default |
| :--- | :---: | :--- | :--- |
| `GROQ_API_KEY` | **Yes** | Your API key from Groq Console | `""` |
| `GROQ_MODEL` | No | LLM model identifier | `llama-3.3-70b-versatile` |

### Frontend (`frontend/.env`)
| Variable | Required | Description | Default |
| :--- | :---: | :--- | :--- |
| `VITE_API_BASE_URL` | **Yes** | URL pointing to the deployed/local backend | `http://127.0.0.1:8000` |

---

## 👨‍💻 Author

**Sagar Singh**
- 💼 **LinkedIn**: [@sagarrsingh](https://www.linkedin.com/in/sagarrsingh)
- 🐙 **GitHub**: [@sagarrsinghh](https://github.com/sagarrsinghh)
- 📧 **Email**: [sagarrsinghh11@gmail.com](mailto:sagarrsinghh11@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
