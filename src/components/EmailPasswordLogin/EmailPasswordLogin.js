import React from 'react';
import './EmailPasswordLogin.css';
import { MdEmail, MdLock } from "react-icons/md";
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory } from "react-router-dom";

const EmailPasswordLogin = () => {
    let history = useHistory();
    const [user,setUser] = useContext(UserContext);
    const [signInInfo, setSignInInfo] = useState({
        email: "",
        password: ""
    });
    
    const handleFieldValue = (e) => {
        if (e.target.name === "email") {
            const newUserInfo = { ...signInInfo };
            newUserInfo.email = e.target.value;
            setSignInInfo(newUserInfo);
        }
        if (e.target.name === "password") {
            const newUserInfo = { ...signInInfo };
            newUserInfo.password = e.target.value;
            setSignInInfo(newUserInfo);
        }
    }
    const handleSignIn = (e) => {
        firebase.auth().signInWithEmailAndPassword(signInInfo.email, signInInfo.password)
            .then((userCredential) => {
                var User = userCredential.user;
                 const { displayName, email, photoURL } = User;
                const IsSignIn={
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    error:""
                }
                setUser(IsSignIn);
                
                history.push("/");
                // console.log(user);
            })
            .catch((error) => {
                var errorMessage = error.message;
                var errorCode = error.code;
                const IsSignIn = {
                    isSignIn: false,
                    name: "",
                    email: "",
                    photo: "",
                    error: errorMessage
                }
                setUser(IsSignIn);
                //console.log("error happened",errorMessage,errorCode);
            });
        e.preventDefault();
    }
    return (
        <>
            <form onSubmit={handleSignIn}>
                <br />
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><MdEmail size="25px" /></span>
                    <input onBlur={handleFieldValue} name="email" type="email" className="form-control" placeholder="Type your email" aria-label="email" aria-describedby="basic-addon1" required />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon2"><MdLock size="25px" /></span>
                    <input onBlur={handleFieldValue} name="password" type="password" className="form-control" placeholder="Type your password" aria-label="password" aria-describedby="basic-addon2" required />
                </div>
                <input type="submit" className="form-control" value="LOGIN" style={{ background: "purple", border: "none", color: "white" }} />
            </form>
        </>
    );
};

export default EmailPasswordLogin;