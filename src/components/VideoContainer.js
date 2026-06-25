import { useSelector } from "react-redux";
import useMovietrailer from "../hooks/useMovieTrailer";

const VideoContainer = ({ movieId }) => {
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
    useMovietrailer(movieId);

    return (
        <div className="relative w-screen overflow-hidden" style={{ aspectRatio: "16/9" }}>
            {trailerVideo && trailerVideo.key ? (
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&enablejsapi=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            ) : (
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <p className="text-white">Loading trailer...</p>
                </div>
            )}
        </div>
    );
};

export default VideoContainer;