import React from 'react';

import './Home.css';

import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';
import ScrollButton from '../../components/scrollButton/ScrollButton';

export default function Home() {
    return (
        <div className='homePage'>
            <ScrollButton />
            <HeroBanner />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    )
}
