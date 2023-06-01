import React, { useState, useCallback, useEffect } from 'react';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [fetchMovies, setFetchMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getMoviesListHandler = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch('https://movie-react-app-64329-default-rtdb.firebaseio.com/vehicles.json');
    const data = await response.json();
  
    // Check if data exists and is an object
    if (data && typeof data === 'object') {
      const loadedList = Object.entries(data).map(([key, value]) => ({
        id: key,
        title: value.title,
        releaseDate: value.releaseDate,
        openingText: value.openingText,
      }));
  
      setFetchMovies(loadedList);
    }
  
    setIsLoading(false);
  }, []);
  

  useEffect(() => {
    getMoviesListHandler();
  }, [getMoviesListHandler]);

  async function onAddMovieHandler(movie) {
    const clonedMovie = JSON.parse(JSON.stringify(movie));
  
    const response = await fetch('https://movie-react-app-64329-default-rtdb.firebaseio.com/vehicles.json', {
      method: 'POST',
      body: JSON.stringify(clonedMovie),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data = await response.json();
    console.log(data);
  
    let loadedList = [];
    for (const key in data) {
      loadedList.push({
        id: key,
        title: data[key].title,
        releaseDate: data[key].releaseDate,
        openingText: data[key].openingText,
      });
    }
  
    setFetchMovies(loadedList);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={onAddMovieHandler} />
      </section>

      <section>
        {!isLoading && fetchMovies && fetchMovies.length !== 0 && <MoviesList movies={fetchMovies} />}
        {isLoading && <p>...Loading data</p>}
        {!isLoading && fetchMovies && fetchMovies.length < 1 && <p>No results!</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
