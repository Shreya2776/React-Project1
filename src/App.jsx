import Search from './components/search.jsx'
import React from 'react'
import './index.css';
import {useState,useEffect} from 'react';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY =import.meta.env.VITE_TMDB_API_KEY;
// VITE_TMDB_API_KEY is an environment variable that stores the API key for The Movie Database (TMDB)
// import.meta.env is a special object that contains environment variables in Vite
const API_OPTIONS={
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
} 
const App = () => {
  const[searchTerm, setSearchTerm] = React.useState(' ');
//API- Application Programming Interface
// useState is a hook that allows you to add state to a functional component
// useEffect is a hook that allows you to perform side effects in a functional component
// useState returns an array with two elements: the current state and a function to update it
// useEffect takes a function as an argument and runs it after the component renders
// The function passed to useEffect can return a cleanup function that runs when the component unmount
//API is a set of rules that allows different software applications to communicate with each other
// API_KEY is a unique identifier that allows you to access the API
  const [errorMessage, setErrorMessage] = useState('');
  // useState is a hook that allows you to add state to a functional component
  // errorMessage is a state variable that stores the error message if any error occurs
  // setErrorMessage is a function that updates the errorMessage state variable
  // It is initialized with an empty string, meaning there is no error message initially
  const [movieList, setMovieList] = useState([]);
  // movieList is a state variable that stores the list of movies fetched from the API
  // setMovieList is a function that updates the movieList state variable
  // It is initialized with an empty array, meaning there are no movies in the list initially
  const[isLoading, setIsLoading] =useState(true);
  // isLoading is a state variable that indicates whether the movies are being fetched from the API
  // setIsLoading is a function that updates the isLoading state variable
  // It is initialized with true, meaning the movies are being fetched initially
  // You can use this variable to show a loading spinner or message while the movies are being fetched
  // For example, you can conditionally render a loading spinner like this:
  // {isLoading ? <Spinner /> : <MovieList movies={movieList} />}
  // This will show the Spinner component while isLoading is true, and the MovieList component
  // when isLoading is false, meaning the movies have been fetched successfully
  const fetchMovies=async()=>{
    setIsLoading(true);
    // setIsLoading is called to update the isLoading state variable to true
    // This indicates that the movies are being fetched from the API
    // You can use this variable to show a loading spinner or message while the movies are being fetched
    // For example, you can conditionally render a loading spinner like this:
    setErrorMessage(' ');
    // setErrorMessage is called to update the errorMessage state variable to an empty string
    // This clears any previous error message before fetching the movies
    // This ensures that if there was an error in the previous fetch, it will not be displayed when fetching new movies
    // You can also set a default error message if you want to display a message when there are no movies found
    // For example, you can set the errorMessage state variable to 'No movies found' if the API response indicates that there are no movies
    // This will ensure that the error message is cleared when fetching new movies
    try{
      const endpoint=`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      // endpoint is a string that contains the URL of the API endpoint to fetch movies from
      const response=await fetch(endpoint, API_OPTIONS);
      // fetch is a built in javascript function that makes an HTTP request to the specified URL
      // API_OPTIONS is an object that contains the options for the request, such as headers
      //throw new Error('Failed to fetch movies');
      // This line is intentionally throwing an error to demonstrate error handling
      // In a real application, you would remove this line
      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }
      // response.ok is a boolean that indicates whether the response was successful (status code 200-299)
      // If the response is not ok, it throws an error with a message
      const data=await response.json();
      // response.json() is a method that parses the response body as JSON and returns a promise
      // await is used to wait for the promise to resolve before proceeding
      console.log(data);
      // data is an object that contains the parsed JSON data from the response
      // In this case, it contains the list of movies fetched from the API
      // You can access the movies using data.results or similar, depending on the API response structure
      // For example, if the API response has a property called "results" that contains an array of movies, you can access it like this: data.results
      // You can then use this data to display the movies in your application
      // You can also store the movies in a state variable using useState, like this:
      // const [movies, setMovies] = useState([]);
      // setMovies(data.results);
      // This will allow you to render the movies in your component
      /////if(data.Response=='False'){
        /////setErrorMessage(data.Error || 'Failed to fetch movies');
        // If the API response has a property called "Response" that indicates whether the request was successful or not,
        // and a property called "Error" that contains the error message, you
        // can set the errorMessage state variable with the error message from the API response
        /////// If the "Error" property is not present, you can set a default error message

        // If the API response indicates that there are no movies found, you can set the movieList state variable to an empty array
        // This will ensure that the movie list is cleared when there are no movies to display
        /////return;
        // This will prevent the rest of the code from executing if there are no movies found
      /////}
      setMovieList(data.results || []);
    } catch(error){
      console.error(`Error fetching movies: ${error}` );
      setErrorMessage('Error fetching movies. Please try again later.');
      // setErrorMessage is called to update the errorMessage state variable with a user-friendly message
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    fetchMovies();
    // useEffect is a hook that runs the fetchMovies function when the component mounts
    // This means that when the App component is rendered, it will fetch the movies from the API
    // This will ensure that the movies are fetched only once when the component mounts
  }, [])
  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner"/>
          <h1>Find <span className="text-gradient">Movies</span>You'll enjoy without the hassle </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {/* Test item to confirm rendering */}
              <li style={{color: "red"}}>Test Item</li>
              {movieList.map((movie) => (
                <li
                  key={movie.id}
                  style={{
                    margin: "10px 0",
                    border: "1px solid #fff",
                    padding: "10px",
                    background: "#222",
                    color: "#fff"
                  }}
                >
                  {movie.title}
                </li>
              ))}
            </ul>
          )}
        </section>
          
      </div>
    </main>
  )
}
export default App


