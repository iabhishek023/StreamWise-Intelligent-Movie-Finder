import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
    if (!posterPath) return null;

    return (
        <div className="w-32 md:w-44 flex-shrink-0 pr-2 cursor-pointer transform hover:scale-110 transition-transform duration-200 hover:z-10">
            <img
                alt="Movie Card"
                className="w-full rounded-md shadow-lg"
                src={IMG_CDN_URL + posterPath}
            />
        </div>
    );
};

export default MovieCard;