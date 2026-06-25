import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
    return (
        <div className="px-6 py-2">
            <h1 className="mx-2 text-lg md:text-2xl py-3 text-white font-semibold">
                {title}
            </h1>
            <div
                className="flex overflow-x-scroll pb-4 space-x-2"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} posterPath={movie.poster_path} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;