import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { FaArrowLeft } from "react-icons/fa6";

import './DetailsSeasons.css';

import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import useFetch from '../../hooks/useFetch';
import { CircleRating } from '../../components/circleRating/CircleRating';
import Img from '../../components/lazyLoadImage/Img';
import PosterFallBack from '../../assets/no-poster.png';
import ScrollButton from '../../components/scrollButton/ScrollButton';

export default function DetailsSeasons() {
    const { url } = useSelector((state) => state.home);
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const navigate = useNavigate();

    return (
        <div className="detailsSeasons">
            {!loading ? (
                <>
                    <div className="backdrop-img">
                        <Img src={`${url.backdrop + data?.poster_path}`} />
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className='infoSeasons'>
                            <div className='seasonName'>
                                <div className='nameData'>
                                    {`${data?.name} (${dayjs(data?.first_air_date).format('YYYY')})`}
                                </div>
                                <div className="back" onClick={() => navigate(`/${mediaType}/${id}`)}>
                                    <FaArrowLeft />
                                    <span>Back to main</span>
                                </div>
                            </div>
                            <div>
                                <ScrollButton />
                            </div>

                            {data?.seasons?.map((item , index) => (
                                <div className='content' key={index}>
                                    <div className='left' onClick={() => navigate(`/${mediaType}/${id}/season/${item.season_number}`)}>
                                        <Img className='posterImgSeason' src={item.poster_path !== null ? url.backdrop + item?.poster_path : PosterFallBack} />
                                    </div>
                                    
                                    <div className='right'>
                                        <div className='title' onClick={() => navigate(`/${mediaType}/${id}/season/${item.season_number}`)}>
                                            {item.name}
                                        </div>
                                        <div className="row">
                                            <CircleRating rating={item.vote_average?.toFixed(1)}/>
                                            <span className='subtitle'>
                                                {item.air_date !== null ? dayjs(item.air_date).format('YYYY') : ''}
                                            </span>
                                            <span className='subtitle'>
                                                {`${item.episode_count} Episodes`}
                                            </span>
                                        </div>
                                        <div className='info'>
                                            <span className='text'>
                                                {`${item.name} of ${data?.name} premiered on ${item.air_date !== null ? item.air_date : '-'}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
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
