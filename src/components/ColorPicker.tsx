import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const colors = [
    { name: "Purple", value: "#9b87f5" },
    { name: "Coral", value: "#f97066" },
    { name: "Teal", value: "#22d3ee" },
    { name: "Mint", value: "#4ade80" },
    { name: "Amber", value: "#fbbf24" },
    { name: "Black", value: "#1a1a1a" },
  ];

  return (
    <div className="glass-card rounded-2xl p-3 flex items-center gap-2 animate-scale-in">
      <span className="text-sm font-medium text-muted-foreground px-2">Color</span>
      <div className="flex gap-2">
        {colors.map((c) => (
          <button
            key={c.value}
            onClick={() => onChange(c.value)}
            className={cn(
              "w-8 h-8 rounded-lg transition-smooth hover:scale-110 active:scale-95 relative",
              "ring-2 ring-offset-2 ring-offset-background",
              color === c.value ? "ring-foreground/20" : "ring-transparent"
            )}
            style={{ backgroundColor: c.value }}
            title={c.name}
          >
            {color === c.value && (
              <Check className="w-4 h-4 absolute inset-0 m-auto text-white drop-shadow-lg" strokeWidth={3} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
