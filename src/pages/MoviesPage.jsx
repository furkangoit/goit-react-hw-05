import React, { lazy, Suspense } from "react";
import { useData } from "../DataContext";
import axios from "axios";
import Head from "../components/Head";

// Lazy load MovieList component
const MovieList = lazy(() => import("../components/MovieList"));

const MoviesPage = () => {
    const APIKey = "0f552bbb3a7946c71382d336324ac39a";

    const {
        movie,
        setMovie,
        setError,
        isLoading,
        setIsLoading,
        search,
        setSearch,
        error,
    } = useData();

    const handleSearch = async () => {
        if (!search.trim()) return;
        setIsLoading(true);

        try {
            const { data } = await axios.get(
                "https://api.themoviedb.org/3/search/movie",
                {
                    params: {
                        api_key: APIKey,
                        query: search,
                    },
                }
            );
            setMovie(data.results);
        } catch (error) {
            setError("Movies could not be uploaded!");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (value) => {
        setSearch(value);
    };

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Head
                searchValue={search}
                onClick={handleSearch}
                onChange={handleChange}
            />

            <Suspense fallback={<div className="loading">Loading movies...</div>}>
                <MovieList movies={movie} />
            </Suspense>
        </div>
    );
};

export default MoviesPage;