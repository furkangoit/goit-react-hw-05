import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieCast = () => {
    const Api_Token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjU1MmJiYjNhNzk0NmM3MTM4MmQzMzYzMjRhYzM5YSIsIm5iZiI6MTc0MzkzMzUxMi42MTY5OTk5LCJzdWIiOiI2N2YyNTA0ODBmMjBmOWM0NWNhZDQ2MGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.e_6f3rULWsfEpLZTx14_vgGcHG03xA-zVwyUfM3rtyU";

    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCast = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                    {
                        headers: {
                            Authorization: `Bearer ${Api_Token}`,
                            accept: "application/json",
                        },
                    }
                );
                setCast(response.data.cast);
            } catch (error) {
                setError("Cast information cannot be displayed!");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCast();
    }, [movieId]);

    if (isLoading) {
        return <p>Loading cast...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h3>Cast</h3>
            {cast.length === 0 ? (
                <p>No cast information available for this movie.</p>
            ) : (
                <ul style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '20px',
                    listStyle: 'none',
                    padding: 0
                }}>
                    {cast.slice(0, 20).map((actor) => (
                        <li key={actor.cast_id} style={{
                            textAlign: 'center',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '8px'
                        }}>
                            {actor.profile_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                    alt={actor.name}
                                    style={{
                                        width: '100px',
                                        height: '150px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        marginBottom: '10px'
                                    }}
                                />
                            )}
                            <p><strong>{actor.name}</strong></p>
                            <p>as {actor.character}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieCast;