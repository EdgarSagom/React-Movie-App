import React from 'react';
import { useParams } from 'react-router-dom';

import './Details.css';

import useFetch from '../../hooks/useFetch';
import DetailsBanner from './detailsBanner/DetailsBanner';
import DetailsBannerTv from './detailsBanner/DetailsBannerTv';
import Cast from '../../components/castCrew/Cast';
import Crew from '../../components/castCrew/Crew';
import VideosSection from './videosSection/VideosSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';

import DetailsBannerPerson from './detailsBanner/DetailsBannerPerson';
import ImagesPerson from './imagesPerson/ImagesPerson';
import KnownFor from './knownFor/KnownFor';
import ScrollButton from '../../components/scrollButton/ScrollButton';

export default function Details() {
    const { mediaType, id} = useParams();
    const {data, loading} = useFetch(`/${mediaType}/${id}/videos`);
    const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);

    return (
        <div>
            {mediaType === 'movie' && (
                <>
                    <ScrollButton />
                    <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
                    <Cast data={credits?.cast} loading={creditsLoading} mediaType={mediaType} />
                    <Crew data={credits?.crew} loading={creditsLoading} mediaType={mediaType} />
                    <VideosSection data={data} loading={loading} mediaType={mediaType} />
                    <Similar mediaType={mediaType} id={id} />
                    <Recommendation mediaType={mediaType} id={id} />
                </>
            )}

            {mediaType === 'tv' && (
                <>
                    <ScrollButton />
                    <DetailsBannerTv video={data?.results?.[0]} crew={credits?.crew} />
                    <Cast data={credits?.cast} loading={creditsLoading} mediaType={mediaType} />
                    <Crew data={credits?.crew} loading={creditsLoading} mediaType={mediaType} />
                    <VideosSection data={data} loading={loading} mediaType={mediaType} />
                    <Similar mediaType={mediaType} id={id} />
                    <Recommendation mediaType={mediaType} id={id} />
                </>
            )}

            {mediaType === 'person' && (
                <>
                    <ScrollButton />
                    <DetailsBannerPerson />
                    <ImagesPerson id={id} loading={loading} mediaType={mediaType} />
                    <KnownFor data={credits} loading={creditsLoading} mediaType={mediaType} />
                </>
            )}

        </div>
    );
};
