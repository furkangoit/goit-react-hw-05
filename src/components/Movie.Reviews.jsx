import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const MovieReviews = () => {
    const Api_Token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjU1MmJiYjNhNzk0NmM3MTM4MmQzMzYzMjRhYzM5YSIsIm5iZiI6MTc0MzkzMzUxMi42MTY5OTk5LCJzdWIiOiI2N2YyNTA0ODBmMjBmOWM0NWNhZDQ2MGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.e_6f3rULWsfEpLZTx14_vgGcHG03xA-zVwyUfM3rtyU";
    const { movieId } = useParams();
    const [reviews, setReviews, setError, error] = useState([]);
    if (error) {
        return <p>Reviews cannot display!</p>
    }
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
                    {
                        headers: {
                            Authorization: `Bearer ${Api_Token}`,
                            accept: "application/json",
                        },
                    }
                );
                setReviews(res.data.results);
            } catch (error) {
                setError(error)
            }
        };
        fetchReviews();
    }, [movieId]);

    return (
        <div>
            <ul>
                {reviews.length === 0 ? (
                    <p>"No reviews can display!</p>
                ) : (
                    reviews.map((review) => <li key={review.id}>{review.content}</li>)
                )}
            </ul>
        </div>
    );
};

export default MovieReviews;