import React from 'react';
import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          id={movie.id} // Use 'id' instead of 'key'
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          key={movie.id} // Unique 'key' prop required by React
        />
      ))}
    </ul>
  );
};

export default MovieList;
