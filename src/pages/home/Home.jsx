import React from 'react';

import './Home.css';

import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';

export default function Home() {
    return (
        <div className='homePage'>
            <HeroBanner />
            <Trending />
        </div>
    )
}
