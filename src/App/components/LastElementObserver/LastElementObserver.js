import React, { useEffect, useRef } from 'react';

export function LastElementObserver({ isElementIntersecting }) {
  const observer = useRef();
  const lastElement = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isElementIntersecting();
      }
    });
    observer.current.observe(lastElement.current);
    return () => {
      observer.current.disconnect();
    };
  }, []);

  return <div ref={lastElement} className='intersec'></div>;
}
