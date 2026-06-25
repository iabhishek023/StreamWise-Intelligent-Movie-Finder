import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);

    if (!movies.nowPlayingMovies) return null;

    return (
        <div className="bg-black -mt-16 relative z-20">
            <div className="pl-4 pb-8">
                <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
                <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
                <MovieList title={"Popular"} movies={movies.popularMovies} />
                <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
            </div>
        </div>
    );
};

export default SecondaryContainer;