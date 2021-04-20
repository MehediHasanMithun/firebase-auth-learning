import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import SignOut from '../SignOut/SignOut';

const Inventory = () => {
    const [user,setUser] = useContext(UserContext);
    return (
        <div className="login">
            <h1>WelCome, Mr.{user.name}</h1>
            <h2>Your Email:{user.email}</h2>
            <img style={{width:"50%"}} src={user.photo} alt=""/>
            <br/><br/>
            <SignOut></SignOut>
            <h1>This is Inventory</h1>
        </div>
    );
};

export default Inventory;