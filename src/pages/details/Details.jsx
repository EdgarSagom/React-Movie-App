import React from 'react';
import { useParams } from 'react-router-dom';

import './Details.css';

import useFetch from '../../hooks/useFetch';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './castCrew/Cast';
import Crew from './castCrew/Crew';
import VideosSection from './videosSection/VideosSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';
import KnownFor from './knownFor/KnownFor';
import ImagesPerson from './imagesPerson/imagesPerson';

export default function Details() {
    const { mediaType, id} = useParams();
    const {data, loading} = useFetch(`/${mediaType}/${id}/videos`);
    const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);

    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditsLoading} mediaType={mediaType} />
            <Crew data={credits?.crew} loading={creditsLoading} mediaType={mediaType} />
            <VideosSection data={data} loading={loading} mediaType={mediaType} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />

            <ImagesPerson id={id} loading={loading} mediaType={mediaType} />
            <KnownFor data={credits} loading={creditsLoading} mediaType={mediaType} />
        </div>
    );
};
