import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import './PeopleCard.css';
import Img from "../lazyLoadImage/Img";
import { CircleRatingPeople } from "../circleRating/CircleRating";
import avatar from '../../assets/avatar.png'

export default function PeopleCard({ data, mediaType }) {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const profileUrl = data.profile_path ? url.poster + data.profile_path : avatar;

    return (
        <div className="peopleCard" onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}>
            <div className="posterBlock">
                <Img src={profileUrl}/>
                <CircleRatingPeople rating={data?.popularity.toFixed(0)} />
            </div>
            <div className="textBlock">
                <span className="title">{data.name}</span>
                <span className="knowFor">
                    {data.known_for_department}
                </span>
            </div>
        </div>
    );
};
