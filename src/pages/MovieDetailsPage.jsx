import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Api_Token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjU1MmJiYjNhNzk0NmM3MTM4MmQzMzYzMjRhYzM5YSIsIm5iZiI6MTc0MzkzMzUxMi42MTY5OTk5LCJzdWIiOiI2N2YyNTA0ODBmMjBmOWM0NWNhZDQ2MGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.e_6f3rULWsfEpLZTx14_vgGcHG03xA-zVwyUfM3rtyU";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get the previous location from state, fallback to home or movies
    const from = location.state?.from || { pathname: "/" };

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

        if (movieId) {
            fetchMovieDetails();
        }
    }, [movieId]);

    const handleGoBack = () => {
        // Navigate back to the previous location with state preserved
        navigate(from.pathname + from.search, { replace: true });
    };

    if (isLoading) {
        return (
            <div>
                <button onClick={handleGoBack} style={{ marginBottom: '20px' }}>
                    ← Go Back
                </button>
                <h2>Please wait...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <button onClick={handleGoBack} style={{ marginBottom: '20px' }}>
                    ← Go Back
                </button>
                <p>{error}</p>
            </div>
        );
    }

    if (!movie) {
        return (
            <div>
                <button onClick={handleGoBack} style={{ marginBottom: '20px' }}>
                    ← Go Back
                </button>
                <h4>Movie cannot be found!</h4>
            </div>
        );
    }

    return (
        <div>
            <button
                onClick={handleGoBack}
                style={{
                    marginBottom: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#646cff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}
            >
                ← Go Back
            </button>

            <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                <div style={{ flexShrink: 0 }}>
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                            alt={movie.title}
                            style={{
                                width: '300px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '300px',
                            height: '450px',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            color: '#666'
                        }}>
                            No Image Available
                        </div>
                    )}
                </div>

                <div style={{ flex: 1 }}>
                    <h1 style={{ marginBottom: '10px' }}>
                        {movie.title}
                        {movie.release_date && (
                            <span style={{ fontWeight: 'normal', color: '#666' }}>
                                ({new Date(movie.release_date).getFullYear()})
                            </span>
                        )}
                    </h1>

                    <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                        User score: <strong>{Math.round(movie.vote_average * 10)}%</strong>
                    </p>

                    <h2>Overview</h2>
                    <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
                        {movie.overview || "No overview available."}
                    </p>

                    <h2>Genres</h2>
                    <p style={{ marginBottom: '20px' }}>
                        {movie.genres && movie.genres.length > 0
                            ? movie.genres.map((genre) => genre.name).join(", ")
                            : "No genres available"
                        }
                    </p>

                    {movie.runtime && (
                        <p style={{ marginBottom: '10px' }}>
                            <strong>Runtime:</strong> {movie.runtime} minutes
                        </p>
                    )}
                </div>
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <h3>Additional Information</h3>
                <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: 0 }}>
                    <li>
                        <Link
                            to="cast"
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#f8f9fa',
                                textDecoration: 'none',
                                borderRadius: '4px',
                                border: '1px solid #dee2e6',
                                display: 'inline-block'
                            }}
                        >
                            Cast
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="reviews"
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#f8f9fa',
                                textDecoration: 'none',
                                borderRadius: '4px',
                                border: '1px solid #dee2e6',
                                display: 'inline-block'
                            }}
                        >
                            Reviews
                        </Link>
                    </li>
                </ul>
            </div>

            <div style={{ marginTop: '30px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default MovieDetailsPage;