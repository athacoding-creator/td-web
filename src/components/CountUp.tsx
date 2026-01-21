import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
}

const CountUp = ({ end, duration = 2000, className = "" }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !end || hasAnimated) return;

    const startAnimation = () => {
      startTimeRef.current = Date.now();
      
      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation (easeOutExpo)
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        countRef.current = Math.floor(easeOutExpo * end);
        setCount(countRef.current);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setCount(end); // Ensure we end at exact value
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Setup Intersection Observer to trigger animation when element is visible
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            startAnimation();
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of element is visible
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

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
