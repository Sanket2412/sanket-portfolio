export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  platform: "Mindbowser" | "Medium" | "Dev.to" | "Hashnode" | "Other";
  url: string;
}

export const blogs: Blog[] = [
  {
    id: "11",
    title: "Why Search Algorithms Matter in React and Node.js",
    excerpt: "Search algorithms play a vital role in optimizing data retrieval, and this article explores why they are essential for building fast and scalable React and Node.js applications.",
    coverImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop",
    platform: "Mindbowser",
    url: "https://www.mindbowser.com/search-algorithms-react-nodejs/",
  },
  {
    id: "10",
    title: "From Chaos to Order: Why Sorting Algorithms Matter in Web Development",
    excerpt: "Sorting algorithms are fundamental to efficient data handling, and this article explores how they bring structure, performance, and reliability to modern web applications.",
    coverImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop",
    platform: "Mindbowser",
    url: "https://www.mindbowser.com/chaos-to-order-web-development/",
  },
  {
    id: "9",
    title: "Best Practices for ChatGPT Integration in Express Using Zod and @instructor-ai/Instructor",
    excerpt: "Integrating ChatGPT into Express applications requires robust validation and structured responses, and this guide explores best practices using Zod and @instructor-ai/Instructor to build reliable AI-powered APIs.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    platform: "Mindbowser",
    url: "https://www.mindbowser.com/chatgpt-integration-express-zod-instructor/",
  },
  {
    id: "8",
    title: "Mastering Bun.js: An Essential Guide for JavaScript Frameworks",
    excerpt: "Bun.js is redefining the JavaScript runtime ecosystem, and this guide explores its features, performance advantages, and how it fits into modern framework development.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    platform: "Mindbowser",
    url: "https://www.mindbowser.com/mastering-bun-js-javascript-frameworks/",
  },
  {
    id: "7",
    title: "Enhancing Web Applications with React and Firebase Integration",
    excerpt: "Integrating React with Firebase unlocks real-time data, authentication, and scalable backend services, and this article explores how to build modern web applications using their combined power.",
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    platform: "Mindbowser",
    url: "https://www.mindbowser.com/react-firebase-integration/",
  },
  {
    id: "6",
    title: "Mastering Data Validation with Joi in Express: A Comprehensive Guide",
    excerpt: "Data validation is critical for secure APIs, and this guide explores how to master Joi in Express to build reliable and well-structured backend applications.",
    coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&h=400&fit=crop",
    platform: "Mindbowser",
    url: "https://www.mindbowser.com/joi-express-data-validation/",
  },
  {
    id: "5",
    title: "Moment.js is Officially Deprecated: What Developers Should Know in 2025",
    excerpt: "Moment.js has officially been deprecated, and this article explains what it means for developers in 2025, along with modern alternatives for handling dates efficiently.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    platform: "Mindbowser",
    url: "https://www.mindbowser.com/momentjs-deprecation-guide-2025/",
  },
  {
    id: "4",
    title: "Exploring Prisma ORM: A Detailed Comparison with TypeORM and Sequelize",
    excerpt: "Prisma ORM is redefining database development in modern applications, and this article explores how it compares with TypeORM and Sequelize in performance, developer experience, and scalability.",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop",
    platform: "Mindbowser",
    url: "https://www.mindbowser.com/prisma-orm-typescript-guide/",
  },
  {
    id: "3",
    title: "Exploring State Management: @preact signals react vs. useState in React",
    excerpt: "State management in React is evolving, and this article explores how @preact/signals compares with React’s useState for building more efficient and reactive user interfaces.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    platform: "Mindbowser",
    url: "https://www.mindbowser.com/preact-signals-react-vs-usestate-react/",
  },
  {
    id: "2",
    title: "Exploring the Latest Updates and Features in React 18",
    excerpt: "React 18 introduces powerful new features like concurrent rendering and automatic batching, enabling smoother user experiences and more efficient application performance.",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    platform: "Mindbowser",
    url: "https://www.mindbowser.com/latest-updates-and-features-in-react-18/",
  },
  {
    id: "1",
    title: "Next.js Uncovered: An Introduction to the Powerful Framework",
    excerpt: "Next.js is a powerful React framework that enables developers to build fast, scalable, and SEO-friendly web applications with modern rendering and routing capabilities.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    platform: "Mindbowser",
    url: "https://www.mindbowser.com/next-js-uncovered/",
  },
];


//"Medium", "Dev.to", "Hashnode", 
export const platforms = ["All", "Mindbowser", "Other"] as const;
export type Platform = typeof platforms[number];
