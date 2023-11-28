import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import './SearchResult.css';

import { getDataFromApi } from "../../hooks/dataApi";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import PeopleCard from '../../components/peopleCard/PeopleCard';
import Spinner from "../../components/spinner/Spinner";

export default function SearchResult() {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        getDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then((res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            });
    };

    const fetchNextPageData = () => {
        getDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then((res) => {
                if (data?.results) {
                    setData({
                        ...data, results: [...data?.results, ...res.results]
                    });
                } else {
                    setData(res);
                };
                setPageNum((prev) => prev + 1);
            });
    }

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <div className='searchResultsPage'>
            {loading && <Spinner />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className='pageTitle'>
                                {`Search ${data?.total_results > 1 ? 'results' : 'result'} of '${query}'`}
                            </div>
                            <InfiniteScroll
                                className='content'
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results.map((item, index) => {
                                    if(item.media_type === 'person') {
                                        return (
                                            <PeopleCard key={index} data={item} fromSearch={true} />
                                        )
                                    } else {
                                        return (
                                            <MovieCard key={index} data={item} fromSearch={true} />
                                        )
                                    }
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className='resultsNotFound'>
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};
