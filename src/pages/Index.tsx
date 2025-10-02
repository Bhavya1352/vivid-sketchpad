import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Users, Palette, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Real-time Collaboration</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Create Together,
            <br />
            <span className="bg-gradient-to-r from-primary via-coral to-teal bg-clip-text text-transparent">
              Design Better
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            A beautiful collaborative whiteboard for teams to draw, brainstorm, and bring ideas to life in real-time
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-glow hover:shadow-lg transition-all"
              onClick={() => navigate("/whiteboard")}
            >
              Start Creating
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-16">
            <div className="glass-card p-6 rounded-2xl space-y-3 transition-smooth hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Multi-User Sync</h3>
              <p className="text-muted-foreground">See everyone's cursor and edits in real-time</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl space-y-3 transition-smooth hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center">
                <Palette className="w-6 h-6 text-coral" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Powerful Tools</h3>
              <p className="text-muted-foreground">Draw, shapes, text, and sticky notes</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl space-y-3 transition-smooth hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Lightning Fast</h3>
              <p className="text-muted-foreground">Smooth performance with instant updates</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
