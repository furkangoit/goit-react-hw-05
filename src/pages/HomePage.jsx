import React from "react";
import { useData } from "../DataContext";
import Head from "../components/Head";
import axios from "axios";
import { useEffect } from "react";
import MovieList from "../components/MovieList";

const HomePage = () => {
    const APIKey = "0f552bbb3a7946c71382d336324ac39a";
    const { movie, setMovie, setError, setIsLoading } = useData();

    useEffect(() => {
        const trendingMovies = async () => {
            setIsLoading(true);
            try {
                const { data } = await axios.get(
                    "https://api.themoviedb.org/3/trending/movie/day",
                    {
                        params: {
                            api_key: APIKey,
                        },
                    }
                );

                setMovie(data.results);
            } catch (error) {
                setError("Trend filmler yüklenemedi.");
            } finally {
                setIsLoading(false);
            }
        };
        trendingMovies();
    }, []);
    return (
        <div>
            <h2>Trending today</h2>
            <MovieList movies={movie} />
        </div>
    );
};

export default HomePage;