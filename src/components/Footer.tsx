import { Mail, Heart } from "lucide-react"
import Github from "lucide-react/dist/esm/icons/github"
import Linkedin from "lucide-react/dist/esm/icons/linkedin"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const socialLinks = [
  { icon: Github, href: "https://github.com/Sanket2412", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sanket-khardekar/", label: "LinkedIn" },
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
            className="text-sm text-muted-foreground flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            © {new Date().getFullYear()} Sanket Khardekar. Built with
            <Heart className="w-3.5 h-3.5 text-red-500 mx-1" />
            using React
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
