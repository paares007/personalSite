import profilePhoto from '../assets/profile.jpg'

export const SITE = {
  name: 'Pablo Arango',
  title: 'ML & AI Engineer in Training',
  location: 'Austin, TX',
  school: 'The University of Texas at Austin',
  program: 'Turing Honors Computer Science',
  bio: 'Turing Honors Computer Science student at The University of Texas at Austin. Passionate about machine learning, artificial intelligence, and building intelligent systems that solve real-world problems.',
  longBio: [
    'I\'m a Turing Honors Computer Science student at UT Austin, drawn to the places where math, code, and real-world impact meet. Whether I\'m training a model, designing a full-stack app, or debugging a tricky algorithm, I love the process of turning abstract ideas into something people can actually use.',
    'My interests sit at the intersection of machine learning, software engineering, and product design. I enjoy building systems that feel intelligent — not just technically impressive, but genuinely useful. From neural networks to polished user interfaces, I care about both the science and the craft.',
    'Outside of coursework, I\'m constantly building. I ship projects on GitHub, experiment with new frameworks, and push myself to learn by doing. I believe the best way to understand AI is to build with it — and the best way to grow as an engineer is to ship.',
  ],
  highlights: [
    {
      title: 'Machine Learning & Deep Learning',
      description: 'Neural networks, model training, and applying ML to real datasets and problems.',
    },
    {
      title: 'Artificial Intelligence',
      description: 'Exploring intelligent systems — from classical AI to modern LLM-powered applications.',
    },
    {
      title: 'Software Engineering',
      description: 'Full-stack development with React, TypeScript, and clean, maintainable architecture.',
    },
    {
      title: 'Data-Driven Problem Solving',
      description: 'Turning raw data into insights and building tools that help people make better decisions.',
    },
  ],
  skills: {
    languages: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Java', 'Go', 'C', 'SQL'],
    ml: ['PyTorch', 'OpenCV', 'YOLO', 'RoboFlow', 'NumPy', 'Pandas'],
    tools: ['Git', 'GitHub', 'Linux', 'VS Code', 'Cursor', 'Claude Code', 'Docker'],
    system_design: ['REST APIs', 'GraphQL', 'Microservices', 'Event-Driven Architecture', 'Database Design', 'Parallelism', 'Concurrency'],
  },
  journey: [
    {
      period: 'Aug 2024 - Dec 2027',
      category: 'Education',
      organization: 'The University of Texas at Austin',
      location: 'Austin, TX',
      title: 'Bachelor of Computer Science (Honors) and Applied Mathematics',
      details: [
        'Honors: Turing Scholars Program Member',
        'Relevant Coursework: Discrete Mathematics Honors, Data Structures Honors, Computer Organization and Architecture Honors, Algorithms and Complexity Honors, Computer Systems Honors, Linear Algebra, Game Theory, Number Theory, Wireless Networks',
      ],
    },
    {
      period: 'May 2025 - Jul 2025',
      category: 'Experience',
      organization: 'Asimetrix',
      location: 'Hybrid',
      title: 'Data Science & Software Development Intern',
      details: [
        'Designed and deployed an AI-driven retrieval and analytics agent for large-scale private datasets using Model Context Protocol (MCP).',
        'Built Retrieval-Augmented Generation (RAG) pipelines using AWS Bedrock, LangChain, Agno, Chroma, Pinecone, and custom knowledge bases.',
        'Enabled automated trend detection, semantic search, and high-accuracy query answering across high-volume enterprise data.',
      ],
    },
    {
      period: 'Nov 2023 - Feb 2024',
      category: 'Experience',
      organization: 'Somnium - University of Navarra / The Columbus School',
      location: 'Medellin, Colombia & Madrid, Spain',
      title: 'Researcher',
      details: [
        'Developed an Arduino-based chemical release system with embedded control logic to deliver compounds at targeted physiological sleep phases.',
        'Optimized system timing, reliability, and repeatability for human sleep-cycle experimentation.',
      ],
    },
    {
      period: 'May 2023 - Jul 2023',
      category: 'Experience',
      organization: 'Landers CIA',
      location: 'Medellin, Colombia',
      title: 'Technology Intern',
      details: [
        'Conducted company-wide technology rotation across industrial and managerial departments.',
        'Diagnosed data-management and process inefficiencies and produced recommendations to improve operational workflows.',
      ],
    },
    {
      period: 'Nov 2022 - Feb 2023',
      category: 'Experience',
      organization: 'Bonnet Analytics',
      location: 'Medellin, Colombia',
      title: 'Software Development Intern',
      details: [
        'Built an automated customer communication system integrating WhatsApp Business API and Facebook Graph API.',
        'Implemented a JSON-based message routing engine to automate customer service and internal workflows.',
      ],
    },
    {
      period: '2019 - 2024',
      category: 'Leadership & Community Involvement',
      organization: 'Tikkun Olam Makers',
      location: 'Latin America',
      title: 'Regional Leader',
      details: [
        'Led a non-profit creating an inclusive society for people with disabilities.',
        'Directed development of tech solutions for 20+ individuals using industrial machines, design processes, and professional software, driving impactful accessibility innovations.',
      ],
    },
  ],
  github: 'https://github.com/paares007',
  githubUsername: 'paares007',
  linkedin: 'https://www.linkedin.com/in/pablo-arango-esc/',
  avatar: profilePhoto,
  contactEmail: 'pabloarango2006@utexas.edu',
} as const
