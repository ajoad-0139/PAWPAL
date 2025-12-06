import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

const SmoothScroll = ({ children }) => {
  const location = useLocation(); // Detects route changes

  useEffect(() => {
    const lenis = new Lenis({
    duration: 1, // Keeps a consistent feel
    easing: (t) => t, // Linear easing: No acceleration or deceleration
    smooth: true,
    smoothTouch: true,
    wheelMultiplier: 1.2, // Prevents unexpected speed-ups
    });


    const onScroll = (time) => {
      lenis.raf(time);
      requestAnimationFrame(onScroll);
    };

    requestAnimationFrame(onScroll);

    return () => lenis.destroy(); // Cleanup on unmount
  }, [location.pathname]); // Reinitialize on route changes

  return <>{children}</>;
};

export default SmoothScroll;
