import React, { lazy, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Head from "../components/Head";

// Lazy load MovieList component
const MovieList = lazy(() => import("../components/MovieList"));

const MoviesPage = () => {
    const APIKey = "0f552bbb3a7946c71382d336324ac39a";
    const [searchParams, setSearchParams] = useSearchParams();

    // Local state for MoviesPage component - NOT using context
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get query from URL parameters
    const query = searchParams.get("query") || "";

    // Effect to perform search when query parameter changes
    useEffect(() => {
        if (!query.trim()) {
            setMovies([]); // Clear movies if no query
            setError(null);
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
                setMovies(data.results || []);
            } catch (error) {
                setError("Movies could not be uploaded!");
                setMovies([]);
                console.error("Search movies error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        searchMovies();
    }, [query, APIKey]);

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

    // Loading state
    if (isLoading) {
        return (
            <div>
                <Head
                    searchValue={query}
                    onClick={handleSearch}
                />
                <h2>Loading...</h2>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div>
                <Head
                    searchValue={query}
                    onClick={handleSearch}
                />
                <p style={{ color: 'red' }}>{error}</p>
                <p>Please try searching again.</p>
            </div>
        );
    }

    return (
        <div>
            <Head
                searchValue={query}
                onClick={handleSearch}
            />

            {query && (
                <p>Search results for: "<strong>{query}</strong>"</p>
            )}

            {/* Pass local movies state to MovieList */}
            <MovieList movies={movies} />

            {query && movies.length === 0 && !isLoading && !error && (
                <p>No movies found for your search term "{query}".</p>
            )}

            {!query && (
                <p>Enter a movie title to search for movies.</p>
            )}
        </div>
    );
};

export default MoviesPage;