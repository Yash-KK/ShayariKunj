import React from "react";
import KunjLogo from "../../assets/kunjLogo.png";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="flex bg-gray-800 text-gray-200 shadow-md rounded-xl h-64">
      <div className="container mx-auto flex items-center justify-between p-4">
        <img src={KunjLogo} alt="Logo" className="shadow-md h-56" />
        <nav className="flex items-center space-x-4">
          <a
            onClick={() => {
              navigate("/register");
            }}
            className="hover:text-gray-300 bg-gray-700 text-white px-3 py-1 rounded"
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
