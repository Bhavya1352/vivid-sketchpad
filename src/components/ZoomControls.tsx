import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ZoomControlsProps {
  fabricCanvas: any;
}

export const ZoomControls = ({ fabricCanvas }: ZoomControlsProps) => {
  const handleZoomIn = () => {
    if (!fabricCanvas) return;
    const zoom = fabricCanvas.getZoom();
    if (zoom < 3) {
      fabricCanvas.setZoom(zoom * 1.2);
      toast.info(`Zoom: ${Math.round(zoom * 120)}%`);
    }
  };

  const handleZoomOut = () => {
    if (!fabricCanvas) return;
    const zoom = fabricCanvas.getZoom();
    if (zoom > 0.3) {
      fabricCanvas.setZoom(zoom * 0.8);
      toast.info(`Zoom: ${Math.round(zoom * 80)}%`);
    }
  };

  const handleResetZoom = () => {
    if (!fabricCanvas) return;
    fabricCanvas.setZoom(1);
    fabricCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    toast.info('Zoom reset to 100%');
  };

  return (
    <div className="fixed bottom-20 right-4 flex flex-col gap-2 z-40">
      <Button
        size="icon"
        onClick={handleZoomIn}
        className="w-10 h-10 bg-white shadow-lg hover:shadow-xl"
        title="Zoom In"
      >
        <ZoomIn className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        onClick={handleZoomOut}
        className="w-10 h-10 bg-white shadow-lg hover:shadow-xl"
        title="Zoom Out"
      >
        <ZoomOut className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        onClick={handleResetZoom}
        className="w-10 h-10 bg-white shadow-lg hover:shadow-xl"
        title="Reset Zoom"
      >
        <RotateCcw className="w-4 h-4" />
      </Button>
    </div>
  );
};