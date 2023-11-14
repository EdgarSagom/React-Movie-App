import React, { useState } from 'react';

import useFetch from '../../../hooks/useFetch';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';

export default function Popular() {
    const [endpoint, setEndpoint] = useState('movie');

    const { data, loading } = useFetch(`/${endpoint}/popular`);

    const onTabChange = (tab) => {
        setEndpoint(tab === 'Movies' ? 'movie' : 'tv');
    };

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Most Popular</span>
                <SwitchTabs data={['Movies', 'Tv Series']} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
        </div>
    );
};
