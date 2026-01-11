import { AnimatedSection } from "./AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "group-hover:border-blue-500/30",
    skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Next.js"],
  },
  {
    title: "Backend",
    icon: "⚙️",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "group-hover:border-green-500/30",
    skills: ["Node.js", "NestJs","Express", "REST APIs"],
  },
  {
    title: "Databases",
    icon: "🗄️",
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "group-hover:border-orange-500/30",
    skills: ["MongoDB", "Firebase", "PostgreSQL","Mysql"],
  },
  {
    title: "Cloud & Tools",
    icon: "☁️",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "group-hover:border-purple-500/30",
    skills: ["Git", "CI/CD", "Jest", "Webpack", "Vite","Postman"],
  },
  {
  title: "Packages & Libraries",
  icon: "📦",
  color: "from-teal-500/20 to-indigo-500/20",
  borderColor: "group-hover:border-teal-500/30",
  skills: ["Redux Toolkit", "React Router","Stripe",
    "Tailwind CSS","Material UI",
    "shadcn/ui",
    
  ],
}
];

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });

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
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="perspective-1000 preserve-3d cursor-pointer"
    >
      <Card className={`h-full card-glow bg-card/80 backdrop-blur-sm border-border/50 ${category.borderColor} transition-all duration-500 group overflow-hidden`}>
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
        <CardHeader className="relative pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <span className="text-2xl">{category.icon}</span>
            {category.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + skillIndex * 0.03 }}
              >
                <Badge 
                  variant="secondary" 
                  className="bg-secondary/80 hover:bg-primary/20 hover:text-primary transition-all duration-300 cursor-default hover:scale-105"
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="section-container">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Skills & Technologies
            </h2>
            <p className="text-muted-foreground max-w-md text-sm">
              Technologies I work with daily to build scalable, performant applications
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}