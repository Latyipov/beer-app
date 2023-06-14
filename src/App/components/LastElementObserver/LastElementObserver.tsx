import React, { useEffect, useRef, FC } from 'react';
import './LastElementObserver.scss';

type LastElementObserverProps = {
  setNextPageData: () => void;
};
export const LastElementObserver: FC<LastElementObserverProps> = ({ setNextPageData }) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNextPageData();
      }
    });
    !!lastElement.current && observer.current.observe(lastElement.current);

    return () => {
      !!observer.current && observer.current.disconnect();
    };
  }, []);

  return <div ref={lastElement} className='intersec'></div>;
};
