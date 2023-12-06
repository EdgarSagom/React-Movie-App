import React from 'react';
import Carousel from '../../../components/carousel/Carousel';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

import './KnownFor.css';

export default function KnownFor({ data, loading, mediaType }) {
    const cast = data?.cast;
    const crew = data?.crew;
    const type = 'movie' || 'tv';

    // console.log(data);
    // console.log(cast);
    // console.log(crew);

    return (
        <div className='knownForSection'>
            <ContentWrapper>
                {!loading && (
                    <>
                        <div className="sectionHeading">Know for</div>
                        {cast && (
                            <>
                                <div className="titleHeading">Acting</div>
                                <div>
                                    <Carousel
                                        data={cast}
                                        loading={loading}
                                        endpoint={type}
                                    />
                                </div>
                            </>
                        )}

                        {crew && (
                            <>
                                <div className="titleHeading">Production</div>
                                <div>
                                    <Carousel
                                        data={crew}
                                        loading={loading}
                                        endpoint={type}
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};
