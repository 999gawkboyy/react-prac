import './navigator.css';
import {React, useEffect} from 'react';
import {auth} from './firebase';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {useUser} from './UserContext'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const Nav = () => {
    
    const {userData} = useUser();

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        console.log(auth)
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {   
                console.error('Login failed: ', error);
        };
    }

    const handleLogout = () => {
        return signOut(auth)
    }
    

    return (
        <nav>
            <div><Link to="/">Home</Link></div>
            <div><Link to="/counter">Counter</Link></div>
            <div><Link to="/chat">Chat</Link></div>
            <div>{
                !userData ? 
                <button onClick={handleLogin}>login</button> : 
                <div>
                    nickname: {userData.displayName}&nbsp;
                    <button onClick={handleLogout}>logout</button>
                </div>
                }
            </div> 
        </nav>

    );
}

export default Nav;