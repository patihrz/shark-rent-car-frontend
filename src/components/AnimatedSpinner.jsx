import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedSpinner() {
  return (
    <div className="w-full h-40 flex items-center justify-center">
      <motion.div
        className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{ borderTopColor: 'transparent', borderStyle: 'solid' }}
      />
    </div>
  );
}
