import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const Api_Token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjU1MmJiYjNhNzk0NmM3MTM4MmQzMzYzMjRhYzM5YSIsIm5iZiI6MTc0MzkzMzUxMi42MTY5OTk5LCJzdWIiOiI2N2YyNTA0ODBmMjBmOWM0NWNhZDQ2MGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.e_6f3rULWsfEpLZTx14_vgGcHG03xA-zVwyUfM3rtyU";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Api_Token}`,
                            accept: "application/json",
                        },
                    }
                );
                setMovie(res.data);
            } catch (error) {
                setError("Movie details could not be loaded!");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (isLoading) {
        return <h2>Please wait...</h2>;
    }

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <button onClick={handleGoBack}>Go Back</button>
            </div>
        );
    }

    if (!movie) {
        return (
            <div>
                <h4>Movie cannot be found!</h4>
                <button onClick={handleGoBack}>Go Back</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={handleGoBack} style={{ marginBottom: '20px' }}>
                Go Back
            </button>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        style={{ width: '300px', borderRadius: '8px' }}
                    />
                </div>

                <div>
                    <h1>{movie.title}</h1>
                    <p>User score: {Math.round(movie.vote_average * 10)}%</p>

                    <h2>Overview</h2>
                    <p>{movie.overview}</p>

                    <h2>Genres</h2>
                    {movie.genres && (
                        <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
                    )}
                </div>
            </div>

            <h3>Additional Information</h3>
            <ul>
                <li>
                    <Link to="cast">Cast</Link>
                </li>
                <li>
                    <Link to="reviews">Reviews</Link>
                </li>
            </ul>

            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;