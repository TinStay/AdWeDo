import React,{ useContext, useState } from 'react';
import {Link} from "react-router-dom";
import {Button, Modal} from 'react-bootstrap';
import { AuthContext } from '../Auth/Auth';
import app from '../../base';
import LoginForm from '../Auth/LoginForm';
import SignupForm from '../Auth/SignupForm';


const Navbar = () =>{

    const [show, setShow] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { currentUser } = useContext(AuthContext);
    // console.log(currentUser)

    const openSignUpModal = () =>{
        setIsSignup(true);
        handleShow();
    }

    const openLoginModal = () =>{
        setIsSignup(false);
        handleShow();
    }

    let navbarItems = (
        <ul className="navbar-nav">
            <li className="nav-item ">
                <Link to='/' className="nav-link">Home </Link>
            </li>
            <li className="nav-item">
                <Link to='/' className="nav-link">How does it work?</Link>
            </li>
            <li className="nav-item">
                <a onClick={openLoginModal} className="nav-link">Login</a>
            </li>
            <li className="nav-item">
                <a onClick={openSignUpModal} className="nav-link">Sign up</a>
            </li>
        </ul>
    );

    if(currentUser){
        navbarItems = (
            <ul className="navbar-nav">
                <li className="nav-item ">
                    <Link to='/' className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to='/' className="nav-link">How does it work?</Link>
                </li>
                <li className="nav-item">
                    <Link to='/profile' className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                    <a onClick={() => app.auth().signOut()} className="nav-link" >Log out</a>
                </li>
            </ul>
        )
    }

    const changeToSignup = e =>{
        e.preventDefault();

        setIsSignup(true);
    }

    const changeToLogin = e =>{
        e.preventDefault();

        setIsSignup(false);
    }

    let authType = <LoginForm show={show} handleClose={handleClose} changeToSignup={changeToSignup}/>;

    if(isSignup){
        authType = <SignupForm show={show} handleClose={handleClose} changeToLogin={changeToLogin}/>;
    }

    return(
        <div className="sticky-navbar">
            <nav className="navbar navbar-expand-lg navbar-light ">
            <a className="navbar-brand">SocialAds</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {navbarItems}
            </div>
        </nav>

        {authType}

        </div>
    )
}


export default Navbar;