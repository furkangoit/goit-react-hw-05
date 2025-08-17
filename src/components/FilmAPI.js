import axios from "axios";

const APIKey = "0f552bbb3a7946c71382d336324ac39a";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const fetchMovies = async (search) => {
    try {
        const response = await axios.get("/search/movie", {
            params: {
                api_key: APIKey,
                query: search,
            },
        });
        return response.data.results;
    } catch (err) {
        console.err("API'den veri alınırken bir hata oluştu.", err);
        return [];
    }
};