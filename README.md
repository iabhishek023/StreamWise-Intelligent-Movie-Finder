# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


#StreamWise
 create react app
 -configured tailwind css
 -header
 -routing of app
 -Login Form
 -SignUp form
 -form validation
 -useref hook
 -Firebase Setup
 -Deploying The App to production
 -Create Sign Up User Account
 -Implemented sign out
 -Update Profile 
 =Movie Description
 -BugFix:sign up user displayName and profile picture update
-BugFix:if the user is not logged in redirect / browse to login page and vice-versa
 -Unsubscribed to the onAuthStateChanged callBack
 -Add hardcoded values to constant file.
 -Register TMDB API and create an app app and an access token
 -Get data from TMDB now playing mibye list API
 -Custom Hook for Playing Movies
 -create a movieslice
 -planning for maincontainer and secondary container
 -update store with movies
 -update store with trailer video data
 -embedded the ytvideo and make it autoplay  and mute
 -tailwind classes to main container that looked amazing
 -Build Secondary Component
 -Build Movie List
 --build movie card
 -tmdb image cdn
 -usepopular movies hook
 -gpt search feature
 -Gpt search page
 -gpt search bar
 -Multi-Language Feature In Our App
 -get open ai api key
 -get search api call
 -fetched getMoviesSuggestions from TmDB
 created getSlice added data
 -Memoization
 -env file
 -Made the Site Responsive

 #Features
 -Login
   -sign in /sign up form

-Browse(after authentication)
 -header
 -main movie
   -Trailer in bg
   -Title and description
   -movie Suggestion
      -movielist

-Streamwise Gpt 
  -Search Bar 
  -Movie Suggestions 



  ---------------------------------------------------------------------------------------------------------


  # 🎬 StreamWise — Intelligent Movie Finder

> Netflix-inspired AI-powered movie discovery platform. Find your perfect movie using natural language search.

![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?style=flat-square&logo=redux)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?style=flat-square&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-teal?style=flat-square&logo=tailwindcss)
![TMDB](https://img.shields.io/badge/TMDB-API-teal?style=flat-square)
![Groq](https://img.shields.io/badge/Groq-LLaMA%203.3-purple?style=flat-square)

---

## 📌 Overview

StreamWise is a full-stack Netflix-clone with AI-powered movie search. Users can browse trending, top-rated, popular, and upcoming movies, or use the **AI Search** feature to find movies using natural language queries like:

> *"A 1990s horror movie with a young female lead"*
> *"Feel-good romantic comedies set in Paris"*
> *"Action movies with a strong plot twist"*

The AI returns personalized recommendations with reasons why each movie matches your query.

---

## 🎥 Features

- 🔐 **Firebase Authentication** — Sign up / Sign in / Sign out
- 🎬 **Netflix-style UI** — Hero trailer, movie rows, hover effects
- 🤖 **AI Movie Search** — Natural language search powered by Groq LLaMA 3.3 70B
- 🎯 **Personalized Recommendations** — Each result comes with a "Why this?" explanation
- 🌍 **Multi-language Support** — English, Hindi, Spanish
- 📱 **Responsive Design** — Works on mobile and desktop
- 🎞️ **Auto-playing Trailers** — YouTube trailers in hero section
- 🗃️ **Search History** — Saved to PostgreSQL via Java backend

---

## 🏗️ Architecture
┌─────────────────────────────────────────────────┐

│                StreamWise Frontend               │

│                  React + Redux                   │

└──────────┬──────────────────────┬───────────────┘

│                      │

▼                      ▼

┌──────────────────┐   ┌─────────────────────────┐

│  Firebase Auth   │   │   Java Spring Boot       │

│  (Google Auth)   │   │   Backend (port 8081)    │

└──────────────────┘   └──────────┬──────────────┘

│

┌───────────┼───────────┐

▼           ▼           ▼

┌─────────┐ ┌──────┐ ┌──────────┐

│ Groq AI │ │ TMDB │ │PostgreSQL│

│LLaMA 3.3│ │ API  │ │    DB    │

└─────────┘ └──────┘ └──────────┘

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| UI Framework | React 18 |
| State Management | Redux Toolkit |
| Styling | Tailwind CSS |
| Authentication | Firebase Auth |
| Movie Data | TMDB API |
| AI Search | Groq — LLaMA 3.3 70B (via Java backend) |
| Trailers | YouTube Embed API |
| Backend | Java Spring Boot (separate repo) |

---

## 📁 Project Structure
src/

├── components/

│   ├── Login.js                  # Sign in / Sign up page

│   ├── Header.js                 # Navigation with StreamWise logo

│   ├── Browse.js                 # Main browse page

│   ├── MainContainer.js          # Hero section with trailer

│   ├── VideoContainer.js         # YouTube trailer embed

│   ├── VideoTitle.js             # Movie title + Play/More Info buttons

│   ├── SecondaryContainer.js     # Movie rows section

│   ├── MovieList.js              # Horizontal scrollable movie row

│   ├── MovieCard.js              # Individual movie poster card

│   ├── GptSearch.js              # AI search page wrapper

│   ├── GptSearchBar.js           # AI search input + logic

│   └── GptMovieSuggestions.js    # AI recommendation cards

├── hooks/

│   ├── useNowPlayingMovies.js    # Fetch now playing from TMDB

│   ├── usePopularMovies.js       # Fetch popular from TMDB

│   ├── useTopRatedMovies.js      # Fetch top rated from TMDB

│   ├── useUpcomingMovies.js      # Fetch upcoming from TMDB

│   └── useMovieTrailer.js        # Fetch trailer from TMDB

└── utils/

├── firebase.js               # Firebase config

├── constants.js              # API options, CDN URLs

├── languageConstants.js      # Multi-language strings

├── appStore.js               # Redux store

├── moviesSlice.js            # Movies Redux slice

├── gptSlice.js               # AI search Redux slice

├── userSlice.js              # User Redux slice

└── configSlice.js            # Language config slice

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- Firebase account → [firebase.google.com](https://firebase.google.com)
- TMDB API key → [themoviedb.org](https://www.themoviedb.org/settings/api)
- Java backend running → [streamwise-backend](https://github.com/iabhishek023/streamwise-backend)

### 1. Clone the repository
```bash
git clone https://github.com/iabhishek023/StreamWise-Intelligent-Movie-Finder.git
cd StreamWise-Intelligent-Movie-Finder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file in project root
```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4. Configure `src/utils/constants.js`
```js
export const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer YOUR_TMDB_BEARER_TOKEN"
    },
};
```

### 5. Start the backend
Make sure the Java Spring Boot backend is running:
http://localhost:8081/api/movies/health
👉 [streamwise-backend setup guide](https://github.com/iabhishek023/streamwise-backend)

### 6. Start the frontend
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🖥️ Screenshots

### Browse Page — Netflix-style UI
- Auto-playing movie trailer as hero
- Play and More Info buttons
- Horizontally scrollable movie rows

### AI Search Page
- Natural language search input
- Personalized movie cards with:
  - Movie poster from TMDB
  - Genre, Year, Rating
  - "Why this?" explanation from AI
  - Mood tag (Thrilling, Dark, Fun, etc.)
  - Cast highlight

---

## 🔑 Key Implementation Details

### AI Search Flow
User types query

↓

POST http://localhost:8081/api/movies/search

↓

Java backend calls Groq LLaMA 3.3 70B

↓

Returns structured JSON (title, year, genre, reason, cast, mood)

↓

React fetches TMDB poster + rating for each movie

↓

Renders personalized recommendation cards

### Redux Store Structure
```js
{
  user: { uid, email, displayName },
  movies: {
    nowPlayingMovies: [...],
    popularMovies: [...],
    topRatedMovies: [...],
    upcomingMovies: [...],
    trailerVideo: {...}
  },
  gpt: {
    showGptSearch: false,
    gptRecommendations: [...],
    movieNames: [...],
    movieResults: [...],
    loading: false,
    error: null
  },
  config: { lang: "en" }
}
```

---

## 🔮 Roadmap

- [ ] Deploy frontend to Firebase Hosting
- [ ] Connect to deployed backend (AWS/Render)
- [ ] User watchlist feature
- [ ] Movie ratings and reviews
- [ ] Netflix-style ML recommendation engine
- [ ] PWA support for mobile

---

## 🔗 Backend Repository

The Java Spring Boot backend that powers AI search:
👉 [streamwise-backend](https://github.com/iabhishek023/streamwise-backend)

---

## 👨‍💻 Author

**Abhishek**
- GitHub: [@iabhishek023](https://github.com/iabhishek023)
- LinkedIn: https://www.linkedin.com/in/abhishek-puri-29bba4256/

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
