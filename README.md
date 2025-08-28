# 🤖 AI Resume Analyzer

> 📄 An **AI-powered platform** to analyze your resume, compare it with job descriptions, and make it **ATS-friendly** so you can land your dream job 🚀.

🌐 **Live Demo** → [https://ai-powered-resume-analyzer-delta.vercel.app/]

---

## ✨ Key Features

- 📤 **Upload Your Resume** – Upload PDF/DOCX resumes in seconds.  
- 💼 **Job Role Description** – Add the job role you’re targeting.  
- 🧠 **AI Analysis** – Detects:
  - ✅ Matching keywords  
  - ❌ Missing keywords  
  - ⚠️ Common errors in resume text/format  
- 📊 **ATS-Friendly Resume** – Get suggestions to improve readability & ATS ranking.  
- 📂 **History Tracking** – Stores your past analyses securely.  
- 🎨 **Immersive UI** – Animated with **Framer Motion** + **Spline 3D robot assistant**.  
- ⚡ **Full-Stack Powered** – Scalable, responsive, and lightning fast.  
---

## 🛠️ Tech Stack

### 🔹 Frontend
- ⚛️ **Next.js** – React framework  
- 🎨 **Tailwind CSS** – Modern styling  
- 🌀 **Framer Motion** – Animations  
- 🤖 **Spline 3D** – Interactive AI robot  

### 🔹 Backend
- 🟢 **Node.js** + **Express.js** – REST API  
- 🗄️ **Neon (Serverless PostgreSQL)** – Cloud database  
- 🔐 **JWT Authentication** – Secure sessions  

### 🔹 AI Layer
- 🧠 **Google Gemini API** & **OpenRouter LLMs** – Resume insights & keyword extraction  

---

🤝 Contributing

Contributions are welcome! 🎉

Fork this repo

Create a new branch (git checkout -b feature-xyz)

Commit changes (git commit -m 'Add feature xyz')

Push to branch (git push origin feature-xyz)

Create a Pull Request

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer

*Env like That

Backend:
NEON_URL=postgresql://USER:PASSWORD@HOST/DB
JWT_SECRET=changeme
PORT=4000
GEMINI_API_KEY=your_api_key_here
OPENROUTER_API_KEY=your_api_key_here

Forntend:
NEXT_PUBLIC_API_URL=http://localhost:4000


