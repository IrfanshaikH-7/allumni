import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className="bg-[#002147] text-white p-4">
      <button onClick={() => setOpenDropdown(openDropdown === 'menu' ? null : 'menu')} className="block md:hidden">
        Menu
      </button>
      
      <ul className={`md:flex space-x-4 ${openDropdown === 'menu' ? 'block' : 'hidden'} md:block`}>
        {['FLASH MENTORSHIP', 'NOTICEBOARD', 'NEWS & STORIES', 'EVENTS', 'BATCHMATES', 'FIND ALUMNI', 'CAREERS', 'ABOUT'].map((item, index) => (
          <li key={index} className="relative">
            <button
              onClick={() => handleToggle(index)}
              className="hover:bg-gray-700 px-3 py-2 rounded block w-full text-left"
            >
              {item}
            </button>
            {openDropdown === index && (
              <div className="absolute bg-white text-black mt-2 w-40 shadow-lg rounded z-10">
                <NavLink to='/directory' className='block px-4 py-2'>Alumni Directory</NavLink>
                <a href="#" className="block px-4 py-2">Subitem 2</a>
                <a href="#" className="block px-4 py-2">Subitem 3</a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
