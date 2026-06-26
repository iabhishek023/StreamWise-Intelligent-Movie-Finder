import { useSelector } from "react-redux";
import useMovietrailer from "../hooks/useMovieTrailer";

const VideoContainer = ({ movieId }) => {
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
    useMovietrailer(movieId);

    return (
        <div className="absolute inset-0 overflow-hidden bg-black">
            {/* Iframe slightly oversized to hide YouTube UI edges */}
            <div className="absolute -top-10 -bottom-10 -left-2 -right-2">
                {trailerVideo?.key ? (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1`}
                        title="Movie Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                    />
                ) : (
                    <div className="w-full h-full bg-black" />
                )}
            </div>

            {/* Top fade — hides YouTube title */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black to-transparent z-10" />

            {/* Bottom fade — blends into movie list */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent z-10" />

            {/* Right fade — blends right edge */}
            <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10" />

            {/* Left fade — for symmetry */}
            <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10" />

            {/* Block YouTube logo bottom-right corner */}
            <div className="absolute bottom-0 right-0 w-36 h-20 bg-black z-20" />
        </div>
    );
};

export default VideoContainer;