// // import { useSelector } from "react-redux";
// // import lang from "../utils/languageConstants";

// // const GptSearchBar=()=>{
// //     const handleSearchSubmit = (e) => {
// //         e.preventDefault();
// //     };

// //     const langKey=useSelector((store)=>store.config.lang);
// //     return(
// //         <div className="pt-[35%] md:pt-[9%] flex justify-center flex-col md:flex-row">
// //             <form className="w-full md:w-1/2  bg-black grid grid-cols-12" onSubmit={handleSearchSubmit}>
// //                 <input type="text" className="p-3 m-4 col-span-9" placeholder={lang[langKey].gptSearchPlaceholder}/> 
// //                 <button type="submit" className="py-2 m-3 px-4 bg-red-600 text-white col-span-3 rounded-lg">{lang[langKey].search} </button>
// //             </form>
// //         </div>
// //     )
// // }
// // export default GptSearchBar;

// // src/components/GptSearchBar.js
// import { useDispatch, useSelector } from "react-redux";
// import { useRef, useState } from "react";
// import { geminiModel } from "../utils/gemini";
// import { API_OPTIONS } from "../utils/constants";
// import lang from "../utils/languageConstants";
// import {
//   addGptMovieResult,
//   addGptRecommendations,
//   setGptLoading,
//   setGptError,
//   clearGptResults,
// } from "../utils/gptSlice";

// const GptSearchBar = () => {
//   const dispatch = useDispatch();
//   const langKey = useSelector((store) => store.config.lang);
//   const loading = useSelector((store) => store.gpt.loading);
//   const searchText = useRef(null);
//   const [inputError, setInputError] = useState("");

//   // Step 1: search TMDB for a single movie name → returns results array
//   const searchMovieTMDB = async (movieTitle) => {
//     const data = await fetch(
//       `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieTitle)}&include_adult=false&language=en-US&page=1`,
//       API_OPTIONS
//     );
//     const json = await data.json();
//     return json.results;
//   };

//   const handleGptSearchClick = async () => {
//     const query = searchText.current?.value?.trim();

//     if (!query) {
//       setInputError("Please enter what kind of movie you're looking for.");
//       return;
//     }
//     setInputError("");
//     dispatch(clearGptResults());
//     dispatch(setGptLoading(true));

//     try {
//       // Step 2: Send a rich structured prompt to GPT
//       const gptQuery = `
// You are an expert movie recommendation engine.
// The user is looking for: "${query}"

// Return a JSON array of exactly 5 movie recommendations.
// Each object must have these fields:
// - title: (string) exact movie title
// - year: (number) release year
// - genre: (string) primary genre
// - reason: (string) one sentence explaining why this matches the user's request
// - castHighlight: (string) one notable actor/actress in this film
// - moodTag: (string) one word mood e.g. Thrilling, Heartwarming, Dark, Fun

// Return ONLY the raw JSON array. No markdown, no explanation, no backticks.
// Example format:
// [{"title":"Inception","year":2010,"genre":"Sci-Fi","reason":"A mind-bending thriller perfect for viewers who love puzzles.","castHighlight":"Leonardo DiCaprio","moodTag":"Thrilling"}]
//       `.trim();

//       const gptResult = await openai.chat.completions.create({
//         messages: [{ role: "user", content: gptQuery }],
//         model: "gpt-3.5-turbo",
//         temperature: 0.7,
//       });

//       const rawContent = gptResult.choices?.[0]?.message?.content;

//       // Step 3: Parse GPT JSON response safely
//       let recommendations = [];
//       try {
//         recommendations = JSON.parse(rawContent);
//       } catch (parseErr) {
//         // fallback: try to extract JSON array from response
//         const match = rawContent.match(/\[[\s\S]*\]/);
//         if (match) {
//           recommendations = JSON.parse(match[0]);
//         } else {
//           throw new Error("GPT returned an unparseable response.");
//         }
//       }

//       // Step 4: Store rich GPT recommendations in Redux
//       dispatch(addGptRecommendations(recommendations));

//       // Step 5: Fetch TMDB data for each movie title in parallel
//       const movieTitles = recommendations.map((r) => r.title);
//       const tmdbPromises = movieTitles.map((title) => searchMovieTMDB(title));
//       const tmdbResults = await Promise.all(tmdbPromises);

//       // Step 6: Store TMDB results (for poster/rating data)
//       dispatch(
//         addGptMovieResult({
//           movieNames: movieTitles,
//           movieResults: tmdbResults,
//         })
//       );
//     } catch (err) {
//             console.error("GPT Search Error:", err);
//             console.error("Error message:", err.message);
//             console.error("Error status:", err.status);
//             console.error("Error type:", err.constructor.name);
//             dispatch(setGptError("Something went wrong. Please try again."));

//     } finally {
//       dispatch(setGptLoading(false));
//     }
//   };

//   return (
//     <div className="pt-[9%] flex flex-col items-center gap-2">
//       <form
//         className="w-full max-w-2xl bg-black bg-opacity-80 grid grid-cols-12 rounded-xl overflow-hidden shadow-lg"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <input
//           ref={searchText}
//           type="text"
//           className="p-4 m-3 col-span-9 rounded-lg text-black text-sm focus:outline-none"
//           placeholder={lang[langKey]?.gptSearchPlaceholder || "E.g. A 1990s horror with young cast..."}
//         />
//         <button
//           className="py-2 m-3 px-4 bg-red-600 hover:bg-red-700 text-white col-span-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           onClick={handleGptSearchClick}
//           disabled={loading}
//         >
//           {loading ? "Searching..." : lang[langKey]?.search || "Search"}
//         </button>
//       </form>

//       {inputError && (
//         <p className="text-red-400 text-sm mt-1">{inputError}</p>
//       )}

//       {loading && (
//         <div className="flex items-center gap-2 text-white text-sm mt-2">
//           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//           Finding personalized recommendations...
//         </div>
//       )}
//     </div>
//   );
// };

// export default GptSearchBar;

// src/components/GptSearchBar.js
// src/components/GptSearchBar.js
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import Groq from "groq-sdk";
import { API_OPTIONS } from "../utils/constants";
import lang from "../utils/languageConstants";
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

  const getGroqClient = () => {
    const apiKey = process.env.REACT_APP_GROQ_KEY;
    if (!apiKey) throw new Error("Groq API key not found. Add REACT_APP_GROQ_KEY to your .env file.");
    return new Groq({
      apiKey,
      dangerouslyAllowBrowser: true,
    });
  };

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

  const callGroqAPI = async (query) => {
    const groq = getGroqClient();

    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `You are an expert movie recommendation engine.
The user is looking for: "${query}"

Return a JSON array of exactly 5 movie recommendations.
Each object must have these exact fields:
- title: (string) exact movie title
- year: (number) release year
- genre: (string) primary genre
- reason: (string) one sentence explaining why this matches the user's request
- castHighlight: (string) one notable actor or actress in this film
- moodTag: (string) one word mood e.g. Thrilling, Heartwarming, Dark, Fun, Romantic, Intense, Mysterious, Inspiring

Return ONLY the raw JSON array. No markdown, no backticks, no explanation.
Start your response with [ and end with ]`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return result.choices[0]?.message?.content;
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
      // Step 1: Call Groq API
      const rawContent = await callGroqAPI(query);

      if (!rawContent) throw new Error("Empty response from Groq.");

      // Step 2: Parse JSON safely
      let recommendations = [];
      try {
        const cleaned = rawContent.replace(/```json|```/g, "").trim();
        recommendations = JSON.parse(cleaned);
      } catch {
        const match = rawContent.match(/\[[\s\S]*\]/);
        if (match) {
          recommendations = JSON.parse(match[0]);
        } else {
          throw new Error("Could not parse response as JSON.");
        }
      }

      // Step 3: Validate response
      if (!Array.isArray(recommendations) || recommendations.length === 0) {
        throw new Error("Received empty recommendations.");
      }

      // Step 4: Store rich recommendations in Redux
      dispatch(addGptRecommendations(recommendations));

      // Step 5: Fetch TMDB posters + ratings in parallel
      const movieTitles = recommendations.map((r) => r.title);
      const tmdbResults = await Promise.all(
        movieTitles.map((title) => searchMovieTMDB(title))
      );

      // Step 6: Store TMDB results in Redux
      dispatch(
        addGptMovieResult({
          movieNames: movieTitles,
          movieResults: tmdbResults,
        })
      );
    } catch (err) {
      console.error("GPT Search Error:", err);

      if (err.message?.includes("API key")) {
        dispatch(setGptError("API key missing. Add REACT_APP_GROQ_KEY to your .env file."));
      } else if (err.message?.includes("429") || err.message?.includes("quota") || err.message?.includes("rate limit")) {
        dispatch(setGptError("Rate limit hit. Please wait a moment and try again."));
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