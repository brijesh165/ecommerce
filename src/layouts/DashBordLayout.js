import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from './../store/Actions/user.actions.';

import Header from './../components/Header/header';
import VarticalNav from './../components/VerticalNav/VerticalNav';
import Footer from './../components/Footer/Footer';

const DashBoardLayout = props => {
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(signOutUserStart());
    }

    return (
        <div className="dashboardLayout">
            <Header {...props} />
            <div className="controlPanel">
                <div className="sidebar">
                    <VarticalNav>
                        <li>
                            <Link to="/dashboard">
                                Home
                            </Link>
                        </li>
                        <li>
                            <span className="signOut" onClick={() => signOut()}>Sign Out</span>
                        </li>
                    </VarticalNav>
                </div>
                <div className="content">
                    {props.children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DashBoardLayout;