import React from 'react';
import './LogIn.css';
import { FaUserCircle } from "react-icons/fa";
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import FacebookLogin from '../FacebookLogin/FacebookLogin';
import EmailPasswordLogin from '../EmailPasswordLogin/EmailPasswordLogin';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';


const LogIn = () => {
    const [user] = useContext(UserContext);
    return (
        <div>
            <div className="login">
                <h1 className="text-size">Welcome</h1>
                <h5>To Your Account</h5>
                <FaUserCircle size='2cm' color='purple' />
                <EmailPasswordLogin></EmailPasswordLogin>
                <br /><br />
                <p>Or login with</p>
                <GoogleLogin></GoogleLogin>
                <FacebookLogin></FacebookLogin>
                <br /><br /><br />
                <p>Don't have an Account?
                    <Link to="/signup" className="btn btn-outline-secondary" style={{ border: "none", fontWeight: "600" }}>Sign Up</Link>
                </p>
                {
                    user.isSignIn ? <p style={{color:"green"}}>Mr.{user.name} Sign In successfully</p> : <p style={{color:"red"}}>{user.error}</p>
                }
            </div>
        </div>
    );
};

export default LogIn;