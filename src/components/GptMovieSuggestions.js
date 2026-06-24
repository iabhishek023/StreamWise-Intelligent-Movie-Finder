// const GptMovieSuggestions=()=>{
//     return(
//         <div></div>
//     )
// }
// export default GptMovieSuggestions;
// src/components/GptMovieSuggestions.js
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants"; // your TMDB image base URL

// Mood tag color mapping
const moodColors = {
  Thrilling: "bg-red-700",
  Dark: "bg-gray-700",
  Heartwarming: "bg-pink-600",
  Fun: "bg-yellow-500 text-black",
  Romantic: "bg-rose-500",
  Intense: "bg-orange-600",
  Mysterious: "bg-purple-700",
  Inspiring: "bg-green-600",
};

const MovieRecommendationCard = ({ gptData, tmdbMovies }) => {
  // Pick the best TMDB match (first result)
  const tmdb = tmdbMovies?.[0];

  const posterUrl = tmdb?.poster_path
    ? `${IMG_CDN_URL}${tmdb.poster_path}`
    : null;

  const rating = tmdb?.vote_average?.toFixed(1);
  const moodClass = moodColors[gptData.moodTag] || "bg-blue-600";

  return (
    <div className="flex gap-4 bg-gray-900 bg-opacity-90 rounded-xl overflow-hidden shadow-lg hover:scale-[1.01] transition-transform duration-200 border border-gray-700">
      {/* Poster */}
      <div className="flex-shrink-0 w-28">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={gptData.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-xs text-center p-2">
            No Poster
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center py-4 pr-4 gap-2 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-white font-bold text-lg">{gptData.title}</h3>
          <span className="text-gray-400 text-sm">({gptData.year})</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${moodClass}`}>
            {gptData.moodTag}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm flex-wrap">
          <span className="text-gray-300">🎬 {gptData.genre}</span>
          <span className="text-gray-300">🎭 {gptData.castHighlight}</span>
          {rating && (
            <span className="text-yellow-400 font-semibold">⭐ {rating}/10</span>
          )}
        </div>

        {/* The personalization killer feature */}
        <p className="text-gray-400 text-sm italic border-l-2 border-red-500 pl-3">
          "{gptData.reason}"
        </p>
      </div>
    </div>
  );
};

const GptMovieSuggestions = () => {
  const { movieResults, gptRecommendations, loading, error } = useSelector(
    (store) => store.gpt
  );

  if (loading) return null; // GptSearchBar handles the loading UI

  if (error) {
    return (
      <div className="m-6 p-4 bg-red-900 bg-opacity-80 text-white rounded-xl text-center">
        ⚠️ {error}
      </div>
    );
  }

  if (!gptRecommendations) return null;

  return (
    <div className="mx-4 my-6 p-5 bg-black bg-opacity-85 rounded-2xl">
      <h2 className="text-white text-2xl font-bold mb-1">
        🎯 Personalized Picks For You
      </h2>
      <p className="text-gray-400 text-sm mb-5">
        Based on your search · {gptRecommendations.length} recommendations
      </p>

      <div className="flex flex-col gap-4">
        {gptRecommendations.map((rec, index) => (
          <MovieRecommendationCard
            key={rec.title + index}
            gptData={rec}
            tmdbMovies={movieResults?.[index] || []}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;