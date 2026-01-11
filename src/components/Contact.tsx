import { useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Github, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

const EMAIL = "khardekarsanket@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/sanket-khardekar/";
const GITHUB_URL = "https://github.com/Sanket2412";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <section id="contact" className="section-padding section-alt relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
      
      <div className="section-container relative">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Let's Connect
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">
              Open to full-stack development opportunities and collaboration. Feel free to reach out.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Card className="card-glow bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
                <CardContent className="p-8 space-y-8">
                  {/* Primary CTA - Email */}
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98, y: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        size="lg"
                        className="w-full gap-3 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-base py-6"
                        asChild
                      >
                        <a href={`mailto:${EMAIL}`}>
                          <Mail className="h-5 w-5" />
                          Email Me
                        </a>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-border/50" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">or connect via</span>
                    <div className="flex-1 h-px bg-border/50" />
                  </div>

                  {/* Secondary CTAs - Social Links */}
                  <div className="flex justify-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95, y: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                        asChild
                      >
                        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-5 w-5" />
                          LinkedIn
                        </a>
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95, y: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                        asChild
                      >
                        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                          <Github className="h-5 w-5" />
                          GitHub
                        </a>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Copy Email */}
                  <div className="text-center pt-2">
                    <motion.button
                      onClick={handleCopyEmail}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
                    >
                      <span className="font-mono text-xs bg-secondary/50 px-3 py-1.5 rounded-md border border-border/50 group-hover:border-primary/30 transition-colors">
                        {EMAIL}
                      </span>
                      <motion.span
                        key={copied ? "check" : "copy"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        )}
                      </motion.span>
                    </motion.button>
                    {copied && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-green-500 mt-2"
                      >
                        Email copied to clipboard!
                      </motion.p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
