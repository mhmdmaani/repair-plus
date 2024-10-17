'use client';
import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FiMenu, FiX } from 'react-icons/fi';

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu toggle on mobile

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      const direction = current - scrollYProgress.getPrevious()!;
      // Show menu if near top or scrolling up; hide if scrolling down
      setVisible(scrollYProgress.get() < 0.05 || direction < 0);
    }
  });
  // check window size is less than 768px
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      {/* Toggle button for mobile */}
      {isMobile && (
        <button
          className='fixed z-[5000] top-5 right-5 md:hidden p-2 bg-black text-white rounded-full'
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      <AnimatePresence mode='wait'>
        {/* Menu visibility logic for mobile and larger screens */}
        {((menuOpen && isMobile) || !isMobile) && visible && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{
              y: menuOpen || visible ? 0 : -100,
              opacity: menuOpen || visible ? 1 : 0,
            }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'flex flex-col md:flex-row max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-y-4 md:space-x-4 md:space-y-0',
              className
            )}
            style={{
              backdropFilter: 'blur(16px) saturate(180%)',
              backgroundColor: 'rgba(17, 25, 40, 0.75)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.125)',
            }}
          >
            {navItems.map((navItem, idx) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  'relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500'
                )}
                onClick={() => setMenuOpen(false)} // Close menu on item click
              >
                <span className='block sm:hidden'>{navItem.icon}</span>
                <span className='text-sm !cursor-pointer'>{navItem.name}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
