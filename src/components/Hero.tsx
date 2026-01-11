import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypeWriter } from "./Typewriter";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRef } from "react";
import profilePhoto from "../assets/profile-photo.png";

export function Hero() {
  const roles = [
    "Full-Stack Developer",
    "Frontend Developer", 
    "Backend Developer",
  ];

  const avatarRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleDownload = () => {
  const link = document.createElement("a")
  link.href = "https://drive.google.com/uc?export=download&id=1KzYjlJtSem1Bb-AQtLga3CohNj8AhMN1"
  link.download = "Sanket_Khardekar_Resume.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Avatar with 3D parallax effect */}
          <motion.div
            ref={avatarRef}
            initial={{ opacity: 0, scale: 0.8, z: -100 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="perspective-1000 cursor-pointer"
          >
            <motion.div
              style={{ rotateX, rotateY }}
              className="preserve-3d relative"
            >
              {/* Glow layers */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent rounded-full blur-3xl scale-150"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-accent/30 to-transparent rounded-full blur-2xl scale-125"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              <Avatar className="w-52 h-52 lg:w-72 lg:h-72 border-4 border-primary/30 shadow-2xl shadow-primary/25 ring-2 ring-primary/20 ring-offset-4 ring-offset-background">
                <AvatarImage 
                  src={profilePhoto} 
                  alt="Sanket Khardekar – Full-Stack Developer"
                  className="object-cover"
                  loading="eager"
                />
                <AvatarFallback className="text-5xl font-bold bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                  SK
                </AvatarFallback>
              </Avatar>
              
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 bg-card/90 backdrop-blur-md border border-border/50 shadow-xl rounded-full px-4 py-2 flex items-center gap-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ translateZ: 50 }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="text-sm font-semibold">Available</span>
              </motion.div>

              {/* Orbiting elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-6 h-6 rounded-full bg-primary/20 border border-primary/30"
                animate={{ 
                  x: [0, 20, 0, -20, 0],
                  y: [0, -10, -20, -10, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-6 left-1/4 w-4 h-4 rounded-full bg-accent/20 border border-accent/30"
                animate={{ 
                  x: [0, -15, 0, 15, 0],
                  y: [0, 15, 0, -15, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="text-center lg:text-left flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-primary font-semibold mb-4 tracking-widest uppercase text-sm">
                Hi, my name is
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground mb-4 tracking-tight"
            >
              Sanket Khardekar
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 h-[1.3em] text-muted-foreground"
            >
              <TypeWriter words={roles} typingSpeed={80} deletingSpeed={40} pauseDuration={2500} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 text-lg leading-relaxed"
            >
              Full-Stack Developer building scalable, high-performance web applications 
              with modern frontend and backend architectures.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                asChild 
                size="lg" 
                className="gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
              >
                <a href="#projects">
                  <ArrowDown className="h-4 w-4" />
                  View Projects
                </a>
              </Button>
              <Button 
                asChild 
                onClick={handleDownload}
                variant="outline" 
                size="lg" 
                className="gap-2 hover:bg-secondary border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105"
              >
                <div className="flex row">
                  <FileText className="h-4 w-4" />
                  Download Resume
                </div>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-7 h-12 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          >
            <motion.div 
              className="w-1.5 h-3 rounded-full bg-primary"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}