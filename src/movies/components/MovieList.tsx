import React, { useState } from 'react';

import { Movie } from 'types';
import { MovieCard } from './MovieCard';
import { AddMovieButton } from './AddMovieButton';
import { AddMovieForm } from './AddMovieForm';
import { Card } from 'shared/components';

import { useMovies } from './MovieProvider';

type NewMovieMode = "BUTTON" | "FORM"

export const MovieList = () => {
  const { movies, moviesDispatch } = useMovies();
  const [displayOptionType, setDisplayOptionType] = useState('button');

  

  const handleSubmit = (movie: Omit<Movie, "id" | "ratings">) => {
    moviesDispatch({
      type: 'add',
      payload: {
        movie
      }
    })
    setDisplayOptionType('button')
  }

  return (
    <div className="card-deck">
      {movies.map(movie => (
        <Card key={movie.id}>
          <MovieCard key={movie.id} movie={movie} />
        </Card>      
      ))}
      <Card>
        {
          displayOptionType === 'button' ? 
            <AddMovieButton onClick={() => setDisplayOptionType('form')}></AddMovieButton> : 
            <AddMovieForm onSubmit={handleSubmit} onCancel={() => setDisplayOptionType('button')}></AddMovieForm>
        }
      </Card>
    </div>
  );
}
