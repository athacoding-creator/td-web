 import { ReactNode } from "react";
 import BottomNavigation from "./BottomNavigation";

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

const MobileLayout = ({ children, className = "" }: MobileLayoutProps) => {
  return (
     <div className="min-h-screen bg-gradient-to-br from-muted/20 via-muted/30 to-muted/40 flex justify-center overflow-x-hidden">
       <div className={`w-full max-w-md bg-background min-h-screen shadow-2xl relative pb-16 overflow-x-hidden ${className}`}>
        {children}
      </div>
       <BottomNavigation />
    </div>
  );
};

export default MobileLayout;
