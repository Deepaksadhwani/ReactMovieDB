import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong...retrying");
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));
      setMovies(transformedMovies);
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
        <AddMovie/>
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
