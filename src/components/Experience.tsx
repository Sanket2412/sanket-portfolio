import { AnimatedSection } from "./AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Full-Stack Developer",
    company: "Mindbowser Info Solutions Pvt Ltd.",
    location: "Maharashtra, Pune",
    period: "Jan 2022 - Present",
    type: "Full-time",
   description: [
  "Developed scalable React and TypeScript applications using modern UI systems, secure state management, and optimized rendering practices",
  "Built advanced frontend features including a customizable Lexical rich-text editor, real-time chat integrations, and full-stack solutions",
  "Designed reliable backend and API layers with Node.js, Express, and Zod validation, including structured AI-powered ChatGPT integrations",
  "Delivered performance and quality improvements through Lighthouse audits, optimization strategies, and production-ready code in agile teams",
],

    technologies: ["React","Node.js", "Nestjs","MySQL", "MongoDB","PostgreSQL", "Vue.js","Hydrogen","AWS"],
  },
  {
    title: "Web Development Intern",
    company: "Softebizz Technologies",
    location: "Maharashtra, Pune",
    period: "Feb 2021 – Aug 2021",
    type: "Internship",
    description: [
      "Collaborated with UI/UX designers to implement clean, intuitive, and user-centric interfaces.",
      `Completed detailed development tasks for both frontend interfaces and backend services for internal and public-facing
applications.`,
      " Developed REST APIs and worked with stored procedures to support backend functionality.",
      "Performed quality assurance testing to identify bugs, improve stability, and enhance overall usability."
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React", "Git","Codeignitor"],
  },
];

function TimelineCard({ exp, index, isLeft }: { exp: typeof experiences[0]; index: number; isLeft: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [isLeft ? -50 : 50, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [isLeft ? -15 : 15, 0]);

  return (
    <motion.div
    key={index}
      ref={cardRef}
      style={{ opacity, x, rotateY }}
      className={`relative flex w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-center perspective-1000`}
    >
      <motion.div
        whileHover={{ 
          y: -8,
          rotateX: 2,
          rotateY: isLeft ? 3 : -3,
          scale: 1.02,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full md:w-[calc(50%-40px)] preserve-3d ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}
      >
        <Card className="card-glow bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">{exp.type}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-medium text-primary">
                    <Briefcase className="w-4 h-4" />
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {exp.period}
              </div>
            </div>

            <ul className="space-y-2.5 mb-5">
              {exp.description.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 text-xs hover:bg-primary/20 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function TimelineDot({ index }: { index: number }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: dotRef,
    offset: ["start end", "center center"],
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div 
    key={index}
      ref={dotRef}
      style={{ scale, opacity }}
      className="absolute left-1/2 -translate-x-1/2 top-6 z-20"
    >
      <div className="relative">
        <motion.div 
          className="w-5 h-5 rounded-full bg-primary shadow-lg shadow-primary/30"
          whileHover={{ scale: 1.3 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        </motion.div>
        <div className="absolute inset-[-4px] rounded-full border-2 border-primary/30" />
      </div>
    </motion.div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section-padding section-alt relative overflow-hidden">
      <div className="section-container">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Experience
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              My professional journey building production applications
            </p>
          </div>
        </AnimatedSection>

        <div ref={containerRef} className="relative">
          {/* Center timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border hidden md:block">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-primary to-primary/50"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:hidden" />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot - hidden on mobile */}
                <div className="hidden md:block">
                  <TimelineDot index={index} />
                </div>
                
                {/* Mobile timeline dot */}
                <div className="absolute left-4 top-6 -translate-x-1/2 z-10 md:hidden">
                  <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/30" />
                </div>
                
                {/* Card with mobile offset */}
                <div className="pl-10 md:pl-0">
                  <TimelineCard exp={exp} index={index} isLeft={index % 2 === 0} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}