import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

import './CastCrew.css';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Img';
import avatar from '../../assets/avatar.png';

export default function Cast({ data, loading, title }) {
    const carouselContainer = useRef();
    const {url} = useSelector((state) => state.home);
    const navigate = useNavigate();
    
    const navigation = (direction) => {
        const container = carouselContainer.current;

        const scrollAmount = direction === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth',
        });
    };

    const skeleton = () => {
        return (
            <div className='skItem'>
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className='castSection'>
            <ContentWrapper>
                {!loading ? (
                    <>
                        <div className="sectionHeading">{title === 'Guest Stars' ? 'Guest Stars' : 'Top Cast'}</div>
                        <BsFillArrowLeftCircleFill
                            className='arrow carouselLeftNav'
                            onClick={() => navigation('left')}
                        />
                        <BsFillArrowRightCircleFill
                            className='arrow carouselRightNav'
                            onClick={() => navigation('right')}
                        />
                        <div className="listItems" ref={carouselContainer}>
                            {data?.map((item) => {
                                let imgUrl = item.profile_path ? url.profile + item.profile_path : avatar;
                                return (
                                    <div key={item.id} className="item" onClick={() => navigate(`/person/${item.id}`)}>
                                        <div className="profileImg">
                                            <Img src={imgUrl} />
                                        </div>
                                        <div className="name">{item.name}</div>
                                        <div className="character">
                                            {item.character}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};
