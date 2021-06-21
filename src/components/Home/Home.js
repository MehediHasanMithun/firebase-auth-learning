import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import SignOut from '../SignOut/SignOut';
import './Home.css';

const Home = () => {
    const [user,setUser] = useContext(UserContext);
    
    return (
        <div className="login">
            <h1>WelCome, Mr.{user.name}</h1>
            <h2>Your Email:{user.email}</h2>
            <img style={{width:"50%"}} src={user.photo} alt=""/>
            <br/><br/>
            <h1>This is Home</h1>
            <SignOut></SignOut>
            <Link to="/inventory">Inventory</Link>
        </div>
    );
};
export default Home;