import { MousePointer2, Pen, Square, Circle, Trash2, Brush, Download, Undo2, Redo2, RotateCcw, Triangle, Star, Heart, Hexagon, Minus, Type, Eraser, PaintBucket, Sparkles, X, Ellipsis, Diamond, Octagon, Pentagon, Zap, Smile, Eye, Move3D } from "lucide-react";
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
  activeTool: "select" | "draw" | "rectangle" | "circle" | "triangle" | "star" | "heart" | "hexagon" | "line" | "text" | "eraser" | "fill" | "oval" | "diamond" | "pentagon" | "octagon" | "arrow" | "smiley" | "eye";
  onToolClick: (tool: "select" | "draw" | "rectangle" | "circle" | "triangle" | "star" | "heart" | "hexagon" | "line" | "text" | "eraser" | "fill" | "oval" | "diamond" | "pentagon" | "octagon" | "arrow" | "smiley" | "eye") => void;
  onClear: () => void;
  onExport: () => void;
  onExportSVG: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onEvaluate: () => void;
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
  onExportSVG,
  onUndo,
  onRedo,
  onEvaluate,
  brushWidth, 
  onBrushWidthChange,
  brushType,
  onBrushTypeChange
}: ToolbarProps) => {
  const shapeTools = [
    { id: "rectangle" as const, icon: Square, label: "Rectangle" },
    { id: "circle" as const, icon: Circle, label: "Circle" },
    { id: "oval" as const, icon: Ellipsis, label: "Oval" },
    { id: "triangle" as const, icon: Triangle, label: "Triangle" },
    { id: "diamond" as const, icon: Diamond, label: "Diamond" },
    { id: "pentagon" as const, icon: Pentagon, label: "Pentagon" },
    { id: "hexagon" as const, icon: Hexagon, label: "Hexagon" },
    { id: "octagon" as const, icon: Octagon, label: "Octagon" },
    { id: "star" as const, icon: Star, label: "Star" },
    { id: "heart" as const, icon: Heart, label: "Heart" },
    { id: "arrow" as const, icon: Zap, label: "Arrow" },
    { id: "smiley" as const, icon: Smile, label: "Smiley" },
    { id: "eye" as const, icon: Eye, label: "Eye" },
  ];

  return (
    <div className="glass-card rounded-2xl p-3 animate-scale-in">
      {/* Action Tools Section */}
      <div className="mb-3 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-gray-600">ACTIONS</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onUndo}
            className="tool-button rounded-xl w-10 h-10 hover:bg-red-100 hover:text-red-600"
            title="Delete Last Action (Ctrl+Z)"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRedo}
            className="tool-button rounded-xl w-10 h-10 hover:bg-green-100 hover:text-green-600"
            title="Restore Last Action (Ctrl+Y)"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="tool-button rounded-xl w-10 h-10 hover:bg-red-100 hover:text-red-600"
            title="Clear All Drawing"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Drawing Tools Section */}
      <div className="mb-3 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-gray-600">TOOLS</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToolClick('select')}
            className={cn(
              "tool-button rounded-xl w-10 h-10",
              activeTool === 'select' && "tool-button-active"
            )}
            title="Select"
          >
            <MousePointer2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToolClick('draw')}
            className={cn(
              "tool-button rounded-xl w-10 h-10",
              activeTool === 'draw' && "tool-button-active"
            )}
            title="Pencil"
          >
            <Pen className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToolClick('eraser')}
            className={cn(
              "tool-button rounded-xl w-10 h-10",
              activeTool === 'eraser' && "tool-button-active"
            )}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToolClick('fill')}
            className={cn(
              "tool-button rounded-xl w-10 h-10",
              activeTool === 'fill' && "tool-button-active"
            )}
            title="Fill"
          >
            <PaintBucket className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToolClick('text')}
            className={cn(
              "tool-button rounded-xl w-10 h-10",
              activeTool === 'text' && "tool-button-active"
            )}
            title="Text"
          >
            <Type className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToolClick('line')}
            className={cn(
              "tool-button rounded-xl w-10 h-10",
              activeTool === 'line' && "tool-button-active"
            )}
            title="Line"
          >
            <Minus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Shapes Section */}
      <div className="mb-3 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-gray-600">SHAPES</span>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {shapeTools.map((tool) => (
            <Button
              key={tool.id}
              variant="ghost"
              size="icon"
              onClick={() => onToolClick(tool.id)}
              className={cn(
                "tool-button rounded-xl w-8 h-8",
                activeTool === tool.id && "tool-button-active"
              )}
              title={tool.label}
            >
              <tool.icon className="w-3 h-3" />
            </Button>
          ))}
        </div>
      </div>

      {/* Brush Settings Section */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-600">BRUSH</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="tool-button rounded-xl w-8 h-8" title="Brush Type">
              <Brush className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onBrushTypeChange("pencil")}>Pencil</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onBrushTypeChange("spray")}>Spray</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Size</span>
          <Slider 
            defaultValue={[brushWidth]}
            onValueChange={(values) => onBrushWidthChange(values[0])}
            max={50}
            step={1}
            className="w-20"
          />
          <span className="text-xs text-muted-foreground w-8">{brushWidth}px</span>
        </div>
      </div>
    </div>
  );
};