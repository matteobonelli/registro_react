import classNames from 'classnames';
import React from 'react'
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
    isOpen: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    isOpen
}) => {

    const mainClass = classNames('p-4 h-full position-relative', { 'ml-80': isOpen });
    
  return (
    <main className={mainClass}>
        <Outlet />
    </main>
  )
}

export default MainLayout
