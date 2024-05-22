import  { useState } from 'react';
import axios from 'axios';

const API_KEY = 'a2df3d1a7611194432bbdf1fc80540f2';
const URL_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const URL_IMAGE = 'https://image.tmdb.org/t/p/w500/';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    try {
      const response = await axios.get(`${URL_SEARCH}${query}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setQuery('');
    setSelectedMovie(null);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleTitleClick = () => {
    setMovies([]);
    setSelectedMovie(null);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <h1 className="text-3xl mt-4 cursor-pointer" onClick={handleTitleClick}>
        Movie Finder
      </h1>
      <form className="mt-4 flex gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-black text-xl p-2 rounded"
          placeholder="Search for a movie"
        />
        <button className="text-xl bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-700 active:transform active:translate-y-1">
          Search
        </button>
      </form>
      {selectedMovie ? (
        <div className="mt-8">
          <img src={`${URL_IMAGE}${selectedMovie.poster_path}`} alt={selectedMovie.title} className="w-full max-w-md" />
          <h2 className="text-2xl mt-4">{selectedMovie.title}</h2>
          <p className="mt-2">{selectedMovie.overview}</p>
          <p className="mt-2">Release Date: {selectedMovie.release_date}</p>
          <p className="mt-2">Rating: {selectedMovie.vote_average}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-11/12 my-4">
          {movies.map((movie) => (
            <img
              key={movie.id}
              src={`${URL_IMAGE}${movie.poster_path}`}
              alt={movie.title}
              className="w-full shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
