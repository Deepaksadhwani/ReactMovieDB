import React, { useRef } from "react";




const AddMovie = () => {

  const title = useRef(null);
  const description = useRef(null);
  const releaseDate = useRef(null);
  
  const addMovieHandler = () => {
    const data = {
      title: title.current.value,
      description: description.current.value,
      date: releaseDate.current.value,
    }
    console.log(data)
  };



  return (
    <div className="flex flex-col text-left p-1  ">
      <label>Title</label>
      <input ref={title} className="border-2 rounded-lg my-2 p-1 px-1"  type="text" />
      <label>Opening Text</label>
      <textarea ref={description} className="border-2 px-2 my-2 rounded-lg"  cols="30" rows="10"></textarea>
      <label>Release Date</label>
      <input type="date" ref={releaseDate}  className="border-2 my-2 p-1 px-1 rounded-lg"/>
      <button onClick={addMovieHandler} className="w-3/12 place-self-center mt-4">Add Movie</button>
    </div>
  );
};

export default AddMovie;
