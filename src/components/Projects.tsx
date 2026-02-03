import { AnimatedSection } from "./AnimatedSection";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Layers } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { ProjectPagination } from "./projects/ProjectPagination";

const projects = [
  {
    title: "LifeSync: Digital Organ Donation Ecosystem",
    description: "A mission-critical dual-app system (Admin & Medical Center portals) designed to digitize and accelerate the organ donation procurement process.",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&h=500&fit=crop",
    technologies: ["React", "Socket.io", "RBAC", "Node.js", "State Management"],
    challenges: "Leading a team of juniors to implement complex multi-step medical forms and real-time emergency coordination chat with granular permissions.",
    github: "",
    live: "",
    featured: true,
  },
  {
    title: "AI Course Architect",
    description: "An automated educational content engine that generates comprehensive courses from single prompts using LLMs.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    technologies: ["React", "Node.js", "OpenAI API", "Stripe", "Express"],
    challenges: "Reduced course generation latency by 93%, bringing processing time down from 15 minutes to under 60 seconds through request re-architecture.",
    github: "",
    live: "",
    featured: true,
  },
  {
    title: "Tier-Based Diagnostic Subscription System",
    description: "A healthcare backend system where users map diagnostic tests to diseases based on their specific subscription tier permissions.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
    technologies: ["Node.js", "Express", "MySQL", "Data Structures", "Stripe"],
    challenges: "Implemented a Linked List data structure to manage complex, hierarchical test sequences and medical guideline dependencies.",
    github: "",
    live: "",
    featured: true,
  },
  {
    title: "Healthcare CRM & Analytics Platform",
    description: "A robust internal R&D module designed for medical data visualization and patient record management for healthcare providers.",
    image: "https://images.unsplash.com/photo-1504813184591-01592fd03cf7?w=800&h=500&fit=crop",
    technologies: ["React", "Jest", "AG-Grid", "REST APIs", "Unit Testing"],
    challenges: "Achieved 100% code reliability by implementing a Jest testing suite and modernized the platform by upgrading deprecated legacy packages to improve build speeds.",
    github: "",
    live: "",
    featured: false,
  },
  {
    title: "Jafpa: Security & Code Audit",
    description: "A deep-dive technical assessment for a meat-delivery e-commerce platform to identify system faults and security risks.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    technologies: ["Code Analysis", "Security Auditing", "Node.js", "React", "Vulnerability Assessment"],
    challenges: "Collaborated with senior leadership to identify critical architectural vulnerabilities and document technical debt in a high-traffic production system.",
    github: "",
    live: "",
    featured: false,
  },
  {
    title: "Hydrogen: On-Demand Home Healthcare",
    description: "An on-demand marketplace platform for booking health and skincare services to be availed at the user's home.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=500&fit=crop",
    technologies: ["React", "Node.js", "Booking Logic", "Payment Integration"],
    challenges: "Designed a dynamic service-selection engine and a high-conversion checkout flow for various healthcare categories.",
    github: "",
    live: "",
    featured: false,
  },
  {
    title: "Baby2Home: Platform Rescue & Refactor",
    description: "A project cleanup and feature completion initiative for a Vue.js-based service platform.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop",
    technologies: ["Vue.js", "Socket.io", "Code Refactoring", "Legacy Codebase"],
    challenges: "Stabilized a legacy codebase left by previous developers and successfully implemented a real-time chat module from scratch.",
    github: "",
    live: "",
    featured: false,
  },
  {
    title: "Enterprise Resource Management Tool",
    description: "An internal ERP system for tracking project lifecycles, resource utilization, and employee bandwidth.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    technologies: ["React", "Data Visualization", "RBAC", "ERP Logic"],
    challenges: "Built high-performance UI dashboards to handle large volumes of organizational data and resource scheduling logic.",
    github: "",
    live: "",
    featured: false,
  },
  {
    title: "Scraped Data Marketplace",
    description: "A subscription-based frontend allowing users to sign up and download web-scraped data files based on their plan.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    technologies: ["React", "Protected Routing", "Stripe", "File Handling"],
    challenges: "Managed secure file access and subscription-gated UI routing to ensure only paid users could access premium data exports.",
    github: "",
    live: "",
    featured: false,
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

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
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="perspective-1000 preserve-3d"
    >
      <Card className="h-full card-glow bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            {project.featured && (
              <Badge className="bg-primary/90 text-primary-foreground">
                Featured
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.description}
          </p>

          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-lg p-3">
            <Layers className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
            <span>{project.challenges}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 text-xs"
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            {project.live && (
              <Button size="sm" variant="secondary" className="gap-2" asChild>
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.github && (<Button size="sm" variant="outline" className="gap-2" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>)}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const PROJECTS_PER_PAGE = 4;

export function Projects() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    return projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [currentPage]);

  return (
    <section id="projects" className="section-padding relative" aria-label="Projects">
      <div className="section-container">
        <AnimatedSection>
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Projects
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A selection of my recent work and personal projects
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mb-8">
            {projects.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Showing {paginatedProjects.length} of {projects.length} project{projects.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {paginatedProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <ProjectPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}