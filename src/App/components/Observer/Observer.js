import React, { useEffect, useRef } from 'react';

export function Observer({ setCurrentAPIPage, partData }) {
  const observer = useRef();
  const lastElement = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (Array.isArray(partData) && partData.length === 0) {
          observer.current.disconnect();
        }
        setCurrentAPIPage((prevValue) => prevValue + 1);
      }
    });
    if (lastElement.current) {
      observer.current.observe(lastElement.current);
    }
  }, []);
  return <div ref={lastElement} className='intersec'></div>;
}
