import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { RViewer, RViewerTrigger } from 'react-viewerjs';

import './ImagesPerson.css';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImage/Img';
import useFetch from '../../../hooks/useFetch';
import Spinner from '../../../components/spinner/Spinner';

export default function ImagesPerson({ id, loading, mediaType }) {
    const carouselContainer = useRef();
    const {url} = useSelector((state) => state.home);

    const filePath = useFetch(`/person/${id}/images`);

    const filePathUrl = filePath?.data?.profiles?.map((item) => {
        return url.poster + item.file_path;
    });
    // console.log(filePathUrl);
    
    const navigation = (direction) => {
        const container = carouselContainer.current;

        const scrollAmount = direction === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <div className='imagesSection'>
            <ContentWrapper>
                {loading && (
                    <Spinner />
                )}
                {!loading && (
                    <>
                        {mediaType === 'person' && (
                            <>
                                <div className="sectionHeading">Images</div>
                                <BsFillArrowLeftCircleFill
                                    className='arrow carouselLeftNav'
                                    onClick={() => navigation('left')}
                                />
                                <BsFillArrowRightCircleFill
                                    className='arrow carouselRightNav'
                                    onClick={() => navigation('right')}
                                />
                                <RViewer imageUrls={filePathUrl}>
                                    <div className="carouselImageItems" ref={carouselContainer}>
                                        {filePathUrl?.map((images, index) => {
                                            return (
                                                <RViewerTrigger index={index}>
                                                    <div className='item'>
                                                        <div className="posterBlock">
                                                            <Img className='posterImg' src={images}/>
                                                        </div>
                                                    </div>
                                                </RViewerTrigger>
                                            )
                                        })}
                                    </div>
                                </RViewer>
                            </>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};
