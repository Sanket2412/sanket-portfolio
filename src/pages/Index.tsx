import { Background3D } from "@/components/Background3d";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
     <Background3D />
     <Navbar />
      <main className="relative z-10" role="main">
        <Hero />
      </main>
    </div>
  );
};

export default Index;