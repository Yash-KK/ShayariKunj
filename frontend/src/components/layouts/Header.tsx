import React from "react";
import KunjLogo from "../../assets/kunjLogo.png";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();  
  return (
    <header className="bg-gray-800 text-gray-200 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <img src={KunjLogo} alt="Logo" className="h-12 w-12 rounded-full shadow-md" />
        <nav className="flex items-center space-x-4">
          <a onClick={()=>{
            navigate("/register")
          }} className="hover:text-gray-300">Login</a>
          {/* <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">Y</div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                <a href="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Dashboard</a>
                <a href="/signout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Signout</a>
              </div>
            )}
          </div> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
