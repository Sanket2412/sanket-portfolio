import { AnimatedSection } from "./AnimatedSection";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code2, Layers, Zap, Users, Award, ExternalLink } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { achievements } from "@/data/achievements";

const focusAreas = [
  {
    icon: Code2,
    title: "Clean Architecture",
    description: "Writing maintainable, scalable code that teams can build upon",
  },
  {
    icon: Zap,
    title: "Performance First",
    description: "Optimizing for speed, efficiency, and exceptional user experience",
  },
  {
    icon: Layers,
    title: "Full-Stack Thinking",
    description: "Understanding the complete picture from database to deployment",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Communicating effectively and mentoring fellow developers",
  },
];

function FocusCard({ area, index }: { area: typeof focusAreas[0]; index: number }) {
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
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="perspective-1000 preserve-3d cursor-pointer"
    >
      <Card className="h-full card-glow bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-5">
          <motion.div 
            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <area.icon className="w-6 h-6 text-primary" />
          </motion.div>
          <h3 className="font-semibold text-foreground mb-2">{area.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="section-padding section-alt relative" aria-label="About me">
      <div className="section-container">
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              About Me
            </h2>
            <Badge variant="secondary" className="text-xs">4+ Years</Badge>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <AnimatedSection delay={0.1} direction="left">
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                I'm a <span className="text-foreground font-medium">Full-Stack Developer</span> with 
                4+ years of experience building web applications that scale. My focus is on writing 
                clean, maintainable code that solves real business problems.
              </p>
              <p>
                I started by mastering the fundamentals JavaScript, HTML, CSS and understanding how the 
                web actually works. That foundation helps me make better architectural decisions and 
                debug issues faster.
              </p>
              <p>
                What drives me is the intersection of <span className="text-foreground font-medium">user experience</span> and 
                <span className="text-foreground font-medium"> engineering excellence</span>. I believe 
                performant applications with thoughtful UX make a measurable difference for both users 
                and businesses.
              </p>
              <p>
                When I'm not coding, I contribute to open source, write technical content, and mentor 
                junior developers. I enjoy breaking down complex problems and explaining them simply.
              </p>
            </div>
            {achievements.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
                </div>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.a
                      key={index}
                      href={achievement.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {achievement.description}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-3" />
                    </motion.a>
                  ))}
                </div>
              </div>
            )}
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-4">
            {focusAreas.map((area, index) => (
              <FocusCard key={area.title} area={area} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}