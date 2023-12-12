import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import './ExplorePerson.css';

import { getDataFromApi } from '../../hooks/dataApi';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import Spinner from '../../components/spinner/Spinner';
import PeopleCard from '../../components/peopleCard/PeopleCard';
import ScrollButton from '../../components/scrollButton/ScrollButton';

export default function ExplorePerson() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        getDataFromApi(`/trending/person/week?page=${page}`)
            .then((res) => {
                setData((prevData) => prevData.concat(res.results));
                setHasMore(res.page < res.total_pages);
                setLoading(false);
            });
    }, [page]);

    return (
        <div className='explorePage'>
            <div>
                <ScrollButton />
            </div>
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {'Explore Person'}
                    </div>
                </div>

                {loading && <Spinner />}

                {!loading && (
                    <>
                        <InfiniteScroll
                            className='content'
                            dataLength={data.length}
                            next={() => setPage((prevPage) => prevPage + 1)}
                            hasMore={hasMore}
                            loader={<Spinner />}
                        >
                            {data.map((item, index) => {
                                return (
                                    <PeopleCard key={index} data={item} />
                                );
                            })}
                        </InfiniteScroll>
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};
