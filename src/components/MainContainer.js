import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);

    if (!movies) return null;

    // Try movies at index 1, 2, 3 instead of 0 since index 0 often has no trailer
    const mainMovie = movies[2] || movies[1] || movies[0];
    const { original_title, overview, id } = mainMovie;

    return (
        <div className="relative w-full h-screen bg-black">
            <div className="absolute inset-0">
                <VideoContainer movieId={id} />
            </div>
            <VideoTitle title={original_title} overview={overview} />
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent z-10" />
        </div>
    );
};

export default MainContainer;