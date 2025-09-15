import React from "react";
import { Progress } from "./ui/progress";

interface PageLoadingProgressProps {
  value?: number;
  className?: string;
}

const PageLoadingProgress: React.FC<PageLoadingProgressProps> = ({
  value = 50,
  className = "",
}) => (
  <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}>
    <Progress value={value} className={`h-1 w-full ${className}`} />
  </div>
);

export default PageLoadingProgress;
