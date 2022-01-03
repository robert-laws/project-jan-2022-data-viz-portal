import { useState, useRef, useEffect } from 'react';

export const Button = ({
  children,
  isLoading,
  styleClass = 'primary',
  ...props
}) => {
  const [height, setHeight] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect().height) {
      setHeight(ref.current.getBoundingClientRect().height * 1.1);
    }
  }, [children]);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    }
  }, [isLoading, showLoader]);

  return (
    <button
      className={`button ${styleClass}`}
      ref={ref}
      style={height ? { width: '100%', height: `${height}px` } : {}}
      {...props}
    >
      {isLoading ? <div className='loader' /> : children}
    </button>
  );
};
