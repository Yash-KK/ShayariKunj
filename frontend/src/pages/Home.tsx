import React from "react";
import Header from "../components/layouts/Header";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center flex-col bg-gray-700 mt-2 mb-2 rounded-xl h-96 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-400 mb-4">
          Shayari Kunj Mein Aapka Swagat Hai!
        </h1>
        <p className="text-sm md:text-4xl mb-4 px-4 md:px-96">
          Shayari ki duniya mein aapka swagat hai! Yahan har jazbaat ko shabdon
          mein sama diya gaya hai – dosti, mohabbat, ya zindagi ke talchhat
          lamhe, sab ke liye ek shayari hai.
        </p>

        <p className="text-sm md:text-lg mb-4">
          Shayari Kunj – Jahan alfaaz jazbaat ban jaate hain.
        </p>
      </div>
    </>
  );
};

export default Home;
