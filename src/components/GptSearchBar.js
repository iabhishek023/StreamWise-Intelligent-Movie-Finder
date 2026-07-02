
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import lang from "../utils/languageConstants";
import { searchMovies } from "../utils/backendApi";
import {
  addGptMovieResult,
  addGptRecommendations,
  setGptLoading,
  setGptError,
  clearGptResults,
} from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const loading = useSelector((store) => store.gpt.loading);
  const searchText = useRef(null);
  const [inputError, setInputError] = useState("");

  const searchMovieTMDB = async (movieTitle) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieTitle)}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();
      return json.results || [];
    } catch {
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current?.value?.trim();

    if (!query) {
      setInputError("Please describe the kind of movie you're looking for.");
      return;
    }

    setInputError("");
    dispatch(clearGptResults());
    dispatch(setGptLoading(true));

    try {
      // Step 1: Call Java backend
const recommendations = await searchMovies(query);

// Step 2: Validate response
if (!Array.isArray(recommendations) || recommendations.length === 0) {
    throw new Error("Received empty recommendations.");
}

// Step 3: Store in Redux
dispatch(addGptRecommendations(recommendations));

// Step 4: Fetch TMDB
const movieTitles = recommendations.map((r) => r.title);
const tmdbResults = await Promise.all(
    movieTitles.map((title) => searchMovieTMDB(title))
);

// Step 5: Store TMDB
dispatch(addGptMovieResult({
    movieNames: movieTitles,
    movieResults: tmdbResults,
}));
    } catch (err) {
      console.error("Search Error:", err);

      if (err.message?.includes("401") || err.message?.includes("403")) {
        dispatch(setGptError("Session expired. Please sign in again."));
      } else if (err.message?.includes("Backend error")) {
        dispatch(setGptError("Backend server error. Please try again."));
      } else if (err.message?.includes("JSON") || err.message?.includes("parse")) {
        dispatch(setGptError("Failed to parse recommendations. Please try again."));
      } else {
        dispatch(setGptError("Something went wrong. Please try again."));
      }
    } finally {
      dispatch(setGptLoading(false));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleGptSearchClick();
  };

  return (
    <div className="pt-[9%] flex flex-col items-center gap-2">
      <form
        className="w-full max-w-2xl bg-black bg-opacity-80 grid grid-cols-12 rounded-xl overflow-hidden shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          onKeyDown={handleKeyDown}
          className="p-4 m-3 col-span-9 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder={
            lang[langKey]?.gptSearchPlaceholder ||
            "E.g. A 1990s horror movie with a young female lead..."
          }
        />
        <button
          className="py-2 m-3 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white col-span-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="hidden sm:inline">Searching</span>
            </span>
          ) : (
            lang[langKey]?.search || "Search"
          )}
        </button>
      </form>

      {inputError && (
        <p className="text-red-400 text-sm mt-1">{inputError}</p>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-white text-sm mt-2 bg-black bg-opacity-60 px-4 py-2 rounded-lg">
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Finding personalized recommendations for you...
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;