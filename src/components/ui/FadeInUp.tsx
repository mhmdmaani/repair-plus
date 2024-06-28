import React from 'react';
import { motion } from 'framer-motion';

export default function FadeInUp({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className='inset-0'
      initial={{
        opacity: 0,
        translateY: 100,
      }}
      transition={{
        duration: 0.5,
      }}
      whileInView={{ opacity: 1, translateY: 0 }}
    >
      {children}
    </motion.div>
  );
}
