import React from 'react';
import './GoogleLogin.css';
import { FcGoogle } from "react-icons/fc";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './../../firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}




const GoogleLogin = () => {
   const [user,setUser] = useContext(UserContext);
   
    let history = useHistory();
    const provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                const { displayName, email, photoURL } = user;
                const IsSignIn = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(IsSignIn);
                history.push("/");
                //console.log(user.displayName);
            }).catch((error) => {
                const errorMessage = error.message;
                const IsSignIn = {
                    isSignIn: false,
                    name: "",
                    email: "",
                    photo: "",
                    error: errorMessage
                }
                 setUser(IsSignIn);
            });
    }

    return (
        <>
            <button onClick={handleGoogleSignIn} className="logo-btn btn btn-outline-secondary">
                <FcGoogle size="30px" />
                <span className="logo-name">Google</span>
            </button>
            {/* {user.isSignIn && 
            <div>
                <h1>{user.name}</h1>
                <h2>{user.email}</h2>
                <img src={user.photo} alt="" style={{width:"50%"}}/>
            </div>} */}
        </>
    );
};

export default GoogleLogin;