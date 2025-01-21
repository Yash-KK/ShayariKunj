import React, { useState } from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import Button from "../components/common/Button";

const Submit: React.FC = () => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = () => {
    console.log({ text, author });
    alert("Shayari submitted successfully!");
  };

  return (
    <>
      <Header />
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Submit Your Shayari</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Shayari</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border rounded p-2"
              rows={4}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <Button label="Submit" onClick={handleSubmit} variant="primary" />
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Submit;
