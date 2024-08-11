import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MenuContext = createContext();

export const useMenu = () => {
  return useContext(MenuContext);
};

export const MenuProvider = ({ children }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 640);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsLargeScreen(width >= 640);

      // If the screen size is less than 640px, close the menu on location change
      if (width < 640 && location.pathname !== '/' && !location.pathname.includes('/products/id/')) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call handleResize on component mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.pathname]);

  useEffect(() => {
    // If the screen size is greater than or equal to 640px and the location is '/', open the menu
    if (isLargeScreen && (location.pathname === '/' || location.pathname.includes('/products/id/:productId'))) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isLargeScreen, location.pathname]);

  return (
    <MenuContext.Provider value={{ isOpen, toggleDropdown }}>
      {children}
    </MenuContext.Provider>
  );
};
  
  