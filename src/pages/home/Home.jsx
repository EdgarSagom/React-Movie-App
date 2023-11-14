import React from 'react';

import './Home.css';

import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';

export default function Home() {
    return (
        <div className='homePage'>
            <HeroBanner />
            <Trending />
            <Popular />
        </div>
    )
}
