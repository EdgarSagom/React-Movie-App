import { useState } from 'react';

import './VideosSection.css';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import PlayBtn from '../PlayBtn';
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import Img from '../../../components/lazyLoadImage/Img';

export default function VideosSection({ data, loading, mediaType }) {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className='videosSection'>
            <ContentWrapper>
                {!loading ? (
                    <>
                        {mediaType === 'movie' && (
                            <>
                                <div className="sectionHeading">Official Videos</div>
                                <div className="videos">
                                    {data?.results?.map((video) => (
                                        <div
                                            key={video.id}
                                            className="videoItem"
                                            onClick={() => {
                                                setVideoId(video.key);
                                                setShow(true);
                                            }}
                                        >
                                            <div className="videoThumbnail">
                                                <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                                <PlayBtn />
                                            </div>
                                            <div className="videoTitle">
                                                {video.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {mediaType === 'tv' && (
                            <>
                                <div className="sectionHeading">Official Videos</div>
                                <div className="videos">
                                    {data?.results?.map((video) => (
                                        <div
                                            key={video.id}
                                            className="videoItem"
                                            onClick={() => {
                                                setVideoId(video.key);
                                                setShow(true);
                                            }}
                                        >
                                            <div className="videoThumbnail">
                                                <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                                <PlayBtn />
                                            </div>
                                            <div className="videoTitle">
                                                {video.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};
