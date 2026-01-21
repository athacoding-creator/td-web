import { useEffect, useRef, useState, useCallback } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
}

const CountUp = ({ end, duration = 2000, className = "" }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);
  const animationFrameRef = useRef<number>();

  const startAnimation = useCallback(() => {
    if (hasAnimatedRef.current || !end) return;
    hasAnimatedRef.current = true;
    
    const startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation (easeOutExpo)
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = Math.floor(easeOutExpo * end);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure we end at exact value
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [end, duration]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !end) return;

    // Reset if end value changes
    if (hasAnimatedRef.current && count !== end) {
      hasAnimatedRef.current = false;
      setCount(0);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            startAnimation();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [end, startAnimation, count]);

  // Format number with thousand separators
  const formatNumber = (num: number) => {
    return num.toLocaleString("id-ID");
  };

  return (
    <span ref={elementRef} className={className}>
      {formatNumber(count)}
    </span>
  );
};

export default CountUp;
