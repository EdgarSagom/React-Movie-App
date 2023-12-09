import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import './DetailsSeason.css';

import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import useFetch from '../../hooks/useFetch';
import { CircleRating } from '../../components/circleRating/CircleRating';
import Img from '../../components/lazyLoadImage/Img';
import PosterFallBack from '../../assets/no-poster-still.png';
import Cast from '../../components/castCrew/Cast';
import Crew from '../../components/castCrew/Crew';

export default function DetailsSeason() {
    const { url } = useSelector((state) => state.home);
    const { mediaType, id, item } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/season/${item}`);
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false);

    console.log(data);

    const clickHandler = (index) => {
        setDropdown((prev) => {
            return prev === index ? null : index;
        });
        console.log('clicked', index);
    };

    return (
        <div className="detailsSeason">
            {!loading ? (
                <>
                    <div className="backdrop-img">
                        <Img src={`${url.backdrop + data?.poster_path}`} />
                        <div className="opacity-layer"></div>
                    </div>
                    <ContentWrapper>
                        <div className='infoSeason'>
                            <div className='seasonName'>
                                <div className='nameData'>
                                    {`${data?.name} ${data?.air_date !== null ? `(${dayjs(data?.air_date).format('YYYY')})` : ''}`}
                                </div>
                                <div className="back" onClick={() => navigate(`/${mediaType}/${id}/seasons`)}>
                                    ↤Back to Season List
                                </div>
                            </div>

                            {data?.episodes.map((item , index) => (
                                <>
                                    <div className='content' key={index}>
                                        <div className='left'>
                                            <Img className='posterImgSeason' src={item.still_path !== null ? url.backdrop + item?.still_path : PosterFallBack} />
                                        </div>
                                        
                                        <div className='right'>
                                            <div className='title'>
                                                {`${item.episode_number}. ${item.name}`}
                                            </div>
                                            <div className="row">
                                                <CircleRating rating={item.vote_average.toFixed(1)}/>
                                                <span className='subtitle'>
                                                    {item.air_date !== null ? item.air_date : ''}
                                                </span>
                                                <span className='subtitle'>
                                                    {`${item.runtime}m`}
                                                </span>
                                            </div>
                                            <div className="overview">
                                                <div className="heading">
                                                    Overview
                                                </div>
                                                <div className="description">
                                                    {item.overview}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='contentMore'>
                                        <div className={dropdown === index ? '' : 'hidden'}
                                        >
                                            <Cast data={item.guest_stars} title={'Guest Stars'} />
                                            <Crew data={item.crew} />
                                        </div>

                                        <button className='readMoreBtn' onClick={() => clickHandler(index)}>
                                            {dropdown === index ? 'Read Less' : 'Read More'}
                                        </button>
                                    </div>
                                </>
                            ))}
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
