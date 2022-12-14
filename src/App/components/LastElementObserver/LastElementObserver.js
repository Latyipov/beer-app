import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './LastElementObserver.scss';

export function LastElementObserver({ setNextPageData }) {
  const observer = useRef();
  const lastElement = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNextPageData();
      }
    });
    observer.current.observe(lastElement.current);

    return () => {
      observer.current.disconnect();
    };
  }, []);

  return <div ref={lastElement} className='intersec'></div>;
}

LastElementObserver.propTypes = {
  setNextPageData: PropTypes.func.isRequired,
};
