import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush } from "fabric";
import { Toolbar } from "./Toolbar";
import { ColorPicker } from "./ColorPicker";
import { toast } from "sonner";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#9b87f5");
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "rectangle" | "circle">("select");

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth - 48,
      height: window.innerHeight - 160,
      backgroundColor: "#ffffff",
    });

    // Initialize the freeDrawingBrush
    const brush = new PencilBrush(canvas);
    brush.color = activeColor;
    brush.width = 3;
    canvas.freeDrawingBrush = brush;

    setFabricCanvas(canvas);
    toast.success("Canvas ready! Start creating!", {
      description: "Select a tool from the toolbar to begin",
    });

    const handleResize = () => {
      canvas.setWidth(window.innerWidth - 48);
      canvas.setHeight(window.innerHeight - 160);
      canvas.renderAll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";
    
    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = 3;
    }
  }, [activeTool, activeColor, fabricCanvas]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);

    if (tool === "rectangle") {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: activeColor,
        width: 120,
        height: 80,
        rx: 8,
        ry: 8,
      });
      fabricCanvas?.add(rect);
      fabricCanvas?.setActiveObject(rect);
      toast.info("Rectangle added", { description: "Drag to reposition or resize" });
    } else if (tool === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: activeColor,
        radius: 50,
      });
      fabricCanvas?.add(circle);
      fabricCanvas?.setActiveObject(circle);
      toast.info("Circle added", { description: "Drag to reposition or resize" });
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast.success("Canvas cleared!", { description: "Start fresh with a clean canvas" });
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 min-h-screen">
      <div className="flex gap-4 items-center animate-fade-in">
        <Toolbar activeTool={activeTool} onToolClick={handleToolClick} onClear={handleClear} />
        <ColorPicker color={activeColor} onChange={setActiveColor} />
      </div>
      
      <div className="glass-card rounded-3xl overflow-hidden shadow-elegant animate-scale-in border-2 border-border/50">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
