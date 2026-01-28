import { About } from "@/components/About";
import { Background3D } from "@/components/Background3D";
import { Blogs } from "@/components/Blogs";
 import { Contact } from "@/components/Contact";
 import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
 import { Hero } from "@/components/Hero";
 import { Navbar } from "@/components/Navbar";
 import { Projects } from "@/components/Projects";
 import { Skills } from "@/components/Skills";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Background3D />
       <Navbar />
      <main className="relative z-10" role="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Blogs />
        <Contact />
      </main>
      <Footer /> 
    </div>
  );
};

export default Index;
