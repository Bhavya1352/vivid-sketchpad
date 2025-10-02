import { MousePointer2, Pen, Square, Circle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  activeTool: "select" | "draw" | "rectangle" | "circle";
  onToolClick: (tool: "select" | "draw" | "rectangle" | "circle") => void;
  onClear: () => void;
}

export const Toolbar = ({ activeTool, onToolClick, onClear }: ToolbarProps) => {
  const tools = [
    { id: "select" as const, icon: MousePointer2, label: "Select" },
    { id: "draw" as const, icon: Pen, label: "Draw" },
    { id: "rectangle" as const, icon: Square, label: "Rectangle" },
    { id: "circle" as const, icon: Circle, label: "Circle" },
  ];

  return (
    <div className="glass-card rounded-2xl p-2 flex items-center gap-2 animate-scale-in">
      {tools.map((tool) => (
        <Button
          key={tool.id}
          variant="ghost"
          size="icon"
          onClick={() => onToolClick(tool.id)}
          className={cn(
            "tool-button rounded-xl w-12 h-12",
            activeTool === tool.id && "tool-button-active"
          )}
          title={tool.label}
        >
          <tool.icon className="w-5 h-5" />
        </Button>
      ))}
      
      <div className="w-px h-8 bg-border mx-1" />
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onClear}
        className="tool-button rounded-xl w-12 h-12 hover:bg-destructive/10 hover:text-destructive"
        title="Clear Canvas"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  );
};
