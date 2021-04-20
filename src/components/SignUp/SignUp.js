import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { Link,useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const SignUp = () => {
    const [user,setUser] = useContext(UserContext);
    
    let history = useHistory();
    const [UserInfo, setUserInfo] = useState({
        isSignUp: false,
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });
    const [checkPassword, setCheckPassword] = useState({
        password: "",
        rePassword: ""
    });

    const updateUserInfo = () => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: UserInfo.name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then( res=> {
            console.log("Updated",res);
        }).catch(error =>{
            console.log("error from update",error.message);
        });
    }

    const handleSubmit = (e) => {
        firebase.auth().createUserWithEmailAndPassword(UserInfo.email, UserInfo.password)
            .then(userCredential => {
                var user = userCredential.user;
                const newUserInfo = { ...UserInfo };
                newUserInfo.isSignUp = true;
                newUserInfo.success = true;
                setUserInfo(newUserInfo);
               // console.log(user);
                updateUserInfo();
                const newUser = {
                    isSignIn: false,
                    name: "",
                    email: "",
                    photo: "",
                    error:""
                    };
                    setUser(newUser);
                    
                history.push("/login");
            })
            .catch(error => {
                var errorMessage = error.message;
                const newUserInfo = { ...UserInfo };
                newUserInfo.isSignUp = false;
                newUserInfo.success = false;
                newUserInfo.error = errorMessage;
                setUserInfo(newUserInfo);
               // console.log(errorCode, errorMessage);
            });
        e.preventDefault();
    }
    // const [passwordError,setPasswordError]=useState({
    //     marginLeft:"400px",
    //     visibility:"hidden",
    //     color:"red"
    // })
    // const matchPassword=()=>{
    //     console.log("match password called");
    //     if(checkPassword.password!==checkPassword.rePassword){
    //         const newPassError={...passwordError};
    //          newPassError.visibility = "visible";
    //         setPasswordError(newPassError);
    //      }
    //      else{
    //       const newPassError={...passwordError};
    //       newPassError.visibility = "hidden";
    //       setPasswordError(newPassError);
    //       console.log(checkPassword.password,"matched");
    //      }
    // }
    const handleField = (e) => {
        let validField;
        if (e.target.name === "name") {
            const newUserInfo = { ...UserInfo };
            newUserInfo.name = e.target.value;
            setUserInfo(newUserInfo);
        }
        if (e.target.name === "email") {
            validField = /\S+@\S+\.\S+/.test(e.target.value);
            if (validField) {
                const newUserInfo = { ...UserInfo };
                newUserInfo.email = e.target.value;
                setUserInfo(newUserInfo);
            }
            else {
                const newUserInfo = { ...UserInfo };
                newUserInfo.email = "";
                setUserInfo(newUserInfo);
            }
        }
        if (e.target.name === "password") {
            validField = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(e.target.value);
            if (validField) {
                const newCheckPassword = { ...checkPassword };
                newCheckPassword.password = e.target.value;
                setCheckPassword(newCheckPassword);
            }

        }
        if (e.target.name === "rePassword") {
            const newCheckPassword = { ...checkPassword };
            newCheckPassword.rePassword = e.target.value;
            setCheckPassword(newCheckPassword);
        }
    }

    useEffect(() => {
        if (checkPassword.password !== "" && checkPassword.password === checkPassword.rePassword) {
            const newUserInfo = { ...UserInfo };
            newUserInfo.password = checkPassword.password;
            setUserInfo(newUserInfo);
        }
        else {
            const newUserInfo = { ...UserInfo };
            newUserInfo.password = "";
            setUserInfo(newUserInfo);
        }
    }, [checkPassword]);

    return (
        <div className="login">
            <h1 className="text-size">Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <br />
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Name:</span>
                    <input onBlur={handleField} name="name" type="text" className="form-control" placeholder="Type your name" aria-label="name" aria-describedby="basic-addon1" required />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email:</span>
                    <input onBlur={handleField} name="email" type="email" className="form-control" placeholder="Type your email" aria-label="email" aria-describedby="basic-addon1" required />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon2">Password:</span>
                    <input onBlur={handleField} name="password" type="password" className="form-control" placeholder="Type your password" aria-label="password" aria-describedby="basic-addon2" required />
                    <small style={{ marginLeft: "25px" }}>*Minimum eight characters, at least one letter, one number and one special character</small>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">Confirm Password:</span>
                    <input onBlur={handleField} name="rePassword" type="password" className="form-control" placeholder="Re-type your password" aria-label="password" aria-describedby="basic-addon3" required />
                    {/* <small style={passwordError}>*Password not match</small> */}

                </div>
                <input type="submit" className="form-control" value="SIGNUP" style={{ background: "purple", border: "none", color: "white" }} />
            </form>
            <br /><br /><br />
            <p>Already have an Account?
                    <Link to="/login" className="btn btn-outline-secondary" style={{ border: "none", fontWeight: "600" }}>LOGIN</Link>
            </p>
            <br/><br/>
           
                {
                    UserInfo.isSignUp ? <p style={{color:"green"}}>Mr.{UserInfo.email} Sign Up successfully</p> : <p style={{color:"red"}}>{UserInfo.error}</p>
                }
        </div>
    );
};

export default SignUp;