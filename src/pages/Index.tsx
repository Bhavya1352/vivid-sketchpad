import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Palette, Users, Zap } from "lucide-react";
import DrawingAnimation from "@/components/DrawingAnimation";
import HeroCanvas from "@/components/HeroCanvas";
import { ThemeToggle } from "@/components/ThemeToggle";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.5 });
  const isVisible = !!entry?.isIntersecting;

  return (
    <div ref={ref} className={`feature-card ${isVisible ? 'is-visible' : ''}`}>
      <div className="p-6 bg-card rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-center mb-2">{title}</h3>
        <p className="text-muted-foreground text-center">{description}</p>
      </div>
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();

  const handleRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
    setTimeout(() => {
        navigate("/whiteboard");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>
      <DrawingAnimation />
      <div className="relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-fade-in-down">
              Welcome to Vivid Sketchpad
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
              Unleash your creativity with a simple and intuitive drawing
              experience. Start fresh or collaborate with others in real-time.
            </p>
            <div className="flex justify-center animate-fade-in-up animation-delay-400">
              <HeroCanvas />
            </div>
            <div className="pt-4 animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ripple-button"
                onClick={handleRipple}
              >
                Start Sketching
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="py-20 px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<Palette size={48} className="text-primary" />} title="Rich Colors" description="Choose from a wide variety of colors to bring your ideas to life." />
            <FeatureCard icon={<Users size={48} className="text-primary" />} title="Collaboration" description="Work together with your team in real-time on the same canvas." />
            <FeatureCard icon={<Zap size={48} className="text-primary" />} title="Real-time" description="See changes instantly as you and your team draw and create." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
