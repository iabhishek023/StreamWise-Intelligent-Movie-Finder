import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG, USER_AVATAR } from "../utils/constants";
import { loginUser, registerUser } from "../utils/backendApi";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
        setErrorMessage(null);
    };

    const handleButtonClick = async () => {
        // Validate inputs
        const msg = checkValidData(email.current.value, password.current.value);
        setErrorMessage(msg);
        if (msg) return;

        setLoading(true);

        if (!isSignInForm) {
            // ── SIGN UP ──
            try {
                // Step 1: Firebase sign up
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                );

                // Step 2: Update Firebase profile
                await updateProfile(userCredential.user, {
                    displayName: name.current.value,
                    photoURL: USER_AVATAR,
                });

                // Step 3: Update Redux store
                const { uid, email: userEmail, displayName } = auth.currentUser;
                dispatch(addUser({ uid, email: userEmail, displayName }));

                // Step 4: Register in Java backend — get JWT
                const backendResponse = await registerUser(
                    name.current.value,
                    email.current.value,
                    password.current.value
                );

                if (!backendResponse.success) {
                    console.warn("Backend registration issue:", backendResponse.message);
                    // Don't block user — Firebase auth succeeded
                }

            } catch (error) {
                setErrorMessage(error.message);
            }

        } else {
            // ── SIGN IN ──
            try {
                // Step 1: Firebase sign in
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                );

                // Step 2: Login in Java backend — get JWT
                const backendResponse = await loginUser(
                    email.current.value,
                    password.current.value
                );

                if (!backendResponse.success) {
                    console.warn("Backend login issue:", backendResponse.message);
                    // Don't block user — Firebase auth succeeded
                }

            } catch (error) {
                setErrorMessage("Invalid email or password.");
            }
        }

        setLoading(false);
    };

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    className="h-screen object-cover w-screen"
                    src={BG}
                    alt="bg"
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-9/12 md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
            >
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>

                {!isSignInForm && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className="p-4 my-4 w-full bg-gray-700 text-white rounded"
                    />
                )}

                <input
                    ref={email}
                    type="text"
                    placeholder="E-mail Address"
                    className="p-4 my-4 w-full bg-gray-700 text-white rounded"
                />

                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-4 my-4 w-full bg-gray-700 text-white rounded"
                />

                {errorMessage && (
                    <p className="text-red-500 font-bold p-2">{errorMessage}</p>
                )}

                <button
                    onClick={handleButtonClick}
                    disabled={loading}
                    className="p-2 my-2 rounded-xl bg-red-700 w-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {isSignInForm ? "Signing In..." : "Signing Up..."}
                        </span>
                    ) : (
                        isSignInForm ? "Sign In" : "Sign Up"
                    )}
                </button>

                <p
                    className="p-4 cursor-pointer text-gray-400 hover:text-white transition-colors"
                    onClick={toggleSignInForm}
                >
                    {isSignInForm
                        ? "New to StreamWise? Sign Up Now"
                        : "Already a user? Sign In"}
                </p>
            </form>
        </div>
    );
};

export default Login;