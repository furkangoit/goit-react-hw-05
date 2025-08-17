import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieCast = () => {
    const Api_Token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjU1MmJiYjNhNzk0NmM3MTM4MmQzMzYzMjRhYzM5YSIsIm5iZiI6MTc0MzkzMzUxMi42MTY5OTk5LCJzdWIiOiI2N2YyNTA0ODBmMjBmOWM0NWNhZDQ2MGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.e_6f3rULWsfEpLZTx14_vgGcHG03xA-zVwyUfM3rtyU";

    const { movieId } = useParams();
    const [cast, setCast, setError] = useState([]);

    useEffect(() => {
        const fetchCast = async () => {
            try {
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
                setError(error);
            }
        };
        fetchCast();
    }, [movieId]);
    return (
        <div>
            <ul>
                {cast.map((actor) => (
                    <li key={actor.cast_id}>
                        {actor.name} as {actor.character}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieCast;