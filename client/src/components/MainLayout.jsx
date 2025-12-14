import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // 1. Import useLocation
import Navigation from './Navigation';
import Footer from '../components/Footer';

const MainLayout = () => {
  // 2. Get the current pathname (URL)
  const { pathname } = useLocation();

  // 3. Automatically scroll to top whenever the path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <Navigation />
      
      <main className="flex-1 w-full">
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;