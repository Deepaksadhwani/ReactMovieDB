import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";
import DeleteMovie from "./components/DeleteMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addMovieHandler = async (Movie) => {
    try {
      const response = await fetch(
        "https://react-http-fc81f-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(Movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteMovieHandler = async (id) => {
    try {
      await fetch(
        `https://react-http-fc81f-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchMovies = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        "https://react-http-fc81f-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong...retrying");
      }
      const data = await response.json();

      const loadingMovies = [];

      for (const key in data) {
        loadingMovies.push({
          id: key,
          title: data[key].title,
          description: data[key].description,
          date: data[key].date,
        });
      }

      console.log(loadingMovies);

      setMovies(loadingMovies);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <React.Fragment>
      <section>
        <DeleteMovie onDeleteMovie={deleteMovieHandler} />
      </section>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>

      <section>
        <button onClick={fetchMovies} disabled={loading}>
          Fetch Movies
        </button>
      </section>
      <section>
        {!loading ? <MoviesList movies={movies} /> : <p>Loading... </p>}
        {!loading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
