import { CareerPath, DayTask, PathCategory } from './types';
import { 
  Code, Database, Server, Terminal, Shield, Smartphone, 
  Cpu, Activity, PenTool, Layers, Box, Globe, 
  BarChart, Bot, Zap, Briefcase
} from 'lucide-react';

export const CAREER_PATHS: CareerPath[] = [
  // 1. Full Stack
  {
    id: 'p1',
    title: 'Full Stack "Product" Developer',
    description: 'Master the MERN stack (MongoDB, Express, React, Node.js) to build complete web applications.',
    category: PathCategory.Development,
    icon: 'Globe',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "The Web Skeleton", days: "1-40", description: "HTML5, CSS3, Git, JS Fundamentals" },
      { name: "JS & React Mastery", days: "41-120", description: "ES6+, React Hooks, State Management" },
      { name: "Backend & Deployment", days: "121-170", description: "Node.js, APIs, MongoDB, Auth" },
      { name: "Placement Readiness", days: "171-200", description: "DSA, Resume, Mock Interviews" }
    ]
  },
  // 2. Data Scientist
  {
    id: 'p2',
    title: 'Data Scientist & Analytics',
    description: 'Extract insights from data using Python, SQL, and Machine Learning engineering.',
    category: PathCategory.Data,
    icon: 'BarChart',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "Python & Math", days: "1-40", description: "Syntax, Linear Algebra, Statistics" },
      { name: "Manipulation & Viz", days: "41-100", description: "Pandas, NumPy, SQL, Matplotlib" },
      { name: "ML Engineering", days: "101-170", description: "Scikit-Learn, Deployment, Streamlit" },
      { name: "Storytelling", days: "171-200", description: "Advanced SQL, Tableau, Presentation" }
    ]
  },
  // 3. AI Engineer
  {
    id: 'p3',
    title: 'AI & Machine Learning Engineer',
    description: 'Build applications using LLMs, Deep Learning, and RAG pipelines.',
    category: PathCategory.Data,
    icon: 'Bot',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "Deep Learning Fdns", days: "1-60", description: "Neural Networks, PyTorch/TensorFlow" },
      { name: "Vision & NLP", days: "61-120", description: "CNNs, Transformers, Hugging Face" },
      { name: "Generative AI", days: "121-170", description: "RAG, LangChain, Vector DBs" },
      { name: "MLOps", days: "171-200", description: "Quantization, Edge Deployment" }
    ]
  },
  // 4. DevOps
  {
    id: 'p4',
    title: 'DevOps & Cloud Engineer',
    description: 'Automate deployment and manage cloud infrastructure using AWS, Docker, and K8s.',
    category: PathCategory.Infrastructure,
    icon: 'Server',
    image: 'https://images.unsplash.com/photo-1667372393119-c85c020799a3?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "Linux & Networking", days: "1-40", description: "Bash, TCP/IP, DNS, OS Internals" },
      { name: "Containerization", days: "41-100", description: "Docker, Kubernetes Basics" },
      { name: "CI/CD & IaC", days: "101-170", description: "Jenkins, Terraform, AWS" },
      { name: "SRE", days: "171-200", description: "Monitoring, Prometheus, Grafana" }
    ]
  },
  // 5. Cybersecurity
  {
    id: 'p5',
    title: 'Cybersecurity Analyst',
    description: 'Defend and attack systems as a Blue Team or Red Team specialist.',
    category: PathCategory.Infrastructure,
    icon: 'Shield',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "Security Fundamentals", days: "1-50", description: "Network Security, Compliance" },
      { name: "Linux & Scripting", days: "51-100", description: "Python for Pentesting, Kali Linux" },
      { name: "Ops & Defense", days: "101-170", description: "OWASP Top 10, SIEM, Burp Suite" },
      { name: "CTFs & Reporting", days: "171-200", description: "Capture The Flag, Vulnerability Reports" }
    ]
  },
  // 6. Mobile App
  {
    id: 'p6',
    title: 'Mobile App Developer',
    description: 'Build cross-platform iOS and Android apps using Flutter.',
    category: PathCategory.Development,
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "Dart & OOP", days: "1-40", description: "Language Basics, Async Programming" },
      { name: "Flutter Framework", days: "41-100", description: "Widgets, State Management, UI" },
      { name: "Backend Integration", days: "101-170", description: "Firebase, Maps, API Integration" },
      { name: "Deployment", days: "171-200", description: "Play Store, App Store Guidelines" }
    ]
  },
  // 7. Java Enterprise
  {
    id: 'p7',
    title: 'Java Enterprise & Backend',
    description: 'The bedrock of large-scale systems. Ideal for TCS, Infosys, and banking sectors.',
    category: PathCategory.Development,
    icon: 'Code',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "Core Java Mastery", days: "1-60", description: "OOPs, Collections, Multithreading, JVM" },
      { name: "Advanced Java & DB", days: "61-110", description: "JDBC, Complex SQL, Hibernate/JPA" },
      { name: "Spring Boot", days: "111-170", description: "REST APIs, Spring Security, Microservices" },
      { name: "Testing & Patterns", days: "171-200", description: "JUnit, Design Patterns, Interview Prep" }
    ]
  },
  // 8. QA Automation
  {
    id: 'p8',
    title: 'QA Automation & SDET',
    description: 'High-demand role involving writing code to test code. Strategic entry point.',
    category: PathCategory.Specialized,
    icon: 'CheckCircle',
    image: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "Programming Base", days: "1-40", description: "Core Java or Python Fundamentals" },
      { name: "Selenium & Automation", days: "41-100", description: "WebDriver, Locators, Page Object Model" },
      { name: "API Testing & Tools", days: "101-170", description: "Postman, REST Assured, Cypress" },
      { name: "Certification Prep", days: "171-200", description: "ISTQB Concepts, Cucumber/Gherkin" }
    ]
  },
  // 9. Blockchain
  {
    id: 'p9',
    title: 'Blockchain & Web3 Developer',
    description: 'Build decentralized applications and smart contracts on Ethereum.',
    category: PathCategory.Specialized,
    icon: 'Database',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "Blockchain Theory", days: "1-40", description: "Distributed Ledgers, Hashing, EVM" },
      { name: "Smart Contracts", days: "41-100", description: "Solidity, Remix IDE, Security" },
      { name: "dApp Engineering", days: "101-170", description: "Ethers.js, React, Hardhat" },
      { name: "Auditing & Security", days: "171-200", description: "Gas Optimization, Auditing" }
    ]
  },
  // 10. Embedded Systems
  {
    id: 'p10',
    title: 'Embedded Systems & IoT',
    description: 'Bridge software and hardware. Crucial for automotive and smart devices.',
    category: PathCategory.Infrastructure,
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "C/C++ & Architecture", days: "1-60", description: "Pointers, Memory, Microprocessors" },
      { name: "Microcontrollers", days: "61-120", description: "GPIO, I2C, SPI, Arduino/ESP32" },
      { name: "RTOS & IoT", days: "121-170", description: "FreeRTOS, MQTT, AWS IoT Core" },
      { name: "PCB Design Basics", days: "171-200", description: "KiCad, Datasheets, Debugging" }
    ]
  },
  // 11. Game Development
  {
    id: 'p11',
    title: 'Game Development (Unity/C#)',
    description: 'Create interactive 3D/2D experiences using the industry-standard engine.',
    category: PathCategory.Specialized,
    icon: 'Box',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "C# Programming", days: "1-50", description: "Syntax, Logic, Game Math (Vectors)" },
      { name: "Unity Fundamentals", days: "51-110", description: "Interface, Prefabs, Physics" },
      { name: "Mechanics & AI", days: "111-170", description: "Pathfinding, Animation, UI" },
      { name: "Polish & Optimization", days: "171-200", description: "Profiling, Memory, Object Pooling" }
    ]
  },
  // 12. UI/UX Design
  {
    id: 'p12',
    title: 'UI/UX Product Design',
    description: 'Design the psychology and aesthetics of software using Figma.',
    category: PathCategory.Design,
    icon: 'PenTool',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "Design Theory", days: "1-50", description: "Color, Typography, Accessibility" },
      { name: "Tool Mastery", days: "51-100", description: "Figma, Auto-layout, Prototyping" },
      { name: "UX Research", days: "101-170", description: "Wireframing, User Testing" },
      { name: "Portfolio", days: "171-200", description: "Case Studies, Behance" }
    ]
  },
  // 13. RPA
  {
    id: 'p13',
    title: 'RPA Developer (UiPath)',
    description: 'Automate business tasks. Low-code but high-logic corporate automation.',
    category: PathCategory.Specialized,
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "Logic & Mapping", days: "1-50", description: "Flowcharts, Loops, Data Handling" },
      { name: "RPA Tools", days: "51-120", description: "UiPath Studio, Selectors, Variables" },
      { name: "Advanced Automation", days: "121-170", description: "PDF/Email Automation, OCR" },
      { name: "Exception Handling", days: "171-200", description: "REFramework, Logging" }
    ]
  },
  // 14. TPM
  {
    id: 'p14',
    title: 'Technical Product Management',
    description: 'Bridge business, design, and engineering. For engineers with leadership traits.',
    category: PathCategory.Design,
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "Lifecycle & Agile", days: "1-60", description: "Scrum, Kanban, User Stories, PRDs" },
      { name: "Metrics & Analytics", days: "61-120", description: "SQL, A/B Testing, Pirate Metrics" },
      { name: "Strategy & Tech", days: "121-170", description: "API Economy, System Design, PRD Capstone" },
      { name: "Product Interviews", days: "171-200", description: "Product Sense, Estimation, Strategy" }
    ]
  },
  // 15. Competitive Programmer
  {
    id: 'p15',
    title: 'The Competitive Programmer',
    description: 'Strictly for FAANG aspirants. Deep dive into Data Structures & Algorithms.',
    category: PathCategory.Development,
    icon: 'Terminal',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800',
    totalDays: 200,
    phases: [
      { name: "Language Mastery", days: "1-50", description: "C++/Java STL, Collections" },
      { name: "Linear DSA", days: "51-100", description: "Arrays, Linked Lists, Stacks, Queues" },
      { name: "Non-Linear DSA", days: "101-170", description: "Trees, Graphs, DP, Greedy" },
      { name: "Mock Interviews", days: "171-200", description: "Whiteboard Coding, System Design" }
    ]
  }
];

// --- SPECIFIC CURRICULUM DATA FOR PATH 1 (MERN) ---

const MERN_CURRICULUM_DATA: Record<number, Partial<DayTask>> = {
  1: {
    topic: 'How the Internet Works & HTML Basics',
    phase: 'Phase I: The Web Skeleton',
    input: {
      description: "Understand the request/response cycle, DNS, and the basic building blocks of a webpage.",
      resources: [
        { type: 'article', title: 'How the Web Works (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work' },
        { type: 'video', title: 'The Odin Project: Foundations', url: 'https://www.theodinproject.com/paths/foundations/courses/foundations' }
      ]
    },
    output: {
      description: "Create an 'index.html' file manually. Include a Header, Main section, and Footer using only Semantic HTML5 tags (no divs).",
      submissionType: 'code'
    },
    synthesis: {
      question: "Why do we use semantic tags like <article> instead of just <div>? Explain in 2 sentences.",
      answerType: 'text'
    }
  },
  2: {
    topic: 'Git & GitHub Fundamentals',
    phase: 'Phase I: The Web Skeleton',
    input: {
      description: "Version control is crucial. Learn to initialize a repo, stage files, and commit changes.",
      resources: [
        { type: 'article', title: 'The Odin Project: Git Basics', url: 'https://www.theodinproject.com/lessons/foundations-git-basics' },
        { type: 'video', title: 'Git & GitHub Crash Course', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk' }
      ]
    },
    output: {
      description: "Initialize a git repository for your index.html. Create a .gitignore file. Push your code to a public GitHub repository named 'openpath-portfolio'.",
      submissionType: 'link'
    },
    synthesis: {
      question: "What is the specific difference between 'git add' and 'git commit'?",
      answerType: 'text'
    }
  },
  3: {
    topic: 'CSS Box Model & Selectors',
    phase: 'Phase I: The Web Skeleton',
    input: {
      description: "Everything in CSS is a box. Master margins, borders, padding, and content.",
      resources: [
        { type: 'article', title: 'MDN: The Box Model', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model' },
        { type: 'video', title: 'Kevin Powell: CSS Box Model', url: 'https://www.youtube.com/watch?v=rIO5326qE_s' }
      ]
    },
    output: {
      description: "Style your index.html. Add a profile picture with a circular border, and ensure padding does not increase the element's width (box-sizing).",
      submissionType: 'code'
    },
    synthesis: {
      question: "Explain the difference between 'content-box' and 'border-box' behavior.",
      answerType: 'text'
    }
  },
  4: {
    topic: 'Modern Layouts: Flexbox',
    phase: 'Phase I: The Web Skeleton',
    input: {
      description: "Abandon floats. Learn Flexbox to create responsive 1-dimensional layouts.",
      resources: [
        { type: 'tool', title: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/' },
        { type: 'article', title: 'CSS Tricks: Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }
      ]
    },
    output: {
      description: "Create a 3-column 'Pricing Card' component. On mobile screens, it should stack vertically (flex-direction).",
      submissionType: 'code'
    },
    synthesis: {
      question: "When would you use 'justify-content' vs 'align-items'?",
      answerType: 'text'
    }
  },
  5: {
    topic: 'JavaScript Variables & Execution',
    phase: 'Phase I: The Web Skeleton',
    input: {
      description: "Understand how JS is executed (Hoisting, Scope, and Temporal Dead Zone).",
      resources: [
        { type: 'video', title: 'Namaste JavaScript: Execution Context', url: 'https://www.youtube.com/watch?v=ZvbzSrg0afE' },
        { type: 'article', title: 'JavaScript.info: Variables', url: 'https://javascript.info/variables' }
      ]
    },
    output: {
      description: "Write a script that declares variables using var, let, and const. Demonstrate the scope difference in a console log.",
      submissionType: 'code'
    },
    synthesis: {
      question: "Why is 'undefined' different from 'null' in JavaScript?",
      answerType: 'text'
    }
  },
  // ... Days 6-194 would be generated via the helper below ...
  196: {
    topic: 'ATS-Proof Resume Strategy',
    phase: 'Phase IV: Placement Readiness',
    isPlacement: true,
    input: {
      description: "Recruiters scan resumes for 6 seconds. Your resume must be parseable by Applicant Tracking Systems (ATS).",
      resources: [
        { type: 'article', title: 'Resume.org: The Harvard Resume Guide', url: 'https://www.resume.org/' },
        { type: 'tool', title: 'Jake\'s Resume (LaTeX Template)', url: 'https://github.com/jakegut/resume' }
      ]
    },
    output: {
      description: "Rewrite the 'Experience' section of your resume using the 'Action Verb + Metric + Result' formula. (e.g., 'Reduced API latency by 30%...')",
      submissionType: 'text'
    },
    synthesis: {
      question: "Paste one 'Before' and 'After' bullet point from your resume.",
      answerType: 'text'
    }
  },
  197: {
    topic: 'Mock Interview: Behavioral',
    phase: 'Phase IV: Placement Readiness',
    isPlacement: true,
    input: {
      description: "Master the STAR method (Situation, Task, Action, Result) for behavioral questions.",
      resources: [
        { type: 'tool', title: 'Pramp: Free Mock Interviews', url: 'https://www.pramp.com/' },
        { type: 'video', title: 'Behavioral Interviewing - STAR Method', url: 'https://www.youtube.com/' }
      ]
    },
    output: {
      description: "Record a 2-minute video answering: 'Tell me about a time you failed to meet a deadline.'",
      submissionType: 'file'
    },
    synthesis: {
      question: "Critique your own video. Did you spend too much time on the Situation vs the Result?",
      answerType: 'text'
    }
  },
  198: {
    topic: 'System Design Basics',
    phase: 'Phase IV: Placement Readiness',
    isPlacement: true,
    input: {
      description: "Understand Scalability, Load Balancers, Caching, and Database Sharding.",
      resources: [
        { type: 'video', title: 'ByteByteGo: System Design Course', url: 'https://www.youtube.com/@ByteByteGo' },
        { type: 'article', title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' }
      ]
    },
    output: {
      description: "Draw a high-level architecture diagram for a URL Shortener (like Bit.ly).",
      submissionType: 'file'
    },
    synthesis: {
      question: "Why might you need a Load Balancer in this system?",
      answerType: 'text'
    }
  },
  199: {
    topic: 'Aptitude & Logic Warmup',
    phase: 'Phase IV: Placement Readiness',
    isPlacement: true,
    input: {
      description: "Many mass recruiters (TCS, Infosys) have an initial aptitude screen. Don't fail the easy round.",
      resources: [
        { type: 'tool', title: 'IndiaBix: Aptitude Questions', url: 'https://www.indiabix.com/' },
        { type: 'tool', title: 'PrepInsta: Placement Papers', url: 'https://prepinsta.com/' }
      ]
    },
    output: {
      description: "Complete a 20-question practice set on 'Time and Work' and 'Probability'. Aim for >80%.",
      submissionType: 'text'
    },
    synthesis: {
      question: "What was the trickiest question you encountered?",
      answerType: 'text'
    }
  },
  200: {
    topic: 'The Final Application',
    phase: 'Phase IV: Placement Readiness',
    isPlacement: true,
    input: {
      description: "You are ready. It's time to hunt. Organize your portfolio and target companies.",
      resources: [
        { type: 'tool', title: 'Wellfound (AngelList)', url: 'https://wellfound.com/' },
        { type: 'article', title: 'Cold Email Templates for Developers', url: 'https://www.freecodecamp.org/news' }
      ]
    },
    output: {
      description: "Apply to 5 companies. Send 3 cold DMs to founders/CTOs with your portfolio link.",
      submissionType: 'text'
    },
    synthesis: {
      question: "Reflect on Day 1 vs Day 200. You are now an Engineer. How does it feel?",
      answerType: 'text'
    }
  }
};

// Helper to generate full curriculum based on MERN data or fallback
export const getDayTask = (pathId: string, dayNumber: number): DayTask => {
  // Check if we have specific data for this day
  const specificData = MERN_CURRICULUM_DATA[dayNumber];
  
  // Unique ID for the task scoped to the path
  const taskId = `${pathId}-day-${dayNumber}`;

  if (specificData) {
    return {
      id: taskId,
      pathId,
      dayNumber,
      topic: specificData.topic!,
      phase: specificData.phase!,
      isPlacement: specificData.isPlacement || false,
      input: specificData.input as any,
      output: specificData.output as any,
      synthesis: specificData.synthesis as any
    };
  }

  // Fallback generator for days not explicitly defined in the map
  // Defaulting to 4 phases for paths that don't match the exact 120/170 cutoffs in MERN
  // We use the path metadata to determine phases if possible, but for this mock we generally assume the 4-phase structure from the PDF
  
  let phase = "Phase I: Foundations";
  if (dayNumber > 40) phase = "Phase II: Core Competency";
  if (dayNumber > 120) phase = "Phase III: The Capstone Portfolio";
  if (dayNumber > 170) phase = "Phase IV: Placement Readiness";
  
  return {
    id: taskId,
    pathId,
    dayNumber,
    topic: `Day ${dayNumber} Curriculum Topic`,
    phase,
    isPlacement: dayNumber > 170,
    input: {
      description: `Detailed study material for Day ${dayNumber}. Focus on reading documentation and understanding the core concepts.`,
      resources: [
        { type: 'article', title: 'Official Documentation', url: '#' },
        { type: 'video', title: 'Video Tutorial', url: '#' }
      ]
    },
    output: {
      description: `Build a small component or script that demonstrates the concept learned in Day ${dayNumber}.`,
      submissionType: 'code'
    },
    synthesis: {
      question: "What was the most challenging part of today's concept?",
      answerType: 'text'
    }
  };
};

export const SAMPLE_DAY_TASK = getDayTask('p1', 1);