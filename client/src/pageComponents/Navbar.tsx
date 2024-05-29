// src/components/Navbar.tsx
import React from "react";
import { MenuOutline, CloseOutline } from "react-ionicons";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#334155] text-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-lg font-semibold">Task Manager</div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <CloseOutline color={"#fff"} width="30px" height="30px" />
            ) : (
              <MenuOutline color={"#fff"} width="30px" height="30px" />
            )}
          </button>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-gray-300">
            Home
          </a>
          <a href="/" className="hover:text-gray-300">
            Tasks
          </a>
          <a href="/" className="hover:text-gray-300">
            About
          </a>
          <a href="/" className="hover:text-gray-300">
            Contact
          </a>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-600 text-white shadow-md">
          <a href="/" className="block py-2 px-4 hover:bg-blue-700">
            Home
          </a>
          <a href="/" className="block py-2 px-4 hover:bg-blue-700">
            Tasks
          </a>
          <a href="/" className="block py-2 px-4 hover:bg-blue-700">
            About
          </a>
          <a href="/" className="block py-2 px-4 hover:bg-blue-700">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
