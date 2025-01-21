import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} RuhRang. All Rights Reserved.
      </p>
      <div className="mt-2 flex justify-center gap-4">
        <a href="/terms" className="hover:underline">
          Terms of Service
        </a>
        <a href="/privacy" className="hover:underline">
          Privacy Policy
        </a>
        <a href="/contact" className="hover:underline">
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;
