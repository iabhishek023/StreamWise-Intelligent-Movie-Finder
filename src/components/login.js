import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG, USER_AVATAR } from "../utils/constants";


const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
  
    const dispatch=useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name=useRef(null);



    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    const handleButtonClick = () => {
        // console.log(email.current.value);
        // console.log(password.current.value);
        const msg =
            // isSignInForm?
            checkValidData(email.current.value, password.current.value);
        //checkValidData(email.current.value,password.current.value,name.current.value);
        setErrorMessage(msg);

        if (msg) return;

        if (!isSignInForm) {
            //Sign Up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, 
                        photoURL: USER_AVATAR
                      }).then(() => {
                        // Profile updated!
                        const {uid,email,displayName} = auth.currentUser;
                        dispatch(addUser({uid:uid,email:email,displayName:displayName}))
                       
                        // ...
                      }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message)
                        // ...
                      });
                    //console.log(user)
                   
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " " + errorMessage)
                    // ..
                });
        }
        else {
            //Sign in
            signInWithEmailAndPassword(auth,  email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                  
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }


    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img className="h-screen object-cover w-screen" src={BG}
                    alt="bg" />
            </div>
            <form
               
               onSubmit={(e) => e.preventDefault()} className="w-9/12 md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
                <h1
                    className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm
                    &&
                    (<input

                        type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700 text-bg-dark-100" />)}

                <input
                    ref={email}
                    type="text"
                    placeholder="E-mail Address"
                    className="p-4 my-4 w-full bg-gray-700 text-bg-dark-100" />

                <input
                    ref={password}
                    type="text"
                    placeholder="Password"
                    className="p-4 my-4 w-full bg-gray-700" />

                <p className="text-red-500 font-bold p-2 ">{errorMessage}</p>

                <button
                    onClick={handleButtonClick}
                    className="p-2 my-2 rounded-xl bg-red-700 w-full"
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>


                <p
                    className="p-4 cursor-pointer"
                    onClick={toggleSignInForm}>
                    {isSignInForm ? "New to StreamWise? Sign In Later" : "Already A User Sign Up Now "}
                </p>

            </form>

        </div>
    )
}

export default Login;