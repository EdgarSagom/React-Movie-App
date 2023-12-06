import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import './DetailsBanner.css';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import useFetch from '../../../hooks/useFetch';
import { CircleRatingPeople } from '../../../components/circleRating/CircleRating';
import Img from '../../../components/lazyLoadImage/Img';
import avatar from '../../../assets/avatar.png';

export default function DetailsBannerPerson() {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const { url } = useSelector((state) => state.home);

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    <div className="backdrop-img backdrop-img-w">
                        <Img src={data?.profile_path ? url.backdrop + data?.profile_path : ''} />
                    </div>
                    <div className="opacity-layer-2"></div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data?.profile_path ? (
                                    <Img className='posterImg' src={url.backdrop + data.profile_path} />
                                ) : (
                                    <Img className='posterImg' src={avatar} />
                                )}
                            </div>

                            <div className="right">
                                <div className="title">
                                    {`${data?.name} (${data?.birthday ? dayjs(data?.birthday).format('YYYY') : ''}${data?.deathday ? ` - ${dayjs(data?.deathday).format('YYYY')}` : ''})`}
                                </div>
                                <div className="subtitle">
                                    {data?.known_for_department}
                                </div>
                                <div className="row">
                                    <CircleRatingPeople rating={data?.popularity.toFixed(0) }/>
                                </div>

                                <div className="overview">
                                    <div className="heading">
                                        Biography
                                    </div>
                                    <div className="description">
                                        {data?.biography}
                                    </div>
                                </div>

                                <div className="info">
                                    {data?.birthday && (
                                        <div className='infoItem'>
                                            <span className='text bold'>
                                                Birthday:{' '}
                                            </span>
                                            <span className='text'>
                                                {data.birthday}
                                            </span>
                                        </div>
                                    )}
                                    {data?.place_of_birth && (
                                        <div className='infoItem'>
                                            <span className='text bold'>
                                                Place of Birth:{' '}
                                            </span>
                                            <span className='text'>
                                                {data.place_of_birth}
                                            </span>
                                        </div>
                                    )}
                                    {data?.deathday && (
                                        <div className='infoItem'>
                                            <span className='text bold'>
                                                Deathday:{' '}
                                            </span>
                                            <span className='text'>
                                                {data.deathday}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {data?.homepage && (
                                    <div className="info">
                                        <div className='infoItem'>
                                            <span className='text bold'>
                                                Homepage:{' '}
                                            </span>
                                            <span className='text'>
                                                {data.homepage}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className='info'>
                                    {data?.also_known_as && (
                                        <div className='infoItem'>
                                            <span className='text bold'>
                                                Also known as:{' '}
                                            </span>
                                            <span className='text'>
                                                {data.also_known_as?.map((d, i) => (
                                                    <span key={i}>
                                                        {d}
                                                        {data.also_known_as.length - 1 !== i && ', '}
                                                    </span>
                                                ))}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </ContentWrapper>
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left" skeleton></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

