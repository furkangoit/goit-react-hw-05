import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzY2M2M2ZjRiYTU3NDU1Nzg4YzExYjc4NzJlOWUyNiIsIm5iZiI6MTc1NTI3MDI4Ni42OTkwMDAxLCJzdWIiOiI2ODlmNGM4ZWUxMjY3ZDg2ODI4ZGEwYTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iFymsW9pdsr8j7QBOLBP1OYPwlBGoF23QYUOHcYVSL8',
        'accept': 'application/json'
    }
});

export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export function getTrendingToday() {
    return api.get("/trending/movie/day").then((r) => r.data.results || []);
}

export function searchMovies(query, page = 1) {
    return api
        .get("/search/movie", {
            params: {
                query,
                include_adult: false,
                language: "en-US",
                page
            },
        })
        .then((r) => r.data.results || []);
}

export function getMovieDetails(movieId) {
    return api
        .get(`/movie/${movieId}`, {
            params: { language: "en-US" }
        })
        .then((r) => r.data);
}

export function getMovieCredits(movieId) {
    return api.get(`/movie/${movieId}/credits`).then((r) => r.data.cast || []);
}

export function getMovieReviews(movieId) {
    return api
        .get(`/movie/${movieId}/reviews`, {
            params: { language: "en-US" }
        })
        .then((r) => r.data.results || []);
}