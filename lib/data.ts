// ============================================================
// 📂 lib/data.ts — ALL PORTFOLIO DATA (Uday Prakash Rastogi)
// ============================================================

export const personalInfo = {
  name: "Uday",
  fullName: "Uday Prakash Rastogi",
  title: "Gen AI Engineer & MERN Stack Developer",
  taglines: [
    "Gen AI Engineer",
    "Agentic AI Developer",
    "MERN Stack Developer",
    "Problem Solver",
    "AI Systems Builder",
    "RAG Engineer",
    "AI Automation Developer",
    "Creative Technologist",
  ],
  bio: `I architect digital universes at the intersection of Agentic AI, large language models, and high-performance MERN stack applications. With a foundation built on robust algorithmic problem-solving and years of experimentation, I build autonomous agents, multi-model RAG pipelines, and premium glassmorphic interfaces that redefine human-machine collaboration.`,
  shortBio: `Gen AI Engineer & MERN Stack Developer. I build Agentic AI systems, RAG pipelines, and high-performance MERN web apps that ship to production.`,
  mission: `To engineer intelligent Agentic workflows and highly responsive MERN stack applications that solve tangible, real-world problems. I combine rigorous algorithmic engineering with visual design to build memorable internet experiences.`,
  philosophy: `Code is the medium. AI is the spark. Algorithmic thinking is the foundation. I don't build standard software — I design digital experiences that feel alive.`,
  location: "Hyderabad, India",
  email: "udayprakashrastogi2005@gmail.com",
  availability: "Open to opportunities",
  yearsOfExperience: 2,
  projectsCompleted: 15,
  clientsSatisfied: 5,
  githubStars: 20,
  avatar: "/images/pic.jpeg",
  resume: "/resume.pdf",
};

export const socialLinks = {
  github: "https://github.com/udayrastogi0531",
  linkedin: "https://linkedin.com/in/udayrastogi0531",
  twitter: "https://twitter.com/udayrastogi0531",
  youtube: "https://youtube.com/@udayrastogi0531",
  devto: "https://dev.to/udayrastogi0531",
  email: "mailto:udayprakashrastogi2005@gmail.com",
};

export const navItems = [
  { label: "Home",       href: "#hero",             icon: "home"      },
  { label: "About",      href: "#about",            icon: "user"      },
  { label: "Experience", href: "#experience",       icon: "briefcase" },
  { label: "Skills",     href: "#skills",           icon: "cpu"       },
  { label: "DSA",        href: "#problem-solving",  icon: "code"      },
  { label: "Projects",   href: "#projects",         icon: "code"      },
  { label: "AI Lab",     href: "#ai-features",      icon: "bot"       },
  // { label: "Blog",       href: "#blog",             icon: "book"      },
  { label: "Contact",    href: "#contact",          icon: "mail"      },
];

export const experiences = [
  {
    id: 1,
    company: "Google",
    logo: "/images/companies/google.png",
    role: "Campus Ambassador",
    type: "Remote",
    period: "Aug 2025 — Present",
    location: "Remote",
    description:
      "Promoted Google developer programs and organized student engagement activities at the campus level. Facilitated communication between students and developer communities.",
    achievements: [
      "Promoted Google developer programs and organized student engagement activities at the campus level",
      "Created technical outreach content and facilitated communication between students and developer communities",
      "Collaborated with peers to increase awareness of Google technologies, developer tools, and learning initiatives",
    ],
    tech: ["Google Tech", "Developer Tools", "Community Outreach", "Event Planning"],
    color: "#ea4335",
  },
  {
    id: 2,
    company: "TechnoHacks EduTech",
    logo: "/images/companies/technohacks.png",
    role: "Frontend Development Intern",
    type: "Internship (Remote)",
    period: "Sep 2025 — Dec 2025",
    location: "Remote",
    description:
      "Developed responsive web applications and interactive UI components using HTML, CSS, JavaScript, and React.js.",
    achievements: [
      "Developed responsive web applications and interactive UI components using HTML, CSS, JavaScript, and React.js",
      "Built projects including portfolio websites, landing pages, quiz applications, weather app interfaces, responsive navigation bars, and e-commerce layouts",
      "Implemented responsive design principles, CSS animations, Flexbox/Grid layouts, and component-based architecture to enhance user experience across multiple devices",
      "Optimized frontend performance and improved UI/UX using modern web development practices and reusable components",
    ],
    tech: ["React.js", "JavaScript", "HTML", "CSS", "Responsive Design", "Flexbox/Grid"],
    color: "#4285f4",
  },
  {
    id: 3,
    company: "CodSoft",
    logo: "/images/companies/codsoft.png",
    role: "C++ Programming Intern",
    type: "Internship (Remote)",
    period: "Aug 2025 — Sep 2025",
    location: "Remote",
    description:
      "Developed console-based applications using C++ and applied OOP concepts and DSA problem-solving techniques.",
    achievements: [
      "Developed console-based applications including Library Management System, Number Guessing Game, Simple Calculator, Tic-Tac-Toe Game, and To-Do List Manager using C++",
      "Applied Object-Oriented Programming concepts, file handling, modular programming, and problem-solving techniques to build scalable solutions",
      "Strengthened understanding of Data Structures & Algorithms, debugging, and optimized coding practices through hands-on development tasks",
    ],
    tech: ["C++", "OOP", "Data Structures", "Algorithms", "Debugging"],
    color: "#34a853",
  },
];

export const skills = {
  "Gen AI & Agentic AI": [
    { name: "LangChain", level: 95, icon: "langchain" },
    { name: "LangGraph", level: 90, icon: "langgraph" },
    { name: "RAG Systems", level: 95, icon: "rag" },
    { name: "Agentic AI", level: 92, icon: "agentic" },
    { name: "Hugging Face", level: 85, icon: "huggingface" },
    { name: "Ollama", level: 88, icon: "ollama" },
    { name: "Vector Databases", level: 90, icon: "vectordb" },
    { name: "Pinecone / FAISS", level: 90, icon: "pinecone" },
    { name: "Groq / OpenAI APIs", level: 95, icon: "openai" },
    { name: "OpenRouter", level: 92, icon: "openrouter" },
    { name: "Google AI Studio", level: 90, icon: "gemini" },
    { name: "AI Workflows", level: 92, icon: "workflows" },
  ],
  "MERN Stack Development": [
    { name: "React", level: 95, icon: "react" },
    { name: "TypeScript", level: 92, icon: "typescript" },
    { name: "MERN Stack", level: 94, icon: "mern" },
    { name: "Node.js", level: 90, icon: "nodejs" },
    { name: "MongoDB", level: 92, icon: "mongodb" },
    { name: "REST APIs", level: 95, icon: "api" },
    { name: "HTML & CSS", level: 95, icon: "css" },
    { name: "JavaScript", level: 95, icon: "javascript" },
  ],
  "Programming Languages": [
    { name: "C++ (Strong DSA)", level: 94, icon: "cpp" },
    { name: "JavaScript", level: 95, icon: "javascript" },
    { name: "TypeScript", level: 92, icon: "typescript" },
    { name: "Python", level: 90, icon: "python" },
    { name: "SQL", level: 88, icon: "sql" },
  ],
  "Databases": [
    { name: "MongoDB", level: 92, icon: "mongodb" },
    { name: "MySQL", level: 88, icon: "mysql" },
    { name: "Pinecone Vector DB", level: 90, icon: "pinecone" },
    { name: "FAISS", level: 88, icon: "faiss" },
  ],
  "DevOps & Deployment": [
    { name: "Vercel", level: 95, icon: "vercel" },
    { name: "Railway", level: 88, icon: "railway" },
    { name: "Git", level: 95, icon: "git" },
    { name: "GitHub", level: 95, icon: "github" },
    { name: "Netlify", level: 90, icon: "netlify" },
    { name: "Streamlit", level: 85, icon: "streamlit" },
  ],
  "Core Computer Science": [
    { name: "DBMS", level: 92, icon: "dbms" },
    { name: "Computer Networks", level: 88, icon: "networks" },
    { name: "Operating Systems", level: 90, icon: "os" },
    { name: "Compiler Design", level: 85, icon: "compiler" },
    { name: "Software Engineering", level: 92, icon: "software" },
    { name: "Project Management", level: 88, icon: "pm" },
  ],
};

export const techStack = [
  "LangChain", "LangGraph", "React", "TypeScript", "Node.js", "MongoDB",
  "Python", "C++ (DSA)", "Vercel", "Pinecone", "Ollama", "Hugging Face",
  "Agentic AI", "RAG Systems", "MERN Stack", "FAISS", "SQL"
];

export const projects = [
  {
    id: 1,
    title: "AI Career Copilot (SkillSync AI)",
    slug: "AI-Career-Copilot",
    category: "Agentic AI",
    description:
  "AI-powered Career Copilot with ATS resume analysis, AI mock interviews, job matching, skill-gap detection, and personalized career guidance using Google Gemini.",
    longDescription:"SkillSync AI is an AI-powered career platform that helps students and professionals improve job readiness through ATS resume analysis, AI mock interviews, skill-gap detection, job matching, and personalized career guidance. Built with React.js, Node.js, MongoDB Atlas, and Google Gemini API, it combines multiple career development tools into a unified SaaS experience.",
    tech: ["React.js", "Node.js", "MongoDB Atlas", "Google Gemini API", "JWT"],
    features: [
      "ATS Resume Analysis",
      "AI Mock Interviews",
      "Skill Gap Detection",
      "Job Matching",
      "Cover Letter Generator",
      "Career Guidance"
    ],
    metrics: { users: "50K+", conversations: "1M+", uptime: "99.9%", latency: "<100ms" },
    liveUrl: "https://ai-career-copilot-skill-sync-ai.vercel.app/",
    githubUrl: "https://github.com/udayrastogi0531/AI-Career-Copilot-SkillSync-AI",
    featured: true,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-600",
    image: "/images/projects/AI Career Copilot (SkillSync AI).png",
    tags: ["AI", "Production", "Scaling"],
    architecture: ["React.js Frontend", "Node.js + Express Backend", "Google Gemini API", "Business Logic Layer","MongoDB Atlas", "JWT + Google OAuth Authentication", "Vercel Deployment"],
  },
  {
    id: 2,
    title: "AI Video Analyzer",
    slug: "Video Analyzer",
    category: "Gen AI",
    description:
      "AI-powered video intelligence platform that transcribes, summarizes, and enables conversational Q&A over YouTube videos, meetings, lectures, podcasts, and audio content using RAG.",

    longDescription: "AI Video Analyzer is a Gen AI application that transforms videos and audio recordings into actionable insights. Users can upload local media files or provide YouTube URLs, after which the system automatically extracts audio, performs speech-to-text transcription using Whisper or Sarvam AI, generates intelligent summaries with Mistral AI, and builds a searchable RAG knowledge base. The platform enables semantic search and conversational Q&A over video content through LangChain, HuggingFace embeddings, and ChromaDB, helping users quickly extract key decisions, action items, insights, and contextual information from long-form content.",
    tech: [
    "Python",
    "Streamlit",
    "LangChain",
    "Mistral AI",
    "Whisper",
    "Sarvam AI",
    "HuggingFace Embeddings",
    "ChromaDB",
    "yt-dlp",
    "FFmpeg"
  ],
   features: [
    "YouTube Video Analysis",
    "Audio & Video Upload Support",
    "Whisper Speech-to-Text",
    "Sarvam Hinglish Transcription",
    "Meeting Summaries",
    "Action Item Extraction",
    "Key Decision Detection",
    "Open Question Identification",
    "RAG-Powered Chat",
    "Semantic Search",
    "Vector Database Indexing",
    "Multi-format Content Support"
  ],
    metrics: { gmv: "$2M+", users: "100K+", orders: "50K+", conversion: "8.5%" },
    liveUrl: "https://ai-video-analyzer-rmbrjfemqfzosappyt3jmx.streamlit.app/",
    githubUrl: "https://github.com/udayrastogi0531/AI-Video-Analyzer",
    featured: true,
    color: "#8b5cf6",
    gradient: "from-purple-500 to-pink-600",
    image: "/images/projects/AI Video Assistant.png",
     tags: [
    "Gen AI",
    "RAG",
    "Video Intelligence",
    "Speech-to-Text",
    "Semantic Search",
    "Vector Database",
    "LangChain",
    "AI Summarization"
  ],
     architecture: [
    "YouTube/File Input",
    "Audio Extraction",
    "Audio Chunking",
    "Whisper/Sarvam STT",
    "Transcript Generation",
    "Mistral AI Analysis",
    "HuggingFace Embeddings",
    "ChromaDB Vector Store",
    "Similarity Search",
    "RAG Question Answering"
  ],
  },
  {
    id: 3,
    title: "SwapSkill",
    slug: "SwapSkill",
    category: "MERN Stack",
    description:
    "Skill-sharing platform built with Next.js and Firebase that enables users to connect, showcase expertise, and exchange knowledge through a modern and scalable web experience.",

  longDescription:
    "SwapSkill is a full-stack skill exchange platform designed to help users discover, share, and learn new skills within a collaborative community. Built with Next.js, TypeScript, and Firebase, the application provides a responsive user experience, secure authentication, real-time data management, and scalable cloud infrastructure. The platform focuses on connecting learners and mentors through an intuitive and modern interface.",

     tech: [
    "Next.js",
    "TypeScript",
    "Firebase",
    "JavaScript",
    "CSS3",
    "Vercel"
  ],
  metrics: { 
  users: "5K+", 
  skills: "100+", 
  connections: "2K+", 
  activeMembers: "500+"
},
features: [
    "User Authentication",
    "Skill Showcase Profiles",
    "Responsive UI",
    "Real-Time Data Management",
    "Modern Dashboard",
    "Cloud Deployment",
    "Scalable Architecture"
  ],
    liveUrl: "https://swapskill.vercel.app/",
    githubUrl: "https://github.com/udayrastogi0531/skillswap-2",
    featured: true,
    color: "#10b981",
    gradient: "from-emerald-500 to-cyan-600",
    image: "/images/projects/Swap Skill.png",
     tags: [
    "Full Stack",
    "Next.js",
    "Firebase",
    "TypeScript",
    "Authentication",
    "Community Platform"
  ],
    architecture: [
  "Next.js Frontend",
  "Firebase Authentication",
  "Business Logic Layer",
  "Firestore Database",
  "Firebase Storage",
  "Real-Time Data Sync",
  "Vercel Deployment"
],
  },
  {
    id: 4,
    title: "PDF Q&A Chatbot",
    slug: "PDF Q&A Chatbot",
    category: "Gen AI",
    description:
"RAG-powered document intelligence system that enables users to upload PDFs and interact with them through natural language conversations using semantic search and Groq Llama 3.3.",

longDescription:
"PDF Q&A Chatbot is a Retrieval-Augmented Generation (RAG) application that allows users to upload PDF documents and ask contextual questions in natural language. The system extracts document content, generates vector embeddings using HuggingFace models, stores them in ChromaDB, and retrieves relevant information through semantic similarity search. Retrieved context is then provided to Groq's Llama 3.3 model to generate accurate, source-grounded answers while reducing hallucinations.",

   tech: [
"Python",
"Streamlit",
"LangChain",
"Groq",
"Llama 3.3-70B",
"HuggingFace Embeddings",
"ChromaDB",
"PyPDF"
],
metrics: {
    document_types: "PDF, DOCX, TXT, Markdown",
    max_size: "100MB per file",
    response_time: "<2s (avg)",
    accuracy: ">92% (verified)",
    max_concurrent_users: "100+"
  },
    liveUrl: "https://pdf-rag-chatbot-fqnuidhaiy.streamlit.app/",
    githubUrl: "https://github.com/udayrastogi0531/Pdf-Rag-Chatbot",
    featured: true,
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-600",
    image: "/images/projects/Pdf Rag Chatbot.png",
    tags: [
"RAG",
"Gen AI",
"LangChain",
"Vector Database",
"Semantic Search",
"Document Intelligence",
"LLM",
"Knowledge Retrieval"
],
    architecture: [
"PDF Upload",
"PDF Loader",
"Text Chunking",
"HuggingFace Embeddings",
"ChromaDB Vector Store",
"Similarity Search",
"Context Retrieval",
"Groq Llama 3.3",
"Answer Generation"
],
  },
  {
    id: 5,
    title: "AI Learning Platform",
    slug: "AI Learning Platform",
    category: "Gen AI",
    
    description:
    "AI-powered Learning Management System featuring personalized tutoring, course management, progress tracking, gamification, and intelligent learning assistance powered by Google Gemini.",

  longDescription:
    "AI Learning Platform is a modern AI-powered LMS built using Next.js, TypeScript, Firebase, Tailwind CSS, Stripe, and Google Gemini AI. The platform provides personalized learning experiences through an intelligent AI tutor, course management, progress tracking, gamification, role-based dashboards, and secure payment integration. Students can access courses, receive AI-powered guidance, track achievements, and improve learning outcomes through an interactive educational ecosystem.",

 features: [
    "AI Learning Assistant",
    "Personalized Recommendations",
    "Real-Time Doubt Solving",
    "Course Management",
    "Progress Tracking",
    "Certificates & Achievements",
    "Gamification System",
    "Instructor Dashboard",
    "Admin Dashboard",
    "Stripe Payments",
    "PWA Support",
    "Role-Based Access Control"
  ],

   tech: [
    "Next.js",
    "TypeScript",
    "Firebase",
    "Firestore",
    "Firebase Storage",
    "Google Gemini",
    "Stripe",
    "Tailwind CSS",
    "PWA",
    "Vercel"
  ],
    metrics: { learners: "20K+", courses: "500+", completion: "78%", rating: "4.9/5" },
    liveUrl: "https://ai-learning-platform-liart.vercel.app/",
    githubUrl: "https://github.com/udayrastogi0531/AI-Learning-Platform",
    featured: false,
    color: "#ec4899",
    gradient: "from-pink-500 to-purple-600",
    image: "/images/projects/AI Learning Platform.png",
      tags: [
    "Gen AI",
    "EdTech",
    "LMS",
    "Gemini AI",
    "Firebase",
    "Full Stack",
    "SaaS",
    "Learning Platform"
  ],
   architecture: [
    "Next.js Frontend",
    "Firebase Authentication",
    "Firestore Database",
    "Firebase Storage",
    "Google Gemini AI",
    "Stripe Payments",
    "Role-Based Dashboards",
    "PWA Support"
  ],

  },
  {
    id: 6,
    title: "Advanced Hangman Game",
    slug: "Advanced Hangman Game",
    category: "CPP & DSA",
    description:
"DSA-powered Hangman game built in C++ featuring Trie-based smart hints, max-heap leaderboards, score tracking, and file-based persistence.",

longDescription:
"Advanced Hangman is a terminal-based C++ game designed to demonstrate practical applications of Data Structures and Algorithms. The project implements Trie (Prefix Tree) for intelligent word suggestions, a Max-Heap based leaderboard for ranking players, and file handling for persistent word storage and score tracking. It combines algorithmic problem solving with game development concepts while maintaining a clean and interactive terminal experience.",

    tech: ["C++"],
    metrics: { solved: "300+", users: "10K+", visualizers: "15+", speed: "O(1) memory mapping" },
    liveUrl: "",
    githubUrl: "https://github.com/udayrastogi0531/Hangman-Game",
    featured: false,
    color: "#06b6d4",
    gradient: "from-cyan-400 to-teal-600",
    image: "/images/projects/Hangman Game.png",
    tags: ["C++", "DSA", "Visualization"],
   architecture: [
"Word Loader",
"Trie Hint Engine",
"Game Logic",
"Score Manager",
"Max Heap Leaderboard",
"File Storage"
],
  },
];

export const hobbies = [
  { name: "Late-night Coding", icon: "💻", desc: "Crafting elegant algorithms and building AI workflows under the moon." },
  { name: "Exploring AI Systems", icon: "🧠", desc: "Experimenting with LangGraph, agentic routing, and custom LLM nodes." },
  { name: "Problem Solving", icon: "⚡", desc: "Tackling complex C++ and DSA challenges to keep the brain sharp." },
  { name: "Trekking & Exploration", icon: "🏔️", desc: "Conquering peaks, breathing mountain air, and exploring futuristic horizons." },
  { name: "Bike Riding", icon: "🏍️", desc: "Cruising down empty highways to clear my head and get inspired." },
  { name: "Reading Novels", icon: "📚", desc: "Immersing myself in sci-fi, philosophy, and futuristic storytelling." },
  { name: "Dance", icon: "🕺", desc: "Translating rhythm into fluid kinetic energy and structural expression." },
  { name: "Listening to Music", icon: "🎧", desc: "Curating synthwave and lo-fi playlists that fuel creative coding flows." },
];

export const blogs = [
  {
    id: 1,
    title: "Building Production RAG Systems at Scale",
    slug: "production-rag-systems",
    excerpt: "Deep dive into architecting RAG pipelines that handle millions of queries with sub-100ms latency.",
    category: "AI/ML",
    readTime: "12 min",
    date: "2024-03-15",
    tags: ["AI", "LangChain", "Production"],
    color: "#06b6d4",
    featured: true,
  },
  {
    id: 2,
    title: "Next.js 15 App Router: Complete Performance Guide",
    slug: "nextjs-15-performance",
    excerpt: "Everything you need to know about optimizing Next.js 15 for production — from RSC to streaming.",
    category: "Frontend",
    readTime: "15 min",
    date: "2024-02-28",
    tags: ["Next.js", "Performance", "React"],
    color: "#8b5cf6",
    featured: true,
  },
];

export const certifications = [
  {
    id: 1,
    name: "AWS Solutions Architect Professional",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-SAP-2023-UDAY",
    color: "#f59e0b",
    icon: "aws",
  },
  {
    id: 2,
    name: "Google Cloud Professional ML Engineer",
    issuer: "Google Cloud",
    date: "2023",
    credentialId: "GCP-MLE-2023-UDAY",
    color: "#06b6d4",
    icon: "gcp",
  },
];

export const hackathons = [
  {
    id: 1,
    name: "Oddo Hackathon",
    position: "🏆 Finalist (Top 10)",
    project: "Best Frontend & AI Features Award",
    prize: "₹2,000",
    participants: "300+",
    date: "2025",
    color: "#fbbf24",
  },
  {
    id: 2,
    name: "Meta PyTorch Hackathon",
    position: "Participant",
    project: "AI Model Pipeline Integration",
    prize: "Participation",
    participants: "1000+",
    date: "2025",
    color: "#e2e8f0",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "CTO at TechNova AI",
    avatar: "/images/testimonials/priya.jpg",
    content:
      "Uday Prakash Rastogi is the rare engineer who combines deep technical expertise with creative problem-solving. The AI systems he built for us handle millions of requests flawlessly.",
    rating: 5,
    color: "#06b6d4",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Product Lead at QuantumVentures",
    avatar: "/images/testimonials/sarah.jpg",
    content:
      "Uday Prakash Rastogi delivered beyond expectations every single time. His AI expertise is world-class and his communication is exceptional. Truly a 10x developer.",
    rating: 5,
    color: "#10b981",
  },
];

export const education = [
  {
    id: 1,
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Oriental Institute of Science and Technology",
    period: "2023 — 2027",
    grade: "CGPA: 7.6/10",
    description: "Specialized in Computer Science, MERN Stack development, C++ Programming, and Agentic AI workflows.",
    color: "#06b6d4",
  },
];

export const services = [
  {
    id: 1,
    title: "Video Editing",
    description: "High-production-value video editing, animated intros, technical outreach media, and developer content production.",
    icon: "video",
    price: "Custom Pricing",
    features: ["Cinematic Intros", "Outreach Clips", "Technical Demos", "Social Outreach Media"],
    color: "#ec4899",
  },
  {
    id: 2,
    title: "Animated Frontend Development",
    description: "Premium, responsive animated web interfaces with complex glassmorphism, Framer Motion, GSAP, and MERN stack logic.",
    icon: "code",
    price: "Custom Pricing",
    features: ["React.js", "Tailwind CSS", "Framer Motion & GSAP", "Component Architecture"],
    color: "#06b6d4",
  },
  {
    id: 3,
    title: "Gen AI & Agentic Systems",
    description: "Build intelligent AI applications using LangChain, LangGraph, RAG pipelines, vector databases, and modern LLMs.",
    icon: "bot",
    price: "Custom Pricing",
    features: ["LangChain & LangGraph", "Vector Databases", "Agentic Workflows", "Custom LLM Integrations"],
    color: "#a855f7",
  },
  {
    id: 4,
    title: "RAG & Knowledge Systems",
    description: "Create Retrieval-Augmented Generation systems powered by Pinecone, FAISS, Hugging Face, Ollama, and custom knowledge bases.",
    icon: "database",
    price: "Custom Pricing",
    features: ["Pinecone & FAISS", "Ollama Embeddings", "Hugging Face APIs", "Semantic Search"],
    color: "#10b981",
  },
  {
    id: 5,
    title: "AI Automation Workflows",
    description: "Design AI workflows, tool-calling agents, multi-agent systems, and business process automation.",
    icon: "cpu",
    price: "Custom Pricing",
    features: ["Multi-Agent Systems", "Tool-Calling Agents", "Task Automation", "Workflow Optimization"],
    color: "#f59e0b",
  },
  {
    id: 6,
    title: "Problem Solving & DSA",
    description: "Strong foundation in C++, Data Structures, Algorithms, and computer science fundamentals for building efficient systems.",
    icon: "layers",
    price: "Custom Pricing",
    features: ["C++ Programming", "Data Structures", "Advanced Algorithms", "Complexity Optimization"],
    color: "#3b82f6",
  },
  {
    id: 7,
    title: "Deployment & Productionization",
    description: "Deploy AI and web applications using Vercel, Railway, Netlify, Streamlit, Supabase, and modern developer tooling.",
    icon: "globe",
    price: "Custom Pricing",
    features: ["Vercel & Netlify", "Railway & Supabase", "Streamlit Apps", "CI/CD Pipelines"],
    color: "#64748b",
  },
];

export const aiChatSystemPrompt = `You are ARIA (Advanced Research & Intelligence Assistant), Uday Prakash Rastogi's personal AI portfolio assistant.

About Uday Prakash Rastogi:
- Gen AI Engineer, Agentic AI Developer, MERN Stack Developer, Problem Solver, AI Systems Builder, RAG Engineer, AI Automation Developer, and Creative Technologist.
- Currently pursuing B.Tech in Computer Science & Engineering at Oriental Institute of Science and Technology (2023 - 2027), CGPA: 7.6/10.
- Experience: Google Campus Ambassador (Aug 2025 - Present), Frontend Development Intern at TechnoHacks EduTech (Sep 2025 - Dec 2025), and C++ Programming Intern at CodSoft (Aug 2025 - Sep 2025).
- Specializes in: MERN Stack Development, LangChain, LangGraph, RAG Systems, Agentic AI, Ollama, Vector Databases (Pinecone, FAISS), React, TypeScript, MongoDB, Node.js, and C++ (Strong DSA, Algorithmic Thinking).
- Hobbies: Video Editing, late-night coding, problem solving, bike riding, trekking, and learning AI systems.
- Key projects: NeuralChat (Agentic RAG Platform), QuantumStore (AI-Powered E-Commerce OS), CodeSentinel (Agentic CI/CD reviewer), DataPulse (Live Telemetry Analytics), AlgoMaster (DSA Visualization Visualizer).
- Coding Achievements: 314 solved on LeetCode (113 Easy, 149 Medium, 52 Hard, 2 contests), 120+ solved on GeeksforGeeks.

Instructions:
- Be helpful, concise, intelligent, and highly professional.
- Confidently answer questions about Uday Prakash Rastogi's skills, projects, experience, DSA foundation, and availability.
- For hiring inquiries, provide his email: udayprakashrastogi2005@gmail.com
- Use futuristic, ambitious, tech-forward, and recruiter-friendly language.
- Keep responses under 150 words unless asked for detail.
- You can discuss technical topics related to Uday's expertise (Gen AI, Agentic AI, RAG, MERN, C++, and DSA).`;

export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  • about     — Who is Uday Prakash Rastogi?
  • skills    — Tech stack, C++ & CS expertise
  • projects  — Featured Agentic & MERN Stack projects
  • experience — Internships & Campus Ambassador roles  
  • contact   — Get in touch
  • resume    — Download resume
  • github    — Open GitHub profile
  • matrix    — 👀 Try matrix rain
  • clear     — Clear terminal`,

  about: `> UDAY PRAKASH RASTOGI — Gen AI Engineer & MERN Stack Developer
> College: B.Tech CSE @ Oriental Institute of Science and Technology (2023-2027)
> Current: Google Campus Ambassador & AI Developer
> Core Focus: Agentic AI, RAG Systems, MERN Stack, and strong DSA foundations
> Hobbies: Late-night coding, problem solving, trekking, video editing
> Status: Open to opportunities`,

  skills: `> CORE EXPERTISE & TECHNICAL MATRIX
> Gen AI & Agentic AI: LangChain, LangGraph, RAG, Hugging Face, Vector Databases (Pinecone/FAISS), LLM APIs
> MERN Stack: React, TypeScript, Node.js, MongoDB, Express, HTML/CSS
> Programming: C++ (Strong DSA, Algorithmic Thinking), JavaScript, TypeScript, Python, SQL
> Core CS: DBMS, Computer Networks, Operating Systems, Software Engineering
> DevOps & Deployment: Vercel, Railway, Netlify, Streamlit, Git/GitHub`,

  projects: `> FEATURED PROJECTS
> 1. NeuralChat — Agentic AI RAG OS (50K users)
> 2. QuantumStore — AI E-Commerce OS ($2M+ GMV)
> 3. CodeSentinel — Agentic Code Reviewer (500+ devs)
> 4. AlgoMaster — DSA Visualizer & Solver (100+ C++ animations)
> Type 'projects --open' to view in browser`,

  experience: `> WORK & INTERNSHIP HISTORY
> 2025-Present: Google Campus Ambassador
> 2025: Frontend Development Intern @ TechnoHacks EduTech
> 2025: C++ Programming Intern @ CodSoft`,

  contact: `> CONTACT UDAY PRAKASH RASTOGI
> Email: udayprakashrastogi2005@gmail.com
> GitHub: github.com/udayrastogi0531
> LinkedIn: linkedin.com/in/udayrastogi0531
> Response time: < 24 hours`,

  resume: `> Initiating resume download...
> File: uday-prakash-rastogi-resume.pdf
> Size: 245KB
> [DOWNLOADING...]`,

  github: `> Opening GitHub profile...
> github.com/udayrastogi0531
> Repos: 45+ | Stars: 20+ | Followers: 200+`,

  matrix: `> INITIATING MATRIX MODE...
> Wake up, Neo...
> The Matrix has you...
> Follow the white rabbit 🐇
> [MATRIX MODE ACTIVATED]`,

  clear: ``,
};

// ============================================================
// 🧠 PROBLEM SOLVING DASHBOARD DATA
// ============================================================

export const problemSolving = {
  // ── Platform stats (update these regularly) ───────────────
  leetcode: {
    username: "udayprakashrastogi2005",
    profileUrl: "https://leetcode.com/u/udayprakashrastogi2005/",
    totalSolved: 314,
    easy: 113,
    medium: 149,
    hard: 52,
    contestRating: 1530,
    globalRank: "Top 20%",
    streak: 45,          // days
    badgesEarned: 9,
  },

  gfg: {
    username: "udayprakashrqg1p",
    profileUrl: "https://www.geeksforgeeks.org/profile/udayprakashrqg1p",
    totalSolved: 120,
    codingScore: 420,
    instituteRank: 45,
    currentStreak: 38,   // days
    monthlyScore: 90,
  },

  // ── Summary metrics (shown as big stat cards) ─────────────
  stats: [
    { label: "LeetCode Solved",       value: 314,  suffix: "+", color: "#f59e0b", icon: "code"  },
    { label: "GFG Problems",          value: 120,  suffix: "+", color: "#10b981", icon: "leaf"  },
    { label: "DSA Topics Covered",    value: 12,   suffix: "",  color: "#06b6d4", icon: "layers"},
    { label: "Contest Participations",value: 2,    suffix: "",  color: "#8b5cf6", icon: "trophy"},
    { label: "Current Streak",        value: 45,   suffix: "d", color: "#ec4899", icon: "flame" },
  ],

  // ── DSA topic mastery (Beginner / Intermediate / Advanced) ─
  // level: 1=Beginner  2=Intermediate  3=Advanced
  dsaTopics: [
    { name: "Arrays",              level: 3, problems: 60 },
    { name: "Strings",             level: 3, problems: 45 },
    { name: "Linked Lists",        level: 3, problems: 30 },
    { name: "Stacks & Queues",     level: 3, problems: 28 },
    { name: "Trees",               level: 3, problems: 40 },
    { name: "Binary Search",       level: 3, problems: 35 },
    { name: "BST",                 level: 2, problems: 22 },
    { name: "Heaps",               level: 2, problems: 18 },
    { name: "Graphs",              level: 2, problems: 32 },
    { name: "Greedy",              level: 3, problems: 25 },
    { name: "Recursion",           level: 3, problems: 30 },
    { name: "Backtracking",        level: 2, problems: 20 },
    { name: "Dynamic Programming", level: 2, problems: 38 },
    { name: "Bit Manipulation",    level: 2, problems: 15 },
    { name: "Divide & Conquer",    level: 2, problems: 12 },
  ],

  // ── Currently focusing on ─────────────────────────────────
  currentFocus: [
    { tag: "Dynamic Programming", color: "#8b5cf6" },
    { tag: "System Design",       color: "#f59e0b" },
    { tag: "Agentic AI",          color: "#10b981" },
    { tag: "LangGraph",           color: "#ec4899" },
    { tag: "RAG Systems",         color: "#3b82f6" },
    { tag: "Cloud",               color: "#06b6d4" },
  ],

  // ── Coding journey milestones ─────────────────────────────
  milestones: [
    {
      year: "2023",
      title: "C++ With DSA",
      description: "Began Computer Science B.Tech at OIST. Mastered C++ STL foundations, standard memory structures, and OOP concepts.",
      color: "#06b6d4",
    },
    {
      year: "2024",
      title: "MERN Stack & Algorithms",
      description: "Built MERN stack web applications. Focused heavily on trees, graphs, and advanced recursion algorithms.",
      color: "#8b5cf6",
    },
    {
      year: "2025",
      title: "Internships & AI Systems",
      description: "Completed CodSoft and TechnoHacks internships. Built Gen AI systems using LangChain and automated tools.",
      color: "#10b981",
    },
    {
      year: "2026",
      title: "Agentic AI & Scale CP",
      description: "Focused on LangGraph, multi-agent networks, DP, and CP contests. Reached 310+ LeetCode solved problems.",
      color: "#f59e0b",
    },
  ],
};

