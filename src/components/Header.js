import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

    const handleSignOut = () => {
        // Clear JWT token from localStorage
        localStorage.removeItem("streamwise_token");

        signOut(auth)
            .then(() => {})
            .catch(() => navigate("/error"));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, []);

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    };

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };

    return (
        <div className="absolute flex items-center w-full px-8 py-3 bg-gradient-to-b from-black z-50">

            {/* StreamWise Logo */}
            <div
                className="flex items-baseline gap-1 cursor-pointer"
                onClick={() => navigate("/browse")}
            >
                <span className="text-3xl font-extrabold tracking-tight text-red-500">
                    Stream
                </span>
                <span className="text-3xl font-extrabold tracking-tight text-white">
                    Wise
                </span>
                <span className="ml-1 text-xs text-gray-400 font-medium hidden md:block">
                    AI · Movies
                </span>
            </div>

            {/* Right side controls */}
            {user && (
                <div className="flex items-center ml-auto gap-3">

                    {/* Language selector — only on GPT search page */}
                    {showGptSearch && (
                        <select
                            className="p-2 bg-gray-900 text-white rounded-lg text-sm"
                            onChange={handleLanguageChange}
                        >
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option key={lang.identifier} value={lang.identifier}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* AI Search / HomePage toggle */}
                    <button
                        className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 font-bold rounded-xl transition-colors text-sm"
                        onClick={handleGptSearchClick}
                    >
                        {showGptSearch ? "🏠 HomePage" : "🤖 AI Search"}
                    </button>

                    {/* Avatar */}
                    <img
                        className="w-9 h-9 rounded-md"
                        src="https://occ-0-4346-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXYofKdCJceEP7pdxcEZ9wt80GsxEyXIbnG_QM8znksNz3JexvRbDLr0_AcNKr2SJtT-MLr1eCOA-e7xlDHsx4Jmmsi5HL8.png?r=1d4"
                        alt="avatar"
                    />

                    {/* Sign Out */}
                    <button
                        onClick={handleSignOut}
                        className="bg-gray-200 hover:bg-gray-300 text-black font-bold px-4 py-2 rounded-xl transition-colors text-sm"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;