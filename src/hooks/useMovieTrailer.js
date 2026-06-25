import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";

const useMovietrailer = (movieId) => {
    const dispatch = useDispatch();

    const getMovieVideos = async () => {
        try {
            const data = await fetch(
                "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US",
                API_OPTIONS
            );
            const json = await data.json();

            const filterData = json.results.filter((video) => video.type === "Trailer");
            const trailer = filterData.length ? filterData[0] : json.results[0];

            // Explicitly dispatch undefined if no trailer found
            // This triggers the fallback in MainContainer
            dispatch(addTrailerVideo(trailer || undefined));
        } catch (err) {
            console.error("Trailer fetch error:", err);
            dispatch(addTrailerVideo(undefined));
        }
    };

    useEffect(() => {
    if (movieId) getMovieVideos(); // remove the dispatch(addTrailerVideo(null)) line
}, [movieId]);
};

export default useMovietrailer;