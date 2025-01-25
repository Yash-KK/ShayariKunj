import React from "react";
import Header from "../components/layouts/Header";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="font-mono flex justify-center flex-col bg-gray-600 mt-1 mb-2 rounded-xl h-[40rem] text-center overflow-hidden p-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-yellow-400 mb-4">
          Shayari Kunj Mein Aapka Swagat Hai!
        </h1>
        <p className="text-gray-300 text-xs sm:text-sm md:text-lg lg:text-5xl mb-4 px-4 md:px-64">
          Shayari ki duniya mein aapka swagat hai! Yahan har jazbaat ko shabdon
          mein sama diya gaya hai – dosti, mohabbat, ya zindagi ke talchhat
          lamhe, sab ke liye ek shayari hai.
        </p>

        <p className="text-gray-300 text-xs sm:text-sm md:text-lg lg:text-lg mb-4">
          Shayari Kunj – Jahan alfaaz jazbaat ban jaate hain.
        </p>
      </div>
    </>
  );
};

export default Home;
