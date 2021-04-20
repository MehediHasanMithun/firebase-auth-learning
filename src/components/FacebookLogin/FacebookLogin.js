import React from 'react';
import './FacebookLogin.css';
import { SiFacebook } from "react-icons/si";
import firebase from "firebase/app";
import "firebase/auth";
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory } from 'react-router';

const FacebookLogin = () => {
    const [user,setUser] = useContext(UserContext);
    let history = useHistory();

    const provider = new firebase.auth.FacebookAuthProvider();
    const handleFacebookLogin=()=>{
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
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
           // console.log(user);
        })
        .catch((error) => {
            var errorMessage = error.message;
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
            <button onClick={handleFacebookLogin} className="logo-btn btn btn-outline-secondary">
                <SiFacebook size="30px" />
                <span className="logo-name">Facebook</span>
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
export default FacebookLogin;