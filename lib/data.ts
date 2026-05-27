// ============================================================
// 📂 lib/data.ts — ALL PORTFOLIO DATA (Edit this to personalize)
// ============================================================

export const personalInfo = {
  name: "Uday",
  fullName: "Uday Kumar",
  title: "Full Stack Engineer",
  taglines: [
    "Full Stack Engineer",
    "AI Engineer",
    "Creative Technologist",
    "Gen AI Developer",
    "Problem Solver",
    "Neural Interface Creator",
  ],
  bio: `I architect digital experiences at the intersection of AI and human creativity. 
  With 3+ years building production-grade systems, I transform complex problems into 
  elegant, scalable solutions that push the boundaries of what's possible.`,
  mission: `To build AI-powered systems that don't just solve problems — they redefine 
  how humans interact with technology. Every line of code is a step toward a more 
  intelligent, more connected world.`,
  philosophy: `Code is poetry. Architecture is art. AI is the canvas. 
  I don't build applications — I engineer experiences.`,
  location: "Hyderabad, India",
  email: "uday@example.com",
  phone: "+91 98765 43210",
  availability: "Open to opportunities",
  yearsOfExperience: 3,
  projectsCompleted: 25,
  clientsSatisfied: 15,
  githubStars: 500,
  avatar: "/images/avatar.jpg",
  resume: "/resume.pdf",
};

export const socialLinks = {
  github: "https://github.com/udaykumar",
  linkedin: "https://linkedin.com/in/udaykumar",
  twitter: "https://twitter.com/udaykumar",
  youtube: "https://youtube.com/@udaykumar",
  devto: "https://dev.to/udaykumar",
  email: "mailto:uday@example.com",
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
  {
    id: 4,
    company: "DevSprint Startup",
    logo: "/images/companies/devsprint.png",
    role: "Junior Developer Intern",
    type: "Internship",
    period: "Jun 2021 — Dec 2021",
    location: "Hyderabad, India",
    description:
      "First industry experience building web applications and learning production workflows.",
    achievements: [
      "Developed 5 full-stack features independently",
      "Contributed to open source with 200+ GitHub stars",
      "Mentored 3 junior interns",
    ],
    tech: ["React", "Node.js", "MySQL", "Git", "Figma"],
    color: "#f59e0b",
  },
];

export const skills = {
  Frontend: [
    { name: "Next.js", level: 95, icon: "nextjs" },
    { name: "React", level: 95, icon: "react" },
    { name: "TypeScript", level: 90, icon: "typescript" },
    { name: "Three.js", level: 80, icon: "threejs" },
    { name: "Tailwind CSS", level: 92, icon: "tailwind" },
    { name: "Framer Motion", level: 85, icon: "framer" },
    { name: "GSAP", level: 80, icon: "gsap" },
  ],
  Backend: [
    { name: "Node.js", level: 90, icon: "nodejs" },
    { name: "Python", level: 88, icon: "python" },
    { name: "FastAPI", level: 85, icon: "fastapi" },
    { name: "GraphQL", level: 80, icon: "graphql" },
    { name: "REST APIs", level: 95, icon: "api" },
    { name: "WebSockets", level: 82, icon: "websocket" },
  ],
  "AI/ML": [
    { name: "LangChain", level: 88, icon: "langchain" },
    { name: "OpenAI API", level: 92, icon: "openai" },
    { name: "TensorFlow", level: 78, icon: "tensorflow" },
    { name: "PyTorch", level: 75, icon: "pytorch" },
    { name: "Hugging Face", level: 82, icon: "huggingface" },
    { name: "Vector DBs", level: 80, icon: "vectordb" },
    { name: "RAG Systems", level: 85, icon: "rag" },
  ],
  Cloud: [
    { name: "AWS", level: 85, icon: "aws" },
    { name: "GCP", level: 78, icon: "gcp" },
    { name: "Vercel", level: 95, icon: "vercel" },
    { name: "Docker", level: 88, icon: "docker" },
    { name: "Kubernetes", level: 72, icon: "kubernetes" },
  ],
  Database: [
    { name: "PostgreSQL", level: 88, icon: "postgresql" },
    { name: "MongoDB", level: 90, icon: "mongodb" },
    { name: "Redis", level: 82, icon: "redis" },
    { name: "Prisma", level: 88, icon: "prisma" },
    { name: "Pinecone", level: 80, icon: "pinecone" },
  ],
  DevOps: [
    { name: "CI/CD", level: 85, icon: "cicd" },
    { name: "GitHub Actions", level: 88, icon: "github" },
    { name: "Nginx", level: 78, icon: "nginx" },
    { name: "Linux", level: 85, icon: "linux" },
  ],
};

export const techStack = [
  "Next.js", "React", "TypeScript", "Python", "Node.js",
  "Three.js", "TensorFlow", "LangChain", "OpenAI", "AWS",
  "Docker", "MongoDB", "PostgreSQL", "Redis", "GraphQL",
  "FastAPI", "Kubernetes", "Vercel", "Prisma", "Tailwind",
];

export const projects = [
  {
    id: 1,
    title: "NeuralChat — AI Conversation Platform",
    slug: "neuralchat",
    category: "AI/ML",
    description:
      "Production-grade AI chat platform with multi-model support, RAG pipeline, and real-time streaming. Handles 100K+ conversations daily.",
    longDescription: `NeuralChat is a next-generation AI conversation platform that combines multiple LLM providers 
    with a sophisticated RAG pipeline. Built with a microservices architecture, it supports real-time streaming, 
    custom knowledge bases, and enterprise-grade security.`,
    tech: ["Next.js", "Python", "LangChain", "OpenAI", "Pinecone", "Redis", "PostgreSQL"],
    metrics: { users: "50K+", conversations: "1M+", uptime: "99.9%", latency: "<100ms" },
    liveUrl: "https://neuralchat.demo",
    githubUrl: "https://github.com/udaykumar/neuralchat",
    featured: true,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-600",
    image: "/images/projects/neuralchat.jpg",
    tags: ["AI", "Production", "Scaling"],
    architecture: ["Next.js Frontend", "FastAPI Backend", "LangChain RAG", "Pinecone VectorDB", "Redis Cache"],
  },
  {
    id: 2,
    title: "QuantumStore — E-Commerce OS",
    slug: "quantumstore",
    category: "Full Stack",
    description:
      "Blazing-fast e-commerce platform with AI recommendations, real-time inventory, and multi-currency support. $2M+ GMV processed.",
    longDescription: `QuantumStore reimagines e-commerce with AI-powered personalization, real-time inventory management, 
    and a hyper-optimized checkout flow. Built for scale with a 99.99% uptime SLA.`,
    tech: ["Next.js", "Node.js", "MongoDB", "Redis", "Stripe", "Razorpay", "Elasticsearch"],
    metrics: { gmv: "$2M+", users: "100K+", orders: "50K+", conversion: "8.5%" },
    liveUrl: "https://quantumstore.demo",
    githubUrl: "https://github.com/udaykumar/quantumstore",
    featured: true,
    color: "#8b5cf6",
    gradient: "from-purple-500 to-pink-600",
    image: "/images/projects/quantumstore.jpg",
    tags: ["E-Commerce", "Scaling", "AI"],
    architecture: ["Next.js", "Node.js API", "MongoDB Atlas", "Redis Cache", "Stripe/Razorpay"],
  },
  {
    id: 3,
    title: "CodeSentinel — AI Code Review",
    slug: "codesentinel",
    category: "AI/ML",
    description:
      "GitHub-integrated AI code reviewer that catches bugs, security vulnerabilities, and suggests optimizations. Saves 3hrs/developer/week.",
    longDescription: `CodeSentinel uses fine-tuned LLMs to review pull requests in real-time, 
    detecting security vulnerabilities, performance issues, and code quality problems before they reach production.`,
    tech: ["Python", "FastAPI", "OpenAI", "GitHub API", "PostgreSQL", "Docker"],
    metrics: { prs: "10K+", bugs: "5K caught", devs: "500+", timeSaved: "3hrs/week" },
    liveUrl: "https://codesentinel.demo",
    githubUrl: "https://github.com/udaykumar/codesentinel",
    featured: true,
    color: "#10b981",
    gradient: "from-emerald-500 to-cyan-600",
    image: "/images/projects/codesentinel.jpg",
    tags: ["AI", "DevTools", "Security"],
    architecture: ["FastAPI", "LLM Fine-tuning", "GitHub Webhooks", "PostgreSQL", "Docker"],
  },
  {
    id: 4,
    title: "DataPulse — Real-time Analytics",
    slug: "datapulse",
    category: "Full Stack",
    description:
      "Enterprise analytics dashboard with real-time data streaming, AI-powered insights, and beautiful visualizations.",
    tech: ["Next.js", "Python", "Apache Kafka", "ClickHouse", "D3.js", "WebSockets"],
    metrics: { events: "1M/day", latency: "<50ms", dashboards: "200+", clients: "30+" },
    liveUrl: "https://datapulse.demo",
    githubUrl: "https://github.com/udaykumar/datapulse",
    featured: false,
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-600",
    image: "/images/projects/datapulse.jpg",
    tags: ["Analytics", "Real-time", "Visualization"],
    architecture: ["Next.js", "Kafka", "ClickHouse", "WebSockets", "D3.js"],
  },
  {
    id: 5,
    title: "MindMap AI — Learning Platform",
    slug: "mindmap-ai",
    category: "EdTech",
    description:
      "AI-powered personalized learning platform that generates custom curricula and adapts to learning patterns.",
    tech: ["Next.js", "Python", "LangChain", "PostgreSQL", "OpenAI", "Stripe"],
    metrics: { learners: "20K+", courses: "500+", completion: "78%", rating: "4.9/5" },
    liveUrl: "https://mindmapai.demo",
    githubUrl: "https://github.com/udaykumar/mindmap-ai",
    featured: false,
    color: "#ec4899",
    gradient: "from-pink-500 to-purple-600",
    image: "/images/projects/mindmap.jpg",
    tags: ["EdTech", "AI", "Personalization"],
    architecture: ["Next.js", "FastAPI", "LangChain", "PostgreSQL", "Stripe"],
  },
  {
    id: 6,
    title: "CryptoOracle — DeFi Dashboard",
    slug: "cryptooracle",
    category: "Web3",
    description:
      "Real-time DeFi analytics dashboard with portfolio tracking, AI price predictions, and on-chain analytics.",
    tech: ["Next.js", "Web3.js", "Python", "CoinGecko API", "TensorFlow", "Redis"],
    metrics: { traders: "15K+", protocols: "50+", tvl: "$10M+ tracked", accuracy: "76%" },
    liveUrl: "https://cryptooracle.demo",
    githubUrl: "https://github.com/udaykumar/cryptooracle",
    featured: false,
    color: "#06b6d4",
    gradient: "from-cyan-400 to-teal-600",
    image: "/images/projects/cryptooracle.jpg",
    tags: ["Web3", "DeFi", "AI Predictions"],
    architecture: ["Next.js", "Web3.js", "Python ML", "Redis", "WebSockets"],
  },
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
  {
    id: 3,
    title: "The Future of AI Agents: Building Autonomous Systems",
    slug: "ai-agents-future",
    excerpt: "How I built an AI agent system that autonomously debugs and deploys code.",
    category: "AI/ML",
    readTime: "10 min",
    date: "2024-02-10",
    tags: ["AI Agents", "LangChain", "Automation"],
    color: "#10b981",
    featured: false,
  },
  {
    id: 4,
    title: "Microservices vs Monolith: The Real Answer",
    slug: "microservices-vs-monolith",
    excerpt: "After building both at scale, here's what I actually recommend and when.",
    category: "Architecture",
    readTime: "8 min",
    date: "2024-01-20",
    tags: ["Architecture", "DevOps", "Scaling"],
    color: "#f59e0b",
    featured: false,
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
  {
    id: 3,
    name: "Meta Full Stack Developer",
    issuer: "Meta / Coursera",
    date: "2022",
    credentialId: "META-FSD-2022-UDAY",
    color: "#3b82f6",
    icon: "meta",
  },
  {
    id: 4,
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2022",
    credentialId: "DL-SPEC-2022-UDAY",
    color: "#8b5cf6",
    icon: "deeplearning",
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
  {
    id: 3,
    name: "Google DevFest",
    position: "🥉 3rd Place",
    project: "EduBot — Personalized Learning AI",
    prize: "$2,500",
    participants: "300+",
    date: "2023",
    color: "#cd7c2f",
  },
  {
    id: 4,
    name: "Buildathon 2022",
    position: "🏆 Winner",
    project: "ClimaAI — Climate Prediction System",
    prize: "$3,000",
    participants: "200+",
    date: "2022",
    color: "#fbbf24",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "CTO at TechNova AI",
    avatar: "/images/testimonials/priya.jpg",
    content:
      "Uday is the rare engineer who combines deep technical expertise with creative problem-solving. The AI systems he built for us handle millions of requests flawlessly.",
    rating: 5,
    color: "#06b6d4",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Founder at InnovateLab",
    avatar: "/images/testimonials/rahul.jpg",
    content:
      "Working with Uday transformed our platform. He doesn't just write code — he architects solutions. Our conversion rate tripled after his optimizations.",
    rating: 5,
    color: "#8b5cf6",
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Product Lead at QuantumVentures",
    avatar: "/images/testimonials/sarah.jpg",
    content:
      "Uday delivered beyond expectations every single time. His AI expertise is world-class and his communication is exceptional. Truly a 10x developer.",
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
    description: "Specialized in Machine Learning and Distributed Systems",
    color: "#06b6d4",
  },
];

export const services = [
  {
    id: 1,
    title: "Full Stack Development",
    description: "End-to-end web applications with modern tech stack, scalable architecture, and premium UX.",
    icon: "code",
    price: "Starting $2,000",
    features: ["Next.js / React", "Node.js / Python APIs", "Database Design", "Cloud Deployment"],
    color: "#06b6d4",
  },
  {
    id: 2,
    title: "AI/ML Integration",
    description: "Transform your product with AI — chatbots, recommendation engines, intelligent automation.",
    icon: "brain",
    price: "Starting $3,000",
    features: ["LLM Integration", "RAG Pipelines", "Custom AI Models", "AI APIs"],
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Technical Consulting",
    description: "Architecture reviews, tech stack decisions, performance optimization, and scaling strategy.",
    icon: "lightbulb",
    price: "$150/hour",
    features: ["Architecture Review", "Code Audit", "Performance Tuning", "Team Mentoring"],
    color: "#10b981",
  },
  {
    id: 4,
    title: "Dev Setup & DevOps",
    description: "CI/CD pipelines, Docker/Kubernetes setup, monitoring, and infrastructure automation.",
    icon: "server",
    price: "Starting $1,500",
    features: ["CI/CD Setup", "Docker/K8s", "Monitoring", "Infrastructure as Code"],
    color: "#f59e0b",
  },
];

export const aiChatSystemPrompt = `You are ARIA (Advanced Research & Intelligence Assistant), Uday's personal AI portfolio assistant.

About Uday Kumar:
- Full Stack Engineer & AI Engineer based in Hyderabad, India
- 3+ years of experience building production-grade AI/ML systems
- Currently Senior Full Stack & AI Engineer at TechNova AI
- Specializes in: Next.js, React, Python, LangChain, OpenAI APIs, AWS, Node.js
- Built systems handling 1M+ daily users/requests
- Won multiple hackathons including HackAI 2024 ($10,000 prize)
- Key projects: NeuralChat, QuantumStore, CodeSentinel, DataPulse

Projects:
1. NeuralChat - AI conversation platform (50K users, 1M+ conversations)
2. QuantumStore - E-commerce platform ($2M+ GMV, 100K users)
3. CodeSentinel - AI code reviewer (10K+ PRs reviewed, 500+ devs)
4. DataPulse - Real-time analytics (1M events/day)
5. MindMap AI - Learning platform (20K learners)

Contact: uday@example.com | GitHub: github.com/udaykumar | LinkedIn: linkedin.com/in/udaykumar

Instructions:
- Be helpful, concise, and professional
- Answer questions about Uday's skills, projects, experience, and availability
- For hiring inquiries, provide Uday's email
- Use futuristic, tech-forward language
- Keep responses under 150 words unless asked for detail
- You can discuss technical topics related to Uday's expertise`;

export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  • about     — Who is Uday?
  • skills    — Tech stack & expertise
  • projects  — Featured projects
  • experience — Work history  
  • contact   — Get in touch
  • resume    — Download resume
  • github    — Open GitHub profile
  • matrix    — 👀 Try it
  • theme     — Toggle dark/light
  • clear     — Clear terminal`,

  about: `> UDAY KUMAR — Full Stack & AI Engineer
> Location: Hyderabad, India 🇮🇳
> Experience: 3+ years
> Current: Senior Engineer @ TechNova AI
> Mission: Building AI systems that redefine human-computer interaction
> Status: Open to opportunities`,

  skills: `> CORE TECH STACK
> Frontend: Next.js, React, TypeScript, Three.js
> Backend: Node.js, Python, FastAPI, GraphQL
> AI/ML: LangChain, OpenAI, TensorFlow, PyTorch
> Cloud: AWS, GCP, Vercel, Docker, Kubernetes
> Database: PostgreSQL, MongoDB, Redis, Pinecone`,

  projects: `> FEATURED PROJECTS
> 1. NeuralChat — AI Platform (50K users)
> 2. QuantumStore — E-Commerce ($2M+ GMV)
> 3. CodeSentinel — AI Code Review (500+ devs)
> 4. DataPulse — Analytics (1M events/day)
> Type 'projects --open' to view in browser`,

  experience: `> WORK EXPERIENCE
> 2024-Present: Senior AI Engineer @ TechNova AI
> 2022-2023: Full Stack Dev @ InnovateLab
> 2022: Freelance AI Developer
> 2021: Dev Intern @ DevSprint`,

  contact: `> CONTACT UDAY
> Email: uday@example.com
> GitHub: github.com/udaykumar
> LinkedIn: linkedin.com/in/udaykumar
> Twitter: @udaykumar
> Response time: < 24 hours`,

  resume: `> Initiating resume download...
> File: uday-kumar-resume.pdf
> Size: 245KB
> [DOWNLOADING...]`,

  github: `> Opening GitHub profile...
> github.com/udaykumar
> Repos: 45+ | Stars: 500+ | Followers: 200+`,

  matrix: `> INITIATING MATRIX MODE...
> Wake up, Neo...
> The Matrix has you...
> Follow the white rabbit 🐇
> [MATRIX MODE ACTIVATED]`,

  clear: ``,
};
