import React from 'react';

import './HomePage.scss';
import Directory from '../../components/Directory/Directory';

const HomePage = (props) => {
    return (
        <section className="homepage">
            <Directory />
        </section>
    );
}

export default HomePage;