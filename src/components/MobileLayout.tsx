import { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

const MobileLayout = ({ children, className = "" }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-muted/30 flex justify-center">
      <div className={`w-full max-w-md bg-background min-h-screen shadow-xl ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
