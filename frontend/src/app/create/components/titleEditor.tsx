import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

type TitleEditorPropTypes = {
  title: string;
  setTitle: (title: string) => void;
};
export default function TitleEditor(props: TitleEditorPropTypes) {
  const [isEditing, setIsEditing] = useState(false);
  const { title, setTitle } = props;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex items-center ml-2">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span>{title}</span>
      )}
      <button
        onClick={handleEditClick}
        className="ml-2 text-lg text-black hover:text-gray-200 transition-all duration-300"
      >
        <FaEdit />
      </button>
    </div>
  );
}
