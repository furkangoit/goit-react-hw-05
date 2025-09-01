import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieReviews = () => {
    const Api_Token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjU1MmJiYjNhNzk0NmM3MTM4MmQzMzYzMjRhYzM5YSIsIm5iZiI6MTc0MzkzMzUxMi42MTY5OTk5LCJzdWIiOiI2N2YyNTA0ODBmMjBmOWM0NWNhZDQ2MGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.e_6f3rULWsfEpLZTx14_vgGcHG03xA-zVwyUfM3rtyU";

    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setIsLoading(true);
                setError(null);
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
                setError("Reviews cannot be displayed!");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReviews();
    }, [movieId]);

    if (isLoading) {
        return <p>Loading reviews...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h3>Reviews</h3>
            {reviews.length === 0 ? (
                <p>No reviews available for this movie.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {reviews.map((review) => (
                        <li key={review.id} style={{
                            marginBottom: '20px',
                            padding: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '8px'
                        }}>
                            <h4>Review by {review.author}</h4>
                            <p style={{
                                maxHeight: '200px',
                                overflow: 'auto',
                                lineHeight: '1.5'
                            }}>
                                {review.content}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieReviews;