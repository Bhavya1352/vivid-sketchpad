import { MousePointer2, Pen, Square, Circle, Trash2, Brush, Download, Undo2, Redo2, RotateCcw, Triangle, Star, Heart, Hexagon, Minus, Type, Eraser, PaintBucket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { BrushType } from "./Canvas";

interface ToolbarProps {
  activeTool: "select" | "draw" | "rectangle" | "circle" | "triangle" | "star" | "heart" | "hexagon" | "line" | "text" | "eraser" | "fill";
  onToolClick: (tool: "select" | "draw" | "rectangle" | "circle" | "triangle" | "star" | "heart" | "hexagon" | "line" | "text" | "eraser" | "fill") => void;
  onClear: () => void;
  onExport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onDelete: () => void;
  brushWidth: number;
  onBrushWidthChange: (width: number) => void;
  brushType: BrushType;
  onBrushTypeChange: (type: BrushType) => void;
}

export const Toolbar = ({ 
  activeTool, 
  onToolClick, 
  onClear, 
  onExport,
  onUndo,
  onRedo,
  onDelete,
  brushWidth, 
  onBrushWidthChange,
  brushType,
  onBrushTypeChange
}: ToolbarProps) => {
  const tools = [
    { id: "select" as const, icon: MousePointer2, label: "Select" },
    { id: "draw" as const, icon: Pen, label: "Pencil" },
    { id: "eraser" as const, icon: Eraser, label: "Eraser" },
    { id: "fill" as const, icon: PaintBucket, label: "Fill" },
    { id: "text" as const, icon: Type, label: "Text" },
    { id: "line" as const, icon: Minus, label: "Line" },
    { id: "rectangle" as const, icon: Square, label: "Rectangle" },
    { id: "circle" as const, icon: Circle, label: "Circle" },
    { id: "triangle" as const, icon: Triangle, label: "Triangle" },
    { id: "star" as const, icon: Star, label: "Star" },
    { id: "heart" as const, icon: Heart, label: "Heart" },
    { id: "hexagon" as const, icon: Hexagon, label: "Hexagon" },
  ];

  return (
    <div className="glass-card rounded-2xl p-2 flex items-center gap-2 animate-scale-in flex-wrap">
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="tool-button rounded-xl w-12 h-12 hover:bg-red-100 hover:text-red-600"
        title="Delete Selected (Del)"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onUndo}
        className="tool-button rounded-xl w-12 h-12 hover:bg-blue-100 hover:text-blue-600"
        title="Restore/Undo (Ctrl+Z)"
      >
        <RotateCcw className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRedo}
        className="tool-button rounded-xl w-12 h-12 hover:bg-green-100 hover:text-green-600"
        title="Redo (Ctrl+Y)"
      >
        <Redo2 className="w-5 h-5" />
      </Button>

      <div className="w-px h-8 bg-border mx-1" />

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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="tool-button rounded-xl w-12 h-12" title="Brush Type">
            <Brush className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onBrushTypeChange("pencil")}>Pencil</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onBrushTypeChange("spray")}>Spray</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-3 px-2">
        <span className="text-xs font-medium">Size</span>
        <Slider 
          defaultValue={[brushWidth]}
          onValueChange={(values) => onBrushWidthChange(values[0])}
          max={50}
          step={1}
          className="w-24"
        />
        <span className="text-xs text-muted-foreground">{brushWidth}px</span>
      </div>

      <div className="w-px h-8 bg-border mx-1" />
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onClear}
        className="tool-button rounded-xl w-12 h-12 hover:bg-destructive/10 hover:text-destructive"
        title="Clear All Canvas"
      >
        <Trash2 className="w-5 h-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onExport}
        className="tool-button rounded-xl w-12 h-12"
        title="Export as PNG"
      >
        <Download className="w-5 h-5" />
      </Button>
    </div>
  );
};
