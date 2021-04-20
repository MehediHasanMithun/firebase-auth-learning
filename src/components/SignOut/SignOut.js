import React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";

const SignOut = () => {
    const [user,setUser] = useContext(UserContext);
    let history = useHistory();
    const handleSignOut =()=>{
        firebase.auth().signOut().then(() => {
            const newUser = {
                isSignIn: false,
                name: "",
                email: "",
                photo: "",
                error:""
                };
                setUser(newUser);
                history.push("/login");
          }).catch((error) => {
            alert(error);
          });
    }
    return (
        <div>
            <button onClick={handleSignOut}>SIGNOUT</button>
        </div>
    );
};

export default SignOut;