import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
}

const CountUp = ({ end, duration = 2500, className = "" }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Guard clause: don't animate if already done or no value
    if (hasAnimated || !end || end <= 0) return;

    const container = containerRef.current;
    if (!container) return;

    // Create intersection observer to trigger when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only trigger when element is visible and hasn't animated yet
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            runAnimation();
          }
        });
      },
      { 
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: "0px"
      }
    );

    observer.observe(container);

    function runAnimation() {
      let startTimestamp: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        
        // EaseOutExpo for smooth deceleration
        const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentValue = Math.floor(easedProgress * end);
        
        setCount(currentValue);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end); // Ensure exact final value
        }
      };
      
      window.requestAnimationFrame(step);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration, hasAnimated]);

  // Format with Indonesian locale (thousands separator with .)
  const formattedValue = count.toLocaleString("id-ID");

  return (
    <span ref={containerRef} className={className}>
      {formattedValue}
    </span>
  );
};

export default CountUp;
