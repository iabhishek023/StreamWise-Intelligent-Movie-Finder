import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import {useSelector} from "react-redux";

const Browser=()=>{
    const showGptSearch=useSelector(store=>store.gpt.showGptSearch);  //if there is any change in the state


    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    return(
        <div className="overflow-x-hidden">
            <Header/>
            {
                showGptSearch?(
                    <GptSearch/>
                ):(
                    <>
                     <MainContainer/>
                     <SecondaryContainer/>
                    </>
                )
            }
            
            {/* 
            MainContainer
               -VideoBackground
               -VideoTitle
            SecondaryContainer
                -MovieList * n
                 -Cards*n */}
        </div>
    )
}

export default Browser;