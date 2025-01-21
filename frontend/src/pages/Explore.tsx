import React from "react";
import Header from "../components/layouts/Header";
import ShayariCard from "../components/shayari/ShayariCard";
import Footer from "../components/layouts/Footer";

const Explore: React.FC = () => {
  const shayaris = [
    {
      text: "Kabhi kabhi lagta hai zindagi hi alag hai...",
      author: "Bollywood",
      tags: ["Life", "Feelings"],
    },
    { text: "Tum hi ho...", author: "Bollywood", tags: ["Love", "Romance"] },
  ];

  return (
    <>
      <Header />
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Explore Shayaris</h2>
        <div className="grid gap-4">
          {shayaris.map((shayari, index) => (
            <ShayariCard
              key={index}
              text={shayari.text}
              author={shayari.author}
              tags={shayari.tags}
              onLike={() => console.log(`Liked: ${shayari.text}`)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Explore;
