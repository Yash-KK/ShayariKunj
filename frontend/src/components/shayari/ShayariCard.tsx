import React from "react";

type ShayariCardProps = {
  text: string;
  author?: string;
  tags: string[];
  onLike: () => void;
};

const ShayariCard: React.FC<ShayariCardProps> = ({
  text,
  author,
  tags,
  onLike,
}) => {
  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition">
      <p className="text-lg font-semibold mb-2">"{text}"</p>
      {author && <p className="text-sm text-gray-500">- {author}</p>}
      <div className="mt-2 flex justify-between items-center">
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        <button
          onClick={onLike}
          className="text-blue-500 hover:underline text-sm font-medium"
        >
          Like
        </button>
      </div>
    </div>
  );
};

export default ShayariCard;
