import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from './../UserProfile/UserProfile';
import './VerticalNav.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const VerticalNav = ({children}) => {
    console.log(children);
    const { currentUser } = useSelector(mapState);

    const configUserProfile = {
        currentUser
    }

    return (
        <div className="vertcalNav">
            <UserProfile {...configUserProfile} />

            <div className="menu">
                {children}
            </div>
        </div>
    )
}

export default VerticalNav;