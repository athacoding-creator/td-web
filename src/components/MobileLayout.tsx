import { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

const MobileLayout = ({ children, className = "" }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/20 via-muted/30 to-muted/40 flex justify-center">
      <div className={`w-full max-w-md bg-background min-h-screen shadow-2xl relative ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
