import React from "react";
import { useEffect } from "react";
import { useData } from "../DataContext";
import { useParams, Link, Outlet } from "react-router-dom";
import axios from "axios";

const Api_Token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjU1MmJiYjNhNzk0NmM3MTM4MmQzMzYzMjRhYzM5YSIsIm5iZiI6MTc0MzkzMzUxMi42MTY5OTk5LCJzdWIiOiI2N2YyNTA0ODBmMjBmOWM0NWNhZDQ2MGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.e_6f3rULWsfEpLZTx14_vgGcHG03xA-zVwyUfM3rtyU";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const { movie, setMovie, isLoading, setIsLoading, error, setError } =
        useData();

    if (error) {
        <p>{error}</p>;
    }
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setIsLoading(true);
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
                setError(error);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    if (isLoading) {
        return <h2>Please wait...</h2>;
    }

    if (!movie) {
        return <h4>Movie cannot find!</h4>;
    }

    return (
        <div>
            <div>
                <div>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                </div>

                <h1>{movie.title}</h1>
                <p>User score:{Math.round(movie.vote_average * 10)}%</p>
                <h2>Overview</h2>
                <p>{movie.overview}</p>
                <h2>Genres</h2>
                {movie.genres && (
                    <p>{movie.genres.map((genre) => genre.name).join(",")}</p>
                )}

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
        </div>
    );
};

export default MovieDetailsPage;