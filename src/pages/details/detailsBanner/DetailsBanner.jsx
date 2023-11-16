import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import './DetailsBanner.css';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import useFetch from '../../../hooks/useFetch';
import Genres from '../../../components/genres/Genres';
import CircleRating from '../../../components/circleRating/CircleRating';
import Img from '../../../components/lazyLoadImage/Img';
import PosterFallBack from '../../../assets/no-poster.png';
import PlayBtn from '../PlayBtn';
import VideoPopup from '../../../components/videoPopup/VideoPopup';

export default function DetailsBanner({ video, crew }) {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id} = useParams();
    const {data, loading} = useFetch(`/${mediaType}/${id}`);

    const {url} = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f.job === 'Director');
    const writer = crew?.filter((f) => f.job === 'Screenplay' || f.job === 'Story' || f.job === 'Writer');

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={url.backdrop + data?.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img className='posterImg' src={url.backdrop + data.poster_path} />
                                        ) : (
                                            <Img className='posterImg' src={PosterFallBack} />
                                        )}

                                        {data?.networks?.length > 0 && (
                                            <div className='networks'>
                                                <span className='text'>
                                                    Networks:{' '}
                                                </span>
                                                <span className='networksLogos'>
                                                    {data?.networks?.map((d, i) => (
                                                        <span key={i}>
                                                            <Img className='logo' src={url.backdrop + d.logo_path}/>
                                                            {data?.networks.length - 1 !== i && ' '}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="right">
                                        <div className="title">
                                            {`${data.name || data.title} (${dayjs(data?.release_date).format('YYYY')})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>

                                        <Genres data={_genres}/>

                                        <div className="row">
                                            <CircleRating rating={data.vote_average.toFixed(1)}/>
                                            <div className="playBtn" 
                                                onClick={() => {
                                                    setShow(true)
                                                    setVideoId(video.key)
                                                }}
                                            >
                                                <PlayBtn />
                                                <span className="text">
                                                    Watch Trailer
                                                </span>
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>

                                        <div className="info">
                                            {data.status && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Status:{' '}
                                                    </span>
                                                    <span className='text'>
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Release Date:{' '}
                                                    </span>
                                                    <span className='text'>
                                                        {data.release_date}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Runtime:{' '}
                                                    </span>
                                                    <span className='text'>
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                            
                                            {data.number_of_seasons && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Seasons:{' '}
                                                    </span>
                                                    <span className='text'>
                                                        {data.number_of_seasons}
                                                    </span>
                                                </div>
                                            )}
                                            {data.number_of_episodes && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Episodes:{' '}
                                                    </span>
                                                    <span className='text'>
                                                        {data.number_of_episodes}
                                                    </span>
                                                </div>
                                            )}
                                            {data.episode_run_time && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Episode Run Time:{' '}
                                                    </span>
                                                    <span className='text'>
                                                        {toHoursAndMinutes(data.episode_run_time)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className='info'>
                                            {data.spoken_languages && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Language:{' '}
                                                    </span>
                                                    <span className='text'>
                                                        {data.spoken_languages?.map((d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {data.spoken_languages.length - 1 !== i && ', '}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )}
                                            {data.budget && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Budget:{' '}
                                                    </span>
                                                    <span className='text'>
                                                        ${data.budget ? data.budget.toLocaleString('en') : ' -'}
                                                    </span>
                                                </div>
                                            )}
                                            {data.revenue && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Revenue:{' '}
                                                    </span>
                                                    <span className='text'>
                                                        ${data.revenue ? data.revenue.toLocaleString('en') : ' -'}
                                                    </span>
                                                </div>
                                            )}

                                            {data.first_air_date && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        First Air Date:{' '}
                                                    </span>
                                                    <span className='text'>
                                                        {data.first_air_date}
                                                    </span>
                                                </div>
                                            )}
                                            {data.last_air_date && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Last Air Date:{' '}
                                                    </span>
                                                    <span className='text'>
                                                        {data.last_air_date}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {director?.length > 0 && (
                                            <div className='info'>
                                                <span className='text bold'>
                                                    Director:{' '}
                                                </span>
                                                <span className='text'>
                                                    {director?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {director.length - 1 !== i && ', '}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className='info'>
                                                <span className='text bold'>
                                                    Writer:{' '}
                                                </span>
                                                <span className='text'>
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length - 1 !== i && ', '}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {data?.created_by?.length > 0 && (
                                            <div className='info'>
                                                <span className='text bold'>
                                                    Creator:{' '}
                                                </span>
                                                <span className='text'>
                                                    {data?.created_by?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {data?.created_by.length - 1 !== i && ', '}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {data?.production_companies?.length > 0 && (
                                            <div className='info'>
                                                <span className='text bold'>
                                                    Production Companies:{' '}
                                                </span>
                                                <span className='text'>
                                                    {data?.production_companies?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {data?.production_companies.length - 1 !== i && ', '}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {data?.production_countries?.length > 0 && (
                                            <div className='info'>
                                                <span className='text bold'>
                                                    Production Countries:{' '}
                                                </span>
                                                <span className='text'>
                                                    {data?.production_countries?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {data?.production_countries.length - 1 !== i && ', '}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </ContentWrapper>
                        </React.Fragment>
                    )}
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
