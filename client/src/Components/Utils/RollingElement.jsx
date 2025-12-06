import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const RollingElement = ({ children, duration = 2 }) => {
  const [rolled, setRolled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setRolled(false), 1000); // Delay before unrolling
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-hidden w-full bg-gray-900 text-white py-2 flex justify-center items-center">
      <motion.div
        initial={{ y: rolled ? '-100%' : '0%' }}
        animate={{ y: '0%' }}
        transition={{ duration, ease: "easeOut" }}
        className=""
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RollingElement;
