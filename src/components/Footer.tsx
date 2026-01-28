import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion"

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/Sanket2412", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/sanket-khardekar/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:khardekarsanket@gmail.com", label: "Email" },
]

export function Footer() {
  return (
    <footer style={{
        position:"relative",
        zIndex:999
    }} className="py-8 border-t border-border bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Text */}
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {(() => {
              const startYear = 2026;
              const currentYear = new Date().getFullYear();
              return (
                <>
                  © {startYear}
                  {currentYear > startYear && `–${currentYear}`}{" "}
                  Sanket Khardekar. All rights reserved.
                </>
              );
            })()}
          </motion.p>

          {/* Social Icons */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {socialLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-primary/10"
                asChild
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </motion.div>

        </div>
      </div>
    </footer>
  )
}
