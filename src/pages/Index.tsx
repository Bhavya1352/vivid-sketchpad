import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Users, Palette, Zap, Github, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Real-time Collaboration",
      description: "See everyone's cursor and edits instantly. Work together seamlessly.",
      color: "primary"
    },
    {
      icon: Palette,
      title: "Powerful Drawing Tools",
      description: "Freehand drawing, shapes, text, sticky notes, and more creative tools.",
      color: "coral"
    },
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      description: "Smooth canvas rendering with instant updates and zero lag.",
      color: "teal"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header with Theme Toggle */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-teal flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">DrawBoard</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-32 pt-40">
        <div className="max-w-6xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-scale-in">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">Real-time Collaboration</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight">
            Collaborate. Draw.
            <br />
            <span className="bg-gradient-to-r from-primary via-coral to-teal bg-clip-text text-transparent">
              Create Together.
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real-time collaborative whiteboard for teams, students, and creators. 
            Draw, brainstorm, and bring your ideas to life together.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 shadow-glow hover:shadow-xl transition-all hover:scale-105 group"
              onClick={() => navigate("/whiteboard")}
            >
              Start Drawing
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-10 py-7 transition-all hover:scale-105"
              onClick={() => navigate("/whiteboard")}
            >
              Join a Board
              <Users className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Animated Preview Hint */}
          <div className="pt-8 opacity-70">
            <p className="text-sm text-muted-foreground animate-pulse">
              No sign-up required • Free to use • Instant collaboration
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Everything you need to collaborate
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for seamless teamwork and creativity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="glass-card p-8 rounded-2xl space-y-4 transition-all hover:scale-105 hover:shadow-xl cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-14 h-14 rounded-xl bg-${feature.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">DrawBoard</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Collaborative whiteboard for modern teams
              </p>
            </div>

            {/* Product */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors">Features</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Security</li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors">About</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">Careers</li>
              </ul>
            </div>

            {/* Social */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Connect</h4>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="rounded-full hover:scale-110 transition-transform">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 DrawBoard. Built with ❤️ for creators worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
