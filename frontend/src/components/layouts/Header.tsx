import React from "react";
import Button from "../common/Button";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">RuhRang</h1>
      <nav className="flex gap-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/explore" className="hover:underline">
          Explore Shayaris
        </a>
        <a href="/submit" className="hover:underline">
          Submit Shayari
        </a>
        <Button
          label="Login"
          onClick={() => console.log("Login clicked")}
          variant="secondary"
        />
      </nav>
    </header>
  );
};

export default Header;
