import React from 'react';
import { useSelector } from 'react-redux';
import userProfile from './../UserProfile/UserProfile';
import './style.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const VerticalNav = ({children}) => {
    const { currentUser } = useSelector(mapState);

    const configUserProfile = {
        currentUser
    }

    return (
        <div className="verticalNav">
            <userProfile {...configUserProfile} />

            <div className="menu">
                {children}
            </div>
        </div>
    )
}

export default VerticalNav;