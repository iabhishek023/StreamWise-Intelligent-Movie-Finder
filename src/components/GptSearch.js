// import GptMovieSuggestions from "./GptMovieSuggestions";
// import GptSearchBar from "./GptSearchBar";
// import { BG } from "../utils/constants";

// const GptSearch=()=>{
//     return(
//         <div>
//             <div className="fixed -z-10 ">
//                 <img className="h-screen w-screen object-cover" src={BG}
//                     alt="bg" />
//             </div>
//             <div className="pt-[30%] md:p-0">
//                 <GptSearchBar/>
//                 <GptMovieSuggestions/>
//             </div>
//             {/* GptSearch Bar
//             Gpt Movie Suggestions */}
            
//         </div>
//     )
// }

// export default GptSearch;
// src/components/GptSearch.js
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG } from "../utils/constants"; // your background image

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10 inset-0">
        <img src={BG} alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;