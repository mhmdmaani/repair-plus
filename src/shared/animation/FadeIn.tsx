import React, { useState, useEffect } from 'react';

const FadeOnScroll = () => {
  const [opacity, setOpacity] = useState(1);

  const handleScroll = () => {
    const totalScrollDistance = document.documentElement.scrollTop;
    const fadeOutStart = 100; // Start fading out after 100px of scrolling
    const fadeOutEnd = 500; // Completely faded out after 500px of scrolling

    if (totalScrollDistance < fadeOutStart) {
      setOpacity(1);
    } else if (totalScrollDistance > fadeOutEnd) {
      setOpacity(0);
    } else {
      // Calculate opacity based on scroll position
      const opacity =
        1 - (totalScrollDistance - fadeOutStart) / (fadeOutEnd - fadeOutStart);
      setOpacity(opacity);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ opacity }}>
      {/* Your content here */}
      Scroll to fade this content
    </div>
  );
};

export default FadeOnScroll;
