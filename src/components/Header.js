import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

    const handleSignOut = () => {
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
        <div className="absolute flex items-center w-full px-8 py-2 bg-gradient-to-b from-black z-50">
            {/* Logo — left side */}
            <img
                className="w-44 h-14"
                src={LOGO}
                alt="logo"
            />

            {/* Right side controls — pushed to far right with ml-auto */}
            {user && (
                <div className="flex items-center ml-auto gap-2">
                    
                    {/* Language selector — only visible on GPT search page */}
                    {showGptSearch && (
                        <select
                            className="p-2 bg-gray-900 text-white rounded-lg"
                            onChange={handleLanguageChange}
                        >
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option key={lang.identifier} value={lang.identifier}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* GPT Search / HomePage toggle button */}
                    <button
                        className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 font-bold rounded-xl transition-colors"
                        onClick={handleGptSearchClick}
                    >
                        {showGptSearch ? "HomePage" : "GPT Search"}
                    </button>

                    {/* Avatar */}
                    <img
                        className="w-10 h-10 rounded"
                        src="https://occ-0-4346-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXYofKdCJceEP7pdxcEZ9wt80GsxEyXIbnG_QM8znksNz3JexvRbDLr0_AcNKr2SJtT-MLr1eCOA-e7xlDHsx4Jmmsi5HL8.png?r=1d4"
                        alt="avatar"
                    />

                    {/* Sign Out */}
                    <button
                        onClick={handleSignOut}
                        className="bg-gray-200 hover:bg-gray-300 text-black font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;