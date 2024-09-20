import './navigator.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <div><Link to="/">Home</Link></div>
            <div><Link to="/counter">Counter</Link></div>
            <div><Link to="/chat">Chat</Link></div>
        </nav>
    );
}

export default Nav;