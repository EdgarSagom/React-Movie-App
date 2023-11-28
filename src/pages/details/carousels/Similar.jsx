import React from 'react';
import Carousel from '../../../components/carousel/Carousel';
import useFetch from '../../../hooks/useFetch';

export default function Similar({ mediaType, id }) {
    const {data, loading, error} = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === 'tv' ? 'Similar TV Series' : 'Similar Movies';

    return (
        <>
            {mediaType === 'movie' && (
                <>
                    <Carousel
                        title={title}
                        data={data?.results}
                        loading={loading}
                        endpoint={mediaType}
                    />
                </>
            )}

            {mediaType === 'tv' && (
                <>
                    <Carousel
                        title={title}
                        data={data?.results}
                        loading={loading}
                        endpoint={mediaType}
                    />
                </>
            )}
        </>
    );
};
