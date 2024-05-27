import React from 'react'
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { HiMenuAlt3 } from "react-icons/hi";
import LanguageSwitcher from '../../components/languageSwitcher/LanguageSwitcher';
import StyleSwitcher from '../../components/styleSwitcher/StyleSwitcher';

interface NavbarLayoutProps {
  toggleSidebar: () => void
}

const NavbarLayout: React.FC<NavbarLayoutProps> = ({
  toggleSidebar
}) => {
  return (
    <Navbar className='border-b border-gray-200 px-4 py-4 sticky top-0 z-50'  fluid>
      <div className='flex'>

        <Button onClick={toggleSidebar} className='block md:hidden'>
          <HiMenuAlt3 className="mr-2 h-5 w-5" />
        </Button>

        <NavbarBrand className='px-5 md:px-0' href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Registro elettronico</span>
        </NavbarBrand>
      </div>

    <NavbarToggle />
    <StyleSwitcher />
    <LanguageSwitcher />
  </Navbar>
  )
}

export default NavbarLayout