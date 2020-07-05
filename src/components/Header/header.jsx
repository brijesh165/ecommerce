import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './header.scss';
import Logo from '../../assets/logo.png';

// Action
import {signOutUserStart} from './../../store/Actions/user.actions.';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})


const Header = (props) => {
    const dispatch = useDispatch();
    const {currentUser} = useSelector(mapState);

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return(
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="SimpleTut LOGO" />                    
                    </Link>
                </div>

                <div className="callToActions">
                    {currentUser && (
                        <ul>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link><span onClick={() => signOut()}>Logout</span></Link></li>
                        </ul>
                    )}

                    {!currentUser && (
                    <ul>
                        <li><Link to="/registration">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                    )}
                </div>
            </div>               
        </header>
    );
}

Header.defaultProps = {
    currentUser: null
}

export default Header;
