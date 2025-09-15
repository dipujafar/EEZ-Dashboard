import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const AnimatedArrow = ({ size, className }: { size?: number, className?: string }) => {
  return (
    <div className="relative overflow-hidden">
      <ArrowRight
        className={cn("ease-in-out-circ transition-all duration-500 group-hover:translate-x-5", className)}
        size={size || 24}
      />

      <ArrowRight
        className={cn("ease-in-out-circ absolute top-0 -translate-x-5 transition-all duration-500 group-hover:translate-x-0", className)}
        size={size || 24}
      />
    </div>
  );
};

export default AnimatedArrow;
