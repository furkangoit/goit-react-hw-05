import React, { useEffect } from "react";
import { useData } from "../DataContext";
import axios from "axios";
import MovieList from "../components/MovieList";

const HomePage = () => {
    const APIKey = "0f552bbb3a7946c71382d336324ac39a";
    const {
        trendingMovies,
        setTrendingMovies,
        isLoading,
        setIsLoading,
        error,
        setError
    } = useData();

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const { data } = await axios.get(
                    "https://api.themoviedb.org/3/trending/movie/day",
                    {
                        params: {
                            api_key: APIKey,
                        },
                    }
                );
                setTrendingMovies(data.results || []);
            } catch (error) {
                setError("Trending movies could not be loaded.");
                console.error("Trending movies error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrendingMovies();
    }, [setTrendingMovies, setIsLoading, setError, APIKey]);

    if (isLoading) {
        return (
            <div>
                <h2>Trending Today</h2>
                <p>Loading trending movies...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2>Trending Today</h2>
                <p style={{ color: 'red' }}>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Trending Today</h2>
            <MovieList movies={trendingMovies} />
        </div>
    );
};

export default HomePage;