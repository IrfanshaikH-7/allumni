import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

 


  return (
    <header className="bg-white text-white p-4 gap-3 flex justify-between items-center">
      <div className="flex items-center">
        <NavLink to="/"><img src="https://ies.ipsacademy.org/wp-content/uploads/2023/10/cropped-ies-logo-2023.png" alt="Institute Logo" className="md:h-24  md:mr-4" /></NavLink>
        
        
      </div>
      <div className="flex items-center gap-3">
        <NavLink  to="/signin" className='text-white bg-red-700 py-2 px-2 rounded-xl border-2 hover:shadow-md w-28 text-center' >Sign In</NavLink>
        
      </div>
    </header>
  );
};

export default Header;
