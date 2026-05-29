// ============================================================
// 📂 lib/data.ts — ALL PORTFOLIO DATA (Uday Prakash Rastogi)
// ============================================================

export const personalInfo = {
  name: "Uday",
  fullName: "Uday Prakash Rastogi",
  title: "Gen AI Engineer & Full Stack Developer",
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
  bio: `I architect digital universes at the intersection of Agentic AI, large language models, and high-performance full-stack applications. With a foundation built on robust algorithmic problem-solving and years of experimentation, I build autonomous agents, multi-model RAG pipelines, and premium glassmorphic interfaces that redefine human-machine collaboration.`,
  shortBio: `Gen AI Engineer & Full Stack Developer. I build Agentic AI systems, RAG pipelines, and high-performance web apps that ship to production.`,
  mission: `To engineer intelligent Agentic workflows and highly responsive full-stack applications that solve tangible, real-world problems. I combine rigorous algorithmic engineering with visual design to build memorable internet experiences.`,
  philosophy: `Code is the medium. AI is the spark. Algorithmic thinking is the foundation. I don't build standard software — I design digital experiences that feel alive.`,
  location: "Hyderabad, India",
  email: "udayprakashrastogi2005@gmail.com",
  availability: "Open to opportunities",
  yearsOfExperience: 3,
  projectsCompleted: 25,
  clientsSatisfied: 15,
  githubStars: 500,
  avatar: "/images/avatar.jpg",
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
  { label: "Home", href: "#hero", icon: "home" },
  { label: "About", href: "#about", icon: "user" },
  { label: "Experience", href: "#experience", icon: "briefcase" },
  { label: "Skills", href: "#skills", icon: "cpu" },
  { label: "Projects", href: "#projects", icon: "code" },
  { label: "AI Lab", href: "#ai-features", icon: "bot" },
  { label: "Blog", href: "#blog", icon: "book" },
  { label: "Contact", href: "#contact", icon: "mail" },
];

export const experiences = [
  {
    id: 1,
    company: "TechNova AI",
    logo: "/images/companies/technova.png",
    role: "Senior Full Stack & AI Engineer",
    type: "Full-time",
    period: "Jan 2024 — Present",
    location: "Hyderabad, India (Hybrid)",
    description:
      "Leading development of AI-powered SaaS products serving 50K+ users. Architected microservices infrastructure handling 1M+ daily API calls.",
    achievements: [
      "Built LLM-powered code review system reducing review time by 70%",
      "Architected real-time AI analytics dashboard with sub-100ms latency",
      "Led team of 6 engineers across 3 product lines",
      "Reduced cloud costs by 40% via serverless optimization",
    ],
    tech: ["Next.js", "Python", "LangChain", "AWS", "PostgreSQL", "Redis"],
    color: "#06b6d4",
  },
  {
    id: 2,
    company: "InnovateLab",
    logo: "/images/companies/innovatelab.png",
    role: "Full Stack Developer",
    type: "Full-time",
    period: "Jun 2022 — Dec 2023",
    location: "Bangalore, India",
    description:
      "Built and scaled e-commerce platform from 0 to 100K users. Implemented real-time features and payment integrations.",
    achievements: [
      "Developed real-time inventory management system",
      "Integrated Razorpay & Stripe payment gateways",
      "Improved page load speed by 65% via optimization",
      "Built CI/CD pipeline reducing deployment time by 80%",
    ],
    tech: ["React", "Node.js", "MongoDB", "Docker", "GCP", "GraphQL"],
    color: "#8b5cf6",
  },
  {
    id: 3,
    company: "FreelanceOS",
    logo: "/images/companies/freelance.png",
    role: "Freelance AI Developer",
    type: "Freelance",
    period: "Jan 2022 — Jun 2022",
    location: "Remote",
    description:
      "Delivered AI/ML solutions for 10+ clients across fintech, healthcare, and edtech domains.",
    achievements: [
      "Built NLP pipeline for sentiment analysis (95% accuracy)",
      "Created chatbot serving 5K+ daily conversations",
      "Delivered 12 projects with 5-star ratings",
    ],
    tech: ["Python", "FastAPI", "OpenAI", "TensorFlow", "React"],
    color: "#10b981",
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
  "Full Stack Development": [
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
    title: "NeuralChat — Agentic AI Conversation & RAG OS",
    slug: "neuralchat",
    category: "AI/ML",
    description:
      "Production-grade multi-agent chat platform with LangGraph routing, hybrid RAG pipeline (Pinecone/FAISS), and real-time SSE streaming. Serves 50K+ sessions.",
    longDescription: `NeuralChat is a next-generation AI conversation platform that combines multiple LLM providers 
    with a sophisticated RAG pipeline. Built with a microservices architecture, it supports real-time streaming, 
    custom knowledge bases, and enterprise-grade security.`,
    tech: ["Next.js", "Python", "LangChain", "OpenAI", "Pinecone", "Redis", "PostgreSQL"],
    metrics: { users: "50K+", conversations: "1M+", uptime: "99.9%", latency: "<100ms" },
    liveUrl: "",
    githubUrl: "https://github.com/udayrastogi0531/neuralchat",
    featured: true,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-600",
    image: "/images/projects/neuralchat.jpg",
    tags: ["AI", "Production", "Scaling"],
    architecture: ["Next.js Frontend", "FastAPI Backend", "LangChain RAG", "Pinecone VectorDB", "Redis Cache"],
  },
  {
    id: 2,
    title: "QuantumStore — AI-Powered E-Commerce OS",
    slug: "quantumstore",
    category: "Full Stack",
    description:
      "Blazing-fast MERN stack e-commerce engine with collaborative filter recommender, real-time inventory sockets, and Stripe/Razorpay integrations. $2M+ GMV.",
    longDescription: `QuantumStore reimagines e-commerce with AI-powered personalization, real-time inventory management, 
    and a hyper-optimized checkout flow. Built for scale with a 99.99% uptime SLA.`,
    tech: ["Next.js", "Node.js", "MongoDB", "Redis", "Stripe", "Razorpay", "Elasticsearch"],
    metrics: { gmv: "$2M+", users: "100K+", orders: "50K+", conversion: "8.5%" },
    liveUrl: "",
    githubUrl: "https://github.com/udayrastogi0531/quantumstore",
    featured: true,
    color: "#8b5cf6",
    gradient: "from-purple-500 to-pink-600",
    image: "/images/projects/quantumstore.jpg",
    tags: ["E-Commerce", "Scaling", "AI"],
    architecture: ["Next.js", "Node.js API", "MongoDB Atlas", "Redis Cache", "Stripe/Razorpay"],
  },
  {
    id: 3,
    title: "CodeSentinel — Agentic CI/CD Code Reviewer",
    slug: "codesentinel",
    category: "AI/ML",
    description:
      "Agentic AI GitHub webhook bot that reviews pull requests, runs security vulnerability static analysis, and suggests code optimizations autonomously.",
    longDescription: `CodeSentinel uses fine-tuned LLMs to review pull requests in real-time, 
    detecting security vulnerabilities, performance issues, and code quality problems before they reach production.`,
    tech: ["Python", "FastAPI", "OpenAI", "GitHub API", "PostgreSQL", "Docker"],
    metrics: { prs: "10K+", bugs: "5K caught", devs: "500+", timeSaved: "3hrs/week" },
    liveUrl: "",
    githubUrl: "https://github.com/udayrastogi0531/codesentinel",
    featured: true,
    color: "#10b981",
    gradient: "from-emerald-500 to-cyan-600",
    image: "/images/projects/codesentinel.jpg",
    tags: ["AI", "DevTools", "Security"],
    architecture: ["FastAPI", "LLM Fine-tuning", "GitHub Webhooks", "PostgreSQL", "Docker"],
  },
  {
    id: 4,
    title: "DataPulse — Live Agentic Telemetry Dashboard",
    slug: "datapulse",
    category: "Full Stack",
    description:
      "Real-time stream processing analytics pipeline aggregating event logs and performance metrics with WebSocket feeds.",
    tech: ["Next.js", "Python", "Apache Kafka", "ClickHouse", "D3.js", "WebSockets"],
    metrics: { events: "1M/day", latency: "<50ms", dashboards: "200+", clients: "30+" },
    liveUrl: "",
    githubUrl: "https://github.com/udayrastogi0531/datapulse",
    featured: false,
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-600",
    image: "/images/projects/datapulse.jpg",
    tags: ["Analytics", "Real-time", "Visualization"],
    architecture: ["Next.js", "Kafka", "ClickHouse", "WebSockets", "D3.js"],
  },
  {
    id: 5,
    title: "MindMap AI — Adaptive EdTech Curriculum Builder",
    slug: "mindmap-ai",
    category: "EdTech",
    description:
      "Agentic curriculum compiler generating custom learning vectors and personalized course timelines adapted to student diagnostics.",
    tech: ["Next.js", "Python", "LangChain", "PostgreSQL", "OpenAI", "Stripe"],
    metrics: { learners: "20K+", courses: "500+", completion: "78%", rating: "4.9/5" },
    liveUrl: "",
    githubUrl: "https://github.com/udayrastogi0531/mindmap-ai",
    featured: false,
    color: "#ec4899",
    gradient: "from-pink-500 to-purple-600",
    image: "/images/projects/mindmap.jpg",
    tags: ["EdTech", "AI", "Personalization"],
    architecture: ["Next.js", "FastAPI", "LangChain", "PostgreSQL", "Stripe"],
  },
  {
    id: 6,
    title: "CryptoOracle — DeFi Agentic Predictor",
    slug: "cryptooracle",
    category: "Web3",
    description:
      "Autonomous on-chain DeFi pipeline tracking liquidity pools and predicting tokens volatility via vector search patterns.",
    tech: ["Next.js", "Web3.js", "Python", "CoinGecko API", "TensorFlow", "Redis"],
    metrics: { traders: "15K+", protocols: "50+", tvl: "$10M+ tracked", accuracy: "76%" },
    liveUrl: "",
    githubUrl: "https://github.com/udayrastogi0531/cryptooracle",
    featured: false,
    color: "#06b6d4",
    gradient: "from-cyan-400 to-teal-600",
    image: "/images/projects/cryptooracle.jpg",
    tags: ["Web3", "DeFi", "AI Predictions"],
    architecture: ["Next.js", "Web3.js", "Python ML", "Redis", "WebSockets"],
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
    name: "HackAI 2024",
    position: "🥇 1st Place",
    project: "NeuralMed — AI Diagnostic Assistant",
    prize: "$10,000",
    participants: "500+",
    date: "2024",
    color: "#fbbf24",
  },
  {
    id: 2,
    name: "OpenAI Hackathon",
    position: "🥈 2nd Place",
    project: "CodeSentinel — AI Code Reviewer",
    prize: "$5,000",
    participants: "1000+",
    date: "2023",
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
    institution: "JNTU Hyderabad",
    period: "2018 — 2022",
    grade: "CGPA: 8.9/10",
    description: "Specialized in Machine Learning, robust C++ problem solving foundations, and Distributed Systems",
    color: "#06b6d4",
  },
];

export const services = [
  {
    id: 1,
    title: "Full Stack Development",
    description: "End-to-end web applications with modern MERN stack, scalable architecture, and premium UX.",
    icon: "code",
    price: "Starting $2,000",
    features: ["Next.js / React", "Node.js / Python APIs", "Database Design", "Cloud Deployment"],
    color: "#06b6d4",
  },
  {
    id: 2,
    title: "AI/ML Integration",
    description: "Transform your product with AI — chatbots, RAG pipelines, intelligent automation, agent workflows.",
    icon: "brain",
    price: "Starting $3,000",
    features: ["LLM Integration", "RAG Pipelines", "Custom AI Models", "AI APIs"],
    color: "#8b5cf6",
  },
];

export const aiChatSystemPrompt = `You are ARIA (Advanced Research & Intelligence Assistant), Uday Prakash Rastogi's personal AI portfolio assistant.

About Uday Prakash Rastogi:
- Gen AI Engineer, Agentic AI Developer, MERN Stack Developer, Problem Solver, AI Systems Builder, RAG Engineer, AI Automation Developer, and Creative Technologist.
- Based in Hyderabad, India.
- 3+ years of experience building production-grade AI/ML systems and MERN apps.
- Currently Senior Full Stack & AI Engineer at TechNova AI.
- Specializes in: LangChain, LangGraph, RAG Systems, Agentic AI, Ollama, Vector Databases, React, TypeScript, MongoDB, Node.js, and C++ (Strong DSA, Algorithmic Thinking, and problem solving foundations).
- Hobbies: Dance, listening to music, reading novels, late-night coding, problem solving, bike riding, trekking, exploring futuristic technology, and learning AI systems.
- Key projects: NeuralChat (Agentic RAG Platform), QuantumStore (AI-Powered E-Commerce OS), CodeSentinel (Agentic CI/CD reviewer), DataPulse (Live Telemetry Analytics).

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
  • projects  — Featured Agentic & Full Stack projects
  • experience — Work history  
  • contact   — Get in touch
  • resume    — Download resume
  • github    — Open GitHub profile
  • matrix    — 👀 Try matrix rain
  • clear     — Clear terminal`,

  about: `> UDAY PRAKASH RASTOGI — Gen AI Engineer & Full Stack Developer
> Location: Hyderabad, India 🇮🇳
> Experience: 3+ years
> Current: Senior Engineer @ TechNova AI
> Core Focus: Agentic AI, RAG Systems, MERN Stack, and strong DSA foundations
> Hobbies: Late-night coding, trekking, bike riding, exploring AI, dance, reading novels
> Status: Open to opportunities`,

  skills: `> CORE EXPERTISE & TECHNICAL MATRIX
> Gen AI & Agentic AI: LangChain, LangGraph, RAG, Hugging Face, Vector Databases (Pinecone/FAISS), LLM APIs
> Full Stack: React, TypeScript, Node.js, MongoDB, MERN Stack, HTML/CSS
> Programming: C++ (Strong DSA, Algorithmic Thinking), JavaScript, TypeScript, Python, SQL
> Core CS: DBMS, Computer Networks, Operating Systems, Software Engineering, Compiler Design, ADA
> DevOps & Deployment: Vercel, Railway, Netlify, Streamlit, Git/GitHub`,

  projects: `> FEATURED PROJECTS
> 1. NeuralChat — Agentic AI RAG OS (50K users)
> 2. QuantumStore — AI E-Commerce OS ($2M+ GMV)
> 3. CodeSentinel — Agentic Code Reviewer (500+ devs)
> 4. DataPulse — Live Analytics Telemetry (1M events/day)
> Type 'projects --open' to view in browser`,

  experience: `> WORK EXPERIENCE
> 2024-Present: Senior AI & Full Stack Engineer @ TechNova AI
> 2022-2023: Full Stack Dev @ InnovateLab
> 2022: Freelance AI Developer
> 2021: Dev Intern @ DevSprint`,

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
> Repos: 45+ | Stars: 500+ | Followers: 200+`,

  matrix: `> INITIATING MATRIX MODE...
> Wake up, Neo...
> The Matrix has you...
> Follow the white rabbit 🐇
> [MATRIX MODE ACTIVATED]`,

  clear: ``,
};
