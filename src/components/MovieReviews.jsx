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
                setReviews(res.data.results || []);
            } catch (error) {
                setError("Reviews cannot be displayed!");
                console.error("Fetch reviews error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (movieId) {
            fetchReviews();
        }
    }, [movieId]);

    if (isLoading) {
        return <p>Loading reviews...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
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
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <h4 style={{ marginTop: 0, color: '#333' }}>
                                Review by {review.author}
                            </h4>
                            {review.author_details?.rating && (
                                <p style={{
                                    margin: '5px 0 10px 0',
                                    color: '#f39c12',
                                    fontWeight: 'bold'
                                }}>
                                    Rating: {review.author_details.rating}/10 ⭐
                                </p>
                            )}
                            <div style={{
                                maxHeight: '200px',
                                overflow: 'auto',
                                lineHeight: '1.5',
                                color: '#555'
                            }}>
                                {review.content}
                            </div>
                            {review.created_at && (
                                <p style={{
                                    margin: '10px 0 0 0',
                                    fontSize: '0.9em',
                                    color: '#888'
                                }}>
                                    Posted: {new Date(review.created_at).toLocaleDateString()}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieReviews;