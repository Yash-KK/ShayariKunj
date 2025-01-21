import React from "react";
import Header from "../components/layouts/Header";
import ShayariCard from "../components/shayari/ShayariCard";

const Home: React.FC = () => {
  const exampleShayaris = [
    {
      text: "Zindagi ek safar hai suhana...",
      author: "Unknown",
      tags: ["Life", "Journey"],
    },
    {
      text: "Pyaar dosti hai...",
      author: "Bollywood",
      tags: ["Love", "Friendship"],
    },
  ];

  return (
    <>
      <Header />
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">ShayariKunj</h2>
        <div className="grid gap-4">
          {exampleShayaris.map((shayari, index) => (
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
    </>
  );
};

export default Home;
