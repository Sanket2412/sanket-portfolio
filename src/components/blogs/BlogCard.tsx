import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Blog } from "@/data/blogs";

const platformColors: Record<string, string> = {
  Mindbowser: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  Medium: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "Dev.to": "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  Hashnode: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Other: "bg-primary/10 text-primary border-primary/20",
};

interface BlogCardProps {
  blog: Blog;
  index: number;
}

export function BlogCard({ blog, index }: BlogCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 20,
  });

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

  // const formattedDate = new Date(blog.publishedDate).toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="perspective-1000 preserve-3d h-full"
    >
      <Card className="h-full card-glow bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all duration-500 overflow-hidden group flex flex-col">
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {!imageLoaded && !imageError && (
            <Skeleton className="absolute inset-0 w-full h-full" />
          )}
          {!imageError ? (
            <img
              src={blog.coverImage}
              alt={`Cover image for ${blog.title}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <span className="text-muted-foreground text-sm">Image unavailable</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="p-5 flex flex-col flex-1 space-y-3">
          {/* Platform Badge & Date */}
          <div className="flex items-center justify-between gap-3">
            <Badge
              variant="outline"
              className={`${platformColors[blog.platform]} text-xs font-medium`}
            >
              {blog.platform}
            </Badge>
            {/* <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <time dateTime={blog.publishedDate}>{formattedDate}</time>
            </div> */}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
            {blog.excerpt}
          </p>

          {/* Read More Button */}
          <Button
            asChild
            variant="ghost"
            className="w-full justify-between mt-auto group/btn hover:bg-primary/5"
          >
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read more about ${blog.title}`}
            >
              <span className="font-medium">Read More</span>
              <div className="flex items-center gap-1">
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                <ExternalLink className="h-3 w-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </div>
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.article>
  );
}
