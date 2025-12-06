import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedSection = ({ children, h, w, index, isRepeated , fromLeft=false}) => {
  const triggerOnce = isRepeated?false:true
  const initial = {opacity:0, x:-50}
  const { ref, inView } = useInView({ triggerOnce, threshold: 0.5 });

  return (
    <motion.div
      style={{ height: `${h}px`, width: `${w}px` }}
      ref={ref}
      initial={fromLeft?initial:{ opacity: 0, y: 50 }}
      animate={inView ? fromLeft?{opacity:1,x:0}: { opacity: 1, y: 0 } : fromLeft?{opacity:0,x:-50}: { opacity: 0, y: 50 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.3 }} // Stagger effect
      className="flex items-center justify-center m-5"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
