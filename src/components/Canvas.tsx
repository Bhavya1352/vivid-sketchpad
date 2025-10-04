import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush, SprayBrush, Polygon, Path, Line, IText } from "fabric";
import { Toolbar } from "./Toolbar";
import { ColorPicker } from "./ColorPicker";
import { DrawingSubmitter } from "./DrawingSubmitter";
import { ZoomControls } from "./ZoomControls";
import { DarkModeToggle } from "./DarkModeToggle";
import { KeyboardShortcuts } from "./KeyboardShortcuts";
import { LoadingSpinner } from "./LoadingSpinner";
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
  const [isLoading, setIsLoading] = useState(true);

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedo = useRef(false);

  const saveToHistory = () => {
    if (!fabricCanvas || isUndoRedo.current) return;
    
    setTimeout(() => {
      const state = JSON.stringify(fabricCanvas.toJSON());
      setHistory(prev => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(state);
        return newHistory;
      });
      setHistoryIndex(prev => prev + 1);
      console.log('History saved, new index:', historyIndex + 1);
    }, 50);
  };

  useEffect(() => {
    if (!canvasRef.current || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const canvas = new FabricCanvas(canvasRef.current, {
      backgroundColor: "#ffffff",
      width: container.clientWidth || 800,
      height: container.clientHeight || 600,
      enableRetinaScaling: true,
      allowTouchScrolling: false,
    });

    const brush = new PencilBrush(canvas);
    brush.color = activeColor;
    brush.width = brushWidth;
    canvas.freeDrawingBrush = brush;
    canvas.isDrawingMode = true;

    setFabricCanvas(canvas);
    
    // Don't save empty canvas as initial state
    setHistory([]);
    setHistoryIndex(-1);
    
    // Set loading to false after canvas is ready
    setTimeout(() => setIsLoading(false), 500);

    // Save on drawing
    canvas.on('path:created', () => {
      setTimeout(() => {
        if (!isUndoRedo.current) {
          const state = JSON.stringify(canvas.toJSON());
          setHistory(prev => [...prev, state]);
          setHistoryIndex(prev => prev + 1);
        }
      }, 100);
    });

    // Mobile touch support
    const preventScroll = (e: TouchEvent) => {
      if (e.target === canvas.upperCanvasEl) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });

    toast.success("Canvas ready!");

    return () => {
      canvas.off('path:created');
      document.removeEventListener('touchstart', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    // Remove any existing fill handlers
    fabricCanvas.off('mouse:down');

    if (activeTool === "draw") {
      fabricCanvas.isDrawingMode = true;
      const brush = brushType === "spray" ? new SprayBrush(fabricCanvas) : new PencilBrush(fabricCanvas);
      brush.color = activeColor;
      brush.width = brushWidth;
      
      // Smooth drawing with requestAnimationFrame
      let animationId: number;
      const smoothRender = () => {
        fabricCanvas.renderAll();
        animationId = requestAnimationFrame(smoothRender);
      };
      
      fabricCanvas.freeDrawingBrush = brush;
      fabricCanvas.on('path:created', () => {
        cancelAnimationFrame(animationId);
      });
      
    } else if (activeTool === "eraser") {
      fabricCanvas.isDrawingMode = true;
      const eraser = new PencilBrush(fabricCanvas);
      eraser.color = "#ffffff";
      eraser.width = brushWidth * 2;
      fabricCanvas.freeDrawingBrush = eraser;
    } else if (activeTool === "fill") {
      fabricCanvas.isDrawingMode = false;
      // Add persistent fill handler
      fabricCanvas.on('mouse:down', (e) => {
        if (e.target) {
          e.target.set('fill', activeColor);
          fabricCanvas.renderAll();
          toast.success(`Object filled with ${activeColor}!`);
        }
      });
    } else {
      fabricCanvas.isDrawingMode = false;
    }
  }, [fabricCanvas, activeTool, activeColor, brushWidth, brushType]);

  const handleToolClick = (tool: typeof activeTool) => {
    if (!fabricCanvas) return;

    // Only set active tool for non-shape tools
    if (["select", "draw", "eraser", "fill"].includes(tool)) {
      setActiveTool(tool);
      return;
    }

    // For shape tools, add the shape but keep the tool active
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
      setTimeout(saveToHistory, 100);
      toast.info("Rectangle added - Click again to add more");
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
      setTimeout(saveToHistory, 100);
      toast.info("Circle added - Click again to add more");
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
      setTimeout(saveToHistory, 100);
      toast.info("Oval added - Click again to add more");
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
      setTimeout(saveToHistory, 100);
      toast.info("Triangle added - Click again to add more");
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
      toast.info("Diamond added - Click again to add more");
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
      toast.info("Pentagon added - Click again to add more");
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
      toast.info("Octagon added - Click again to add more");
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
      toast.info("Star added - Click again to add more");
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
      toast.info("Heart added - Click again to add more");
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
      toast.info("Hexagon added - Click again to add more");
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
      toast.info("Arrow added - Click again to add more");
    } else if (tool === "smiley") {
      const smiley = new IText('😊', {
        left: Math.random() * (fabricCanvas.width! - 50),
        top: Math.random() * (fabricCanvas.height! - 50),
        fontSize: 40,
        fontFamily: 'Arial',
      });
      fabricCanvas.add(smiley);
      setTimeout(saveToHistory, 100);
      toast.info("Smiley emoji added - Click again to add more");
    } else if (tool === "eye") {
      const eye = new IText('👁️', {
        left: Math.random() * (fabricCanvas.width! - 50),
        top: Math.random() * (fabricCanvas.height! - 50),
        fontSize: 40,
        fontFamily: 'Arial',
      });
      fabricCanvas.add(eye);
      setTimeout(saveToHistory, 100);
      toast.info("Eye emoji added - Click again to add more");
    } else if (tool === "line") {
      const line = new Line([50, 50, 150, 50], {
        left: 100,
        top: 100,
        stroke: activeColor,
        strokeWidth: brushWidth,
      });
      fabricCanvas.add(line);
      toast.info("Line added - Click again to add more");
    } else if (tool === "text") {
      setActiveTool('select');
      const text = new IText('Type here...', {
        left: Math.random() * (fabricCanvas.width! - 100),
        top: Math.random() * (fabricCanvas.height! - 50),
        fill: activeColor,
        fontSize: 20,
        fontFamily: 'Arial',
      });
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
      text.enterEditing();
      toast.info("Text mode - Type to edit, click elsewhere when done");
    } else if (tool === "fill") {
      setActiveTool(tool);
      toast.info("Fill mode active - Click objects to fill with color");
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const state = history[newIndex];
      
      if (fabricCanvas && state) {
        isUndoRedo.current = true;
        fabricCanvas.loadFromJSON(JSON.parse(state), () => {
          fabricCanvas.renderAll();
          isUndoRedo.current = false;
        });
        setHistoryIndex(newIndex);
        toast.success("🗑️ Deleted!");
      }
    } else {
      toast.error("Nothing to delete!");
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const state = history[newIndex];
      
      if (fabricCanvas && state) {
        isUndoRedo.current = true;
        fabricCanvas.loadFromJSON(JSON.parse(state), () => {
          fabricCanvas.renderAll();
          isUndoRedo.current = false;
        });
        setHistoryIndex(newIndex);
        toast.success("↩️ Restored!");
      }
    } else {
      toast.error("Nothing to restore!");
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

  const handleExport = (format: 'png' | 'svg' = 'png') => {
    if (!fabricCanvas) return;
    
    if (format === 'svg') {
      const svgData = fabricCanvas.toSVG();
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mini-paint.svg';
      link.click();
      URL.revokeObjectURL(url);
      toast.success('SVG exported!');
    } else {
      const dataURL = fabricCanvas.toDataURL({ format: 'png' });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'mini-paint.png';
      link.click();
      toast.success('PNG exported!');
    }
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
            onExport={() => handleExport('png')}
          onExportSVG={() => handleExport('svg')}
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
      <ZoomControls fabricCanvas={fabricCanvas} />
      
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <KeyboardShortcuts />
        <DarkModeToggle />
      </div>
      
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <LoadingSpinner message="Initializing Canvas..." size="lg" />
        </div>
      )}
      
      <div className="flex-grow w-full relative" ref={canvasContainerRef}>
        <div className="absolute inset-0 glass-card rounded-3xl overflow-hidden shadow-elegant border-2 border-border/50">
          <canvas ref={canvasRef} />
        </div>
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
          <span>•</span>
          <span>History: {history.length}</span>
          <span>•</span>
          <span>Step: {historyIndex + 1}</span>
        </div>
      </div>
    </div>
  );
};