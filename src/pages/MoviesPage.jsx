import React, { lazy, Suspense, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useData } from "../DataContext";
import axios from "axios";
import Head from "../components/Head";

// Lazy load MovieList component
const MovieList = lazy(() => import("../components/MovieList"));

const MoviesPage = () => {
    const APIKey = "0f552bbb3a7946c71382d336324ac39a";
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        movie,
        setMovie,
        setError,
        isLoading,
        setIsLoading,
        error,
    } = useData();

    // Get query from URL parameters
    const query = searchParams.get("query") || "";

    // Effect to perform search when query parameter changes
    useEffect(() => {
        if (!query.trim()) {
            setMovie([]); // Clear movies if no query
            return;
        }

        const searchMovies = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const { data } = await axios.get(
                    "https://api.themoviedb.org/3/search/movie",
                    {
                        params: {
                            api_key: APIKey,
                            query: query.trim(),
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

        searchMovies();
    }, [query, setMovie, setError, setIsLoading, APIKey]);

    // Handle search form submission
    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            // Clear search params if search term is empty
            setSearchParams({});
            return;
        }

        // Update URL with new search query
        setSearchParams({ query: searchTerm.trim() });
    };

    // Handle input change (for controlled input)
    const handleChange = (value) => {
        // Don't update URL on every keystroke, just update local state
        // The actual search will happen on form submission
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
                searchValue={query}
                onClick={(searchTerm) => handleSearch(searchTerm)}
                onChange={handleChange}
            />

            {query && (
                <p>Search results for: "<strong>{query}</strong>"</p>
            )}

            <Suspense fallback={<div className="loading">Loading movies...</div>}>
                <MovieList movies={movie} />
            </Suspense>

            {query && movie.length === 0 && !isLoading && (
                <p>No movies found for your search.</p>
            )}
        </div>
    );
};

export default MoviesPage;