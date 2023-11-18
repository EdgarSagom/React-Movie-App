import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import './MovieCard.css';
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from '../../assets/no-poster.png';

export default function MovieCard({ data, fromSearch, mediaType }) {
    const {url} = useSelector((state) => state.home);
    const navigate = useNavigate();

    const posterUrl = data.poster_path ? url.poster + data.poster_path : PosterFallback;
    const posterHover = data.backdrop_path ? url.poster + data.backdrop_path : url.poster + data.poster_path;

    return (
        <div className="movieCard" onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}>
            <div className="posterBlock">
                <Img className='posterImg' src={posterUrl}/>
                <Img className='posterHover' src={posterHover} />
                {fromSearch && (
                    <>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="type">
                    {data.media_type.toUpperCase()}
                </span>
                <span className="date">
                    {data.release_date || data.first_air_date}
                </span>
            </div>
        </div>
    )
}
