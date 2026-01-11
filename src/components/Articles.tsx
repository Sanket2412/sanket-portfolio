import { AnimatedSection } from "./AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const articles = [
  {
    title: "Building Scalable APIs with Node.js and Express",
    excerpt: "A comprehensive guide to structuring your backend for growth, covering middleware patterns and error handling.",
    platform: "Medium",
    date: "Dec 2024",
    url: "https://medium.com",
  },
  {
    title: "React Performance Optimization Techniques",
    excerpt: "Deep dive into memoization, code splitting, and avoiding common performance pitfalls in React applications.",
    platform: "Dev.to",
    date: "Nov 2024",
    url: "https://dev.to",
  },
  {
    title: "Understanding WebSockets for Real-time Apps",
    excerpt: "From basic connections to scaling with Redis pub/sub — everything you need for real-time features.",
    platform: "Hashnode",
    date: "Oct 2024",
    url: "https://hashnode.com",
  },
  {
    title: "TypeScript Best Practices for Large Codebases",
    excerpt: "Lessons learned from maintaining enterprise TypeScript projects with strict type safety.",
    platform: "Medium",
    date: "Sep 2024",
    url: "https://medium.com",
  },
];

const platformColors: Record<string, string> = {
  "Medium": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "Dev.to": "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  "Hashnode": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
};

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="perspective-1000 preserve-3d block"
    >
      <Card className="h-full card-glow bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden group cursor-pointer">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <Badge 
              variant="outline" 
              className={`${platformColors[article.platform] || "bg-primary/10 text-primary border-primary/20"} text-xs font-medium`}
            >
              {article.platform}
            </Badge>
            {article.date && (
              <span className="text-xs text-muted-foreground">{article.date}</span>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
              {article.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2">
            <span>Read Article</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </CardContent>
      </Card>
    </motion.a>
  );
}

export function Articles() {
  return (
    <section id="articles" className="section-padding relative" aria-label="Articles and Writing">
      <div className="section-container">
        <AnimatedSection>
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Articles & Writing
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              I occasionally write about JavaScript, React, backend systems, and performance.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <ArticleCard key={article.title} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
