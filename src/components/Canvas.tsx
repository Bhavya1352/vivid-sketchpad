import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush, SprayBrush, Polygon, Path, Line, IText } from "fabric";
import { Toolbar } from "./Toolbar";
import { ColorPicker } from "./ColorPicker";
import { DrawingSubmitter } from "./DrawingSubmitter";
import { toast } from "sonner";

export type BrushType = "pencil" | "spray";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#9b87f5");
  const [brushWidth, setBrushWidth] = useState(3);
  const [brushType, setBrushType] = useState<BrushType>("pencil");
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "rectangle" | "circle" | "triangle" | "star" | "heart" | "hexagon" | "line" | "text" | "eraser" | "fill" | "oval" | "diamond" | "pentagon" | "octagon" | "arrow" | "smiley" | "eye">("draw");

  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);

  const saveState = () => {
    if (!fabricCanvas) return;
    
    const state = JSON.stringify(fabricCanvas.toJSON());
    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    newHistory.push(state);
    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;
    
    console.log('State saved:', historyIndexRef.current, 'Total:', historyRef.current.length);
  };

  useEffect(() => {
    if (!canvasRef.current || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const canvas = new FabricCanvas(canvasRef.current, {
      backgroundColor: "#ffffff",
      width: container.clientWidth || 800,
      height: container.clientHeight || 600,
    });

    const brush = new PencilBrush(canvas);
    brush.color = activeColor;
    brush.width = brushWidth;
    canvas.freeDrawingBrush = brush;
    canvas.isDrawingMode = true;

    setFabricCanvas(canvas);
    
    // Initialize history
    const initialState = JSON.stringify(canvas.toJSON());
    historyRef.current = [initialState];
    historyIndexRef.current = 0;

    // Event handlers
    const handlePathCreated = () => {
      setTimeout(() => {
        if (canvas) {
          const state = JSON.stringify(canvas.toJSON());
          const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
          newHistory.push(state);
          historyRef.current = newHistory;
          historyIndexRef.current = newHistory.length - 1;
          console.log('Path created - State saved:', historyIndexRef.current);
        }
      }, 100);
    };

    const handleObjectAdded = () => {
      setTimeout(() => {
        if (canvas) {
          const state = JSON.stringify(canvas.toJSON());
          const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
          newHistory.push(state);
          historyRef.current = newHistory;
          historyIndexRef.current = newHistory.length - 1;
          console.log('Object added - State saved:', historyIndexRef.current);
        }
      }, 100);
    };

    const handleObjectRemoved = () => {
      setTimeout(() => {
        if (canvas) {
          const state = JSON.stringify(canvas.toJSON());
          const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
          newHistory.push(state);
          historyRef.current = newHistory;
          historyIndexRef.current = newHistory.length - 1;
          console.log('Object removed - State saved:', historyIndexRef.current);
        }
      }, 100);
    };

    const handleObjectModified = () => {
      setTimeout(() => {
        if (canvas) {
          const state = JSON.stringify(canvas.toJSON());
          const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
          newHistory.push(state);
          historyRef.current = newHistory;
          historyIndexRef.current = newHistory.length - 1;
          console.log('Object modified - State saved:', historyIndexRef.current);
        }
      }, 100);
    };

    canvas.on('path:created', handlePathCreated);
    canvas.on('object:added', handleObjectAdded);
    canvas.on('object:removed', handleObjectRemoved);
    canvas.on('object:modified', handleObjectModified);

    toast.success("Canvas ready!");

    return () => {
      canvas.off('path:created', handlePathCreated);
      canvas.off('object:added', handleObjectAdded);
      canvas.off('object:removed', handleObjectRemoved);
      canvas.off('object:modified', handleObjectModified);
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    if (activeTool === "draw") {
      fabricCanvas.isDrawingMode = true;
      const brush = brushType === "spray" ? new SprayBrush(fabricCanvas) : new PencilBrush(fabricCanvas);
      brush.color = activeColor;
      brush.width = brushWidth;
      fabricCanvas.freeDrawingBrush = brush;
    } else if (activeTool === "eraser") {
      fabricCanvas.isDrawingMode = true;
      const eraser = new PencilBrush(fabricCanvas);
      eraser.color = "#ffffff";
      eraser.width = brushWidth * 2;
      fabricCanvas.freeDrawingBrush = eraser;
    } else {
      fabricCanvas.isDrawingMode = false;
    }
  }, [fabricCanvas, activeTool, activeColor, brushWidth, brushType]);

  const handleToolClick = (tool: typeof activeTool) => {
    setActiveTool(tool);

    if (!fabricCanvas) return;

    if (tool === "rectangle") {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
        width: 120,
        height: 80,
      });
      fabricCanvas.add(rect);
      toast.info("Rectangle added");
    } else if (tool === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
        radius: 50,
      });
      fabricCanvas.add(circle);
      toast.info("Circle added");
    } else if (tool === "oval") {
      const oval = new Circle({
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
        radius: 40,
        scaleX: 1.5,
        scaleY: 0.8,
      });
      fabricCanvas.add(oval);
      toast.info("Oval added");
    } else if (tool === "triangle") {
      const triangle = new Polygon([
        { x: 0, y: -50 },
        { x: -43, y: 25 },
        { x: 43, y: 25 }
      ], {
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(triangle);
      toast.info("Triangle added");
    } else if (tool === "diamond") {
      const diamond = new Polygon([
        { x: 0, y: -50 },
        { x: 40, y: 0 },
        { x: 0, y: 50 },
        { x: -40, y: 0 }
      ], {
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(diamond);
      toast.info("Diamond added");
    } else if (tool === "pentagon") {
      const pentagon = new Polygon([
        { x: 0, y: -50 },
        { x: 47, y: -15 },
        { x: 29, y: 40 },
        { x: -29, y: 40 },
        { x: -47, y: -15 }
      ], {
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(pentagon);
      toast.info("Pentagon added");
    } else if (tool === "octagon") {
      const octagon = new Polygon([
        { x: 0, y: -50 },
        { x: 35, y: -35 },
        { x: 50, y: 0 },
        { x: 35, y: 35 },
        { x: 0, y: 50 },
        { x: -35, y: 35 },
        { x: -50, y: 0 },
        { x: -35, y: -35 }
      ], {
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(octagon);
      toast.info("Octagon added");
    } else if (tool === "star") {
      const star = new Polygon([
        { x: 0, y: -50 },
        { x: 14, y: -20 },
        { x: 47, y: -15 },
        { x: 23, y: 7 },
        { x: 29, y: 40 },
        { x: 0, y: 25 },
        { x: -29, y: 40 },
        { x: -23, y: 7 },
        { x: -47, y: -15 },
        { x: -14, y: -20 }
      ], {
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(star);
      toast.info("Star added");
    } else if (tool === "heart") {
      const heartPath = "M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z";
      const heart = new Path(heartPath, {
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
        scaleX: 3,
        scaleY: 3,
      });
      fabricCanvas.add(heart);
      toast.info("Heart added");
    } else if (tool === "hexagon") {
      const hexagon = new Polygon([
        { x: 50, y: 0 },
        { x: 93, y: 25 },
        { x: 93, y: 75 },
        { x: 50, y: 100 },
        { x: 7, y: 75 },
        { x: 7, y: 25 }
      ], {
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(hexagon);
      toast.info("Hexagon added");
    } else if (tool === "arrow") {
      const arrow = new Polygon([
        { x: -40, y: -10 },
        { x: 20, y: -10 },
        { x: 20, y: -20 },
        { x: 40, y: 0 },
        { x: 20, y: 20 },
        { x: 20, y: 10 },
        { x: -40, y: 10 }
      ], {
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(arrow);
      toast.info("Arrow added");
    } else if (tool === "smiley") {
      const face = new Circle({
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
        radius: 40,
      });
      const leftEye = new Circle({
        left: 85,
        top: 90,
        fill: activeColor,
        radius: 3,
      });
      const rightEye = new Circle({
        left: 115,
        top: 90,
        fill: activeColor,
        radius: 3,
      });
      const smile = new Path('M 80 120 Q 100 135 120 120', {
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(face);
      fabricCanvas.add(leftEye);
      fabricCanvas.add(rightEye);
      fabricCanvas.add(smile);
      toast.info("Smiley added");
    } else if (tool === "eye") {
      const eyeShape = new Polygon([
        { x: -30, y: 0 },
        { x: -15, y: -15 },
        { x: 15, y: -15 },
        { x: 30, y: 0 },
        { x: 15, y: 15 },
        { x: -15, y: 15 }
      ], {
        left: 100,
        top: 100,
        fill: 'transparent',
        stroke: activeColor,
        strokeWidth: 2,
      });
      const pupil = new Circle({
        left: 100,
        top: 100,
        fill: activeColor,
        radius: 8,
      });
      fabricCanvas.add(eyeShape);
      fabricCanvas.add(pupil);
      toast.info("Eye added");
    } else if (tool === "line") {
      const line = new Line([50, 50, 150, 50], {
        left: 100,
        top: 100,
        stroke: activeColor,
        strokeWidth: brushWidth,
      });
      fabricCanvas.add(line);
      toast.info("Line added");
    } else if (tool === "text") {
      const text = new IText('Type here...', {
        left: 100,
        top: 100,
        fill: activeColor,
        fontSize: 20,
        fontFamily: 'Arial',
      });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
      
      // Don't auto-enter editing mode
      toast.info("Text added - Double click to edit");
    } else if (tool === "fill") {
      toast.info("Click on an object to fill with color");
      fabricCanvas.on('mouse:down', function fillHandler(e) {
        if (e.target) {
          e.target.set('fill', activeColor);
          fabricCanvas.renderAll();
          fabricCanvas.off('mouse:down', fillHandler);
          toast.success(`Object filled with ${activeColor}!`);
        }
      });
    }
  };

  const handleUndo = () => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--;
      const state = historyRef.current[historyIndexRef.current];
      
      console.log('Undo to index:', historyIndexRef.current);
      
      fabricCanvas?.loadFromJSON(JSON.parse(state), () => {
        fabricCanvas.renderAll();
      });
      
      toast.success("⬅️ Restored!");
    } else {
      toast.error("Nothing to undo!");
    }
  };

  const handleRedo = () => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++;
      const state = historyRef.current[historyIndexRef.current];
      
      console.log('Redo to index:', historyIndexRef.current);
      
      fabricCanvas?.loadFromJSON(JSON.parse(state), () => {
        fabricCanvas.renderAll();
      });
      
      toast.success("➡️ Redo!");
    } else {
      toast.error("Nothing to redo!");
    }
  };

  const handleDelete = () => {
    const activeObject = fabricCanvas?.getActiveObject();
    if (activeObject) {
      fabricCanvas?.remove(activeObject);
      toast.error("🗑️ Object deleted! Press Ctrl+Z to restore");
    } else {
      toast.info("Select an object first to delete it");
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast.success("🧹 All cleared! Press Ctrl+Z to restore everything");
  };

  const handleExport = () => {
    if (!fabricCanvas) return;
    const dataURL = fabricCanvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "mini-paint.png";
    link.click();
    toast.success("Image exported!");
  };

  const handleEvaluate = () => {
    toast.info("AI Evaluator coming soon!");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        handleDelete();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full items-center p-4 gap-4">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <Toolbar 
            activeTool={activeTool} 
            onToolClick={handleToolClick} 
            onClear={() => {
              const activeObject = fabricCanvas?.getActiveObject();
              if (activeObject) {
                handleDelete();
              } else {
                handleClear();
              }
            }} 
            brushWidth={brushWidth}
            onBrushWidthChange={setBrushWidth}
            brushType={brushType}
            onBrushTypeChange={setBrushType}
            onExport={handleExport}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onEvaluate={handleEvaluate}
          />
          
          <div className="glass-card rounded-2xl p-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600">COLORS</span>
              <ColorPicker color={activeColor} onChange={setActiveColor} />
            </div>
          </div>
        </div>
      </div>
      
      <DrawingSubmitter fabricCanvas={fabricCanvas} />
      
      <div className="flex-grow w-full relative" ref={canvasContainerRef}>
        <div className="absolute inset-0 glass-card rounded-3xl overflow-hidden shadow-elegant border-2 border-border/50">
          <canvas ref={canvasRef} />
        </div>
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
          History: {historyRef.current.length} | Index: {historyIndexRef.current + 1}
        </div>
      </div>
    </div>
  );
};