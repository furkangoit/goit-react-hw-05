import React from "react";
import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
    const location = useLocation();

    if (!Array.isArray(movies)) {
        return <p>We couldn't upload movies</p>;
    }

    if (movies.length === 0) {
        return null; // Don't show anything if no movies
    }

    return (
        <div>
            <ul className={css.movielist}>
                {movies.map((movie) => {
                    return (
                        <li key={movie.id} className={css.movieItem}>
                            <Link
                                to={`/movieList/${movie.id}`}
                                state={{ from: location }}
                                className={css.movieLink}
                            >
                                <div className={css.movieCard}>
                                    {movie.poster_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                            className={css.moviePoster}
                                        />
                                    )}
                                    <div className={css.movieInfo}>
                                        <h3 className={css.movieTitle}>{movie.title}</h3>
                                        {movie.release_date && (
                                            <p className={css.releaseDate}>
                                                ({new Date(movie.release_date).getFullYear()})
                                            </p>
                                        )}
                                        {movie.vote_average > 0 && (
                                            <p className={css.rating}>
                                                ⭐ {movie.vote_average.toFixed(1)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MovieList;