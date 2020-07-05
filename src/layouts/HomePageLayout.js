import React from 'react';

import Header from '../components/Header/header';
import Footer from '../components/Footer/Footer';

const HomePageLayout = (props) => {
    return (
        <div className="fullHeight">
            <Header {...props}/>
            {props.children}
            <Footer />
        </div>
    );
};

export default HomePageLayout;