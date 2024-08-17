import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Context
const WindowWidthContext = createContext();

// Create the Provider component
export const WindowWidthProvider = ({ children }) => {
  const [isSmallerDevice, setIsSmallerDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallerDevice(width < 500);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowWidthContext.Provider value={{ isSmallerDevice }}>
      {children}
    </WindowWidthContext.Provider>
  );
};

// Custom hook to use the WindowWidth context
export const useWindowWidth = () => {
  return useContext(WindowWidthContext);
};
