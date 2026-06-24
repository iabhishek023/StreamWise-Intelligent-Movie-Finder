// import { createSlice } from "@reduxjs/toolkit";

// // const gptSlice=createSlice({
// //     name:'gpt',
// //     initialState:{
// //         showGptSearch:false,
// //     },
// //     reducers:{
// //         toggleGptSearchView:(state)=>{
// //             state.showGptSearch=!state.showGptSearch;
// //         },
// //     },

// // });



// // export const {toggleGptSearchView}=gptSlice.actions;

// const gptSlice = createSlice({
//     name: 'gpt',
//     initialState: {
//         showGptSearch: false,
//         movieNames: null, // To store the movie names (or search query)
//         movieResults: null, // To store the movie results from TMDB
//     },
//     reducers: {
//         toggleGptSearchView: (state) => {
//             state.showGptSearch = !state.showGptSearch;
//         },
//         // Action to add GPT movie results
//         addGptMovieResult: (state, action) => {
//             const { movieNames, movieResults } = action.payload;
//             state.movieNames = movieNames;
//             state.movieResults = movieResults;
//         },
//     },
// });

// export const { toggleGptSearchView, addGptMovieResult } = gptSlice.actions;
// export default gptSlice.reducer;

// src/utils/gptSlice.js
import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,   // array of TMDB result arrays
    movieNames: null,     // array of movie name strings
    gptRecommendations: null, // NEW: rich GPT data [{title, reason, genre, year, castHighlight}]
    loading: false,
    error: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    // NEW reducer for rich recommendations
    addGptRecommendations: (state, action) => {
      state.gptRecommendations = action.payload;
    },
    setGptLoading: (state, action) => {
      state.loading = action.payload;
    },
    setGptError: (state, action) => {
      state.error = action.payload;
    },
    clearGptResults: (state) => {
      state.movieResults = null;
      state.movieNames = null;
      state.gptRecommendations = null;
      state.error = null;
    },
  },
});

export const {
  toggleGptSearchView,
  addGptMovieResult,
  addGptRecommendations,
  setGptLoading,
  setGptError,
  clearGptResults,
} = gptSlice.actions;

export default gptSlice.reducer;