import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ScrollTriggeredCurve = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Triggers only once

  const pathData = "M10 80 Q 95 10 180 80 T 350 80 T 520 80 T 690 80"; // Replace with your curve

  return (
    <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg
        ref={ref}
        width="800"
        height="200"
        viewBox="0 0 800 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={pathData}
          fill="transparent"
          stroke="black"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default ScrollTriggeredCurve;
