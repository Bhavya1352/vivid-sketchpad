import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush, SprayBrush, Polygon, Path, Line, IText } from "fabric";
import { Toolbar } from "./Toolbar";
import { ColorPicker } from "./ColorPicker";
import { toast } from "sonner";

export type BrushType = "pencil" | "spray";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#9b87f5");
  const [brushWidth, setBrushWidth] = useState(3);
  const [brushType, setBrushType] = useState<BrushType>("pencil");
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "rectangle" | "circle" | "triangle" | "star" | "heart" | "hexagon" | "line" | "text" | "eraser" | "fill">("draw");

  const [canvasStates, setCanvasStates] = useState<string[]>([]);
  const [currentStateIndex, setCurrentStateIndex] = useState(-1);

  const saveState = () => {
    if (!fabricCanvas) return;
    
    const state = JSON.stringify(fabricCanvas.toJSON());
    const newStates = canvasStates.slice(0, currentStateIndex + 1);
    newStates.push(state);
    setCanvasStates(newStates);
    setCurrentStateIndex(newStates.length - 1);
    
    console.log('State saved. Total states:', newStates.length, 'Current index:', newStates.length - 1);
    console.log('Objects in canvas:', fabricCanvas.getObjects().length);
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
    
    // Save initial state
    setTimeout(() => {
      const initialState = JSON.stringify(canvas.toJSON());
      setCanvasStates([initialState]);
      setCurrentStateIndex(0);
    }, 100);

    // Save state after drawing
    canvas.on('path:created', () => {
      setTimeout(saveState, 100);
    });

    toast.success("Canvas ready!");

    return () => {
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
        fill: activeColor,
        width: 120,
        height: 80,
      });
      fabricCanvas.add(rect);
      setTimeout(saveState, 100);
      toast.info("Rectangle added");
    } else if (tool === "circle") {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: activeColor,
        radius: 50,
      });
      fabricCanvas.add(circle);
      setTimeout(saveState, 100);
      toast.info("Circle added");
    } else if (tool === "triangle") {
      const triangle = new Polygon([
        { x: 0, y: -50 },
        { x: -43, y: 25 },
        { x: 43, y: 25 }
      ], {
        left: 100,
        top: 100,
        fill: activeColor,
      });
      fabricCanvas.add(triangle);
      setTimeout(saveState, 100);
      toast.info("Triangle added");
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
        fill: activeColor,
      });
      fabricCanvas.add(star);
      setTimeout(saveState, 100);
      toast.info("Star added");
    } else if (tool === "heart") {
      const heartPath = "M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z";
      const heart = new Path(heartPath, {
        left: 100,
        top: 100,
        fill: activeColor,
        scaleX: 3,
        scaleY: 3,
      });
      fabricCanvas.add(heart);
      setTimeout(saveState, 100);
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
        fill: activeColor,
      });
      fabricCanvas.add(hexagon);
      setTimeout(saveState, 100);
      toast.info("Hexagon added");
    } else if (tool === "line") {
      const line = new Line([50, 50, 150, 50], {
        left: 100,
        top: 100,
        stroke: activeColor,
        strokeWidth: brushWidth,
      });
      fabricCanvas.add(line);
      setTimeout(saveState, 100);
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
      text.enterEditing();
      setTimeout(saveState, 100);
      toast.info("Text added - Click to edit");
    } else if (tool === "fill") {
      toast.info("Click on an object to fill with color");
      fabricCanvas.on('mouse:down', function(e) {
        if (e.target) {
          e.target.set('fill', activeColor);
          fabricCanvas.renderAll();
          setTimeout(saveState, 100);
          fabricCanvas.off('mouse:down');
          toast.success("Object filled!");
        }
      });
    }
  };

  const handleUndo = () => {
    if (currentStateIndex > 0) {
      const newIndex = currentStateIndex - 1;
      const state = canvasStates[newIndex];
      
      console.log('Undoing from index', currentStateIndex, 'to', newIndex);
      console.log('Loading state:', state.substring(0, 100) + '...');
      
      fabricCanvas?.loadFromJSON(JSON.parse(state), () => {
        fabricCanvas.renderAll();
        console.log('Canvas rendered after undo');
      });
      
      setCurrentStateIndex(newIndex);
      toast.success("⬅️ Restored!");
    } else {
      toast.error("Nothing to undo!");
    }
  };

  const handleRedo = () => {
    if (currentStateIndex < canvasStates.length - 1) {
      const newIndex = currentStateIndex + 1;
      const state = canvasStates[newIndex];
      
      console.log('Redoing from index', currentStateIndex, 'to', newIndex);
      
      fabricCanvas?.loadFromJSON(JSON.parse(state), () => {
        fabricCanvas.renderAll();
        console.log('Canvas rendered after redo');
      });
      
      setCurrentStateIndex(newIndex);
      toast.success("➡️ Redo!");
    } else {
      toast.error("Nothing to redo!");
    }
  };

  const handleDelete = () => {
    const activeObject = fabricCanvas?.getActiveObject();
    if (activeObject) {
      fabricCanvas?.remove(activeObject);
      setTimeout(saveState, 100);
      toast.error("🗑️ Deleted! Use Undo to restore");
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    setTimeout(saveState, 100);
    toast.success("Canvas cleared!");
  };

  const handleExport = () => {
    if (!fabricCanvas) return;
    const dataURL = fabricCanvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "mini-paint.png";
    link.click();
    toast.success("Exported!");
  };

  // Keyboard shortcuts
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
      if (e.key === 'Delete') {
        handleDelete();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentStateIndex, canvasStates]);

  return (
    <div className="flex flex-col h-screen w-full items-center p-4 gap-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Toolbar 
          activeTool={activeTool} 
          onToolClick={handleToolClick} 
          onClear={handleClear} 
          brushWidth={brushWidth}
          onBrushWidthChange={setBrushWidth}
          brushType={brushType}
          onBrushTypeChange={setBrushType}
          onExport={handleExport}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onDelete={handleDelete}
        />
        <ColorPicker color={activeColor} onChange={setActiveColor} />
      </div>
      
      <div className="flex-grow w-full relative" ref={canvasContainerRef}>
        <div className="absolute inset-0 glass-card rounded-3xl overflow-hidden shadow-elegant border-2 border-border/50">
          <canvas ref={canvasRef} />
        </div>
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
          States: {canvasStates.length} | Index: {currentStateIndex + 1}
        </div>
      </div>
      

    </div>
  );
};