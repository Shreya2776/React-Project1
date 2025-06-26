



import Search from './components/search.jsx'
import React from 'react'
import './index.css';
import { useState, useEffect } from 'react';
import {useDebounce} from 'react-use'; // ✅ Import useDebounce from react-use
import { updateSearchCount } from './appwrite.js';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// ✅ LOG API KEY to ensure it's loading correctly
console.log("Loaded API KEY:", API_KEY);

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  // ✅ Use useDebounce to delay the search term update
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);
  const fetchMovies = async (query='') => {
    setIsLoading(true);
    setErrorMessage('');

    if (!API_KEY) {
      console.error("❌ API key is undefined. Check your .env.local file.");
      setErrorMessage("API key missing. Please check your environment setup.");
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Fetch Error:", errorText); // ✅ Log detailed error
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      // ✅ Log fetched data
      console.log("🎬 Fetched Movie Data:", data);

      setMovieList(data.results || []);

      if(query && data.results.length >0){
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`❌ Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]); 

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll enjoy without the hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <li key={movie.id} className="movie-card">
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      alt={movie.title}
                    />
                  )}
                  <h3>{movie.title}</h3>
                  <div className="content">
                    <span className="year">{movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</span>
                    <span className="lang">{movie.original_language}</span>
                    <span className="rating">
                      <img src="/star.svg" alt="star" />
                      <p>{movie.vote_average}</p>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
