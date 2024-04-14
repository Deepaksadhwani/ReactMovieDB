import React from "react";
import { useRef } from "react";

const DeleteMovie = ({ onDeleteMovie }) => {
  const DeleteId = useRef(null);

  const deleteHandler = () => {
    const id = DeleteId.current.value;
    onDeleteMovie(id);
  };

  return (
    <div>
      <input
        ref={DeleteId}
        className="p-2 mr-1 border-2 rounded-lg"
        type="text"
        placeholder="Enter Movie id"
      />
      <button onClick={deleteHandler}>Delete Movie</button>
    </div>
  );
};

export default DeleteMovie;
