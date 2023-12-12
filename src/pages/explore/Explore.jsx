import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import './Explore.css';

import useFetch from '../../hooks/useFetch';
import { getDataFromApi } from '../../hooks/dataApi';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';
import ScrollButton from '../../components/scrollButton/ScrollButton';

const animatedComponents = makeAnimated();

let filters = {};

const sortByData = [
    { value: 'popularity.desc', label: 'Popularity Descending' },
    { value: 'popularity.asc', label: 'Popularity Ascending' },
    { value: 'vote_average.desc', label: 'Rating Descending' },
    { value: 'vote_average.asc', label: 'Rating Ascending' },
    { value: 'primary_release_date.desc', label: 'Release Date Descending' },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

export default function Explore() {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const { mediaType } = useParams();

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    const fetchInitialData = () => {
        setLoading(true);
        getDataFromApi(`/discover/${mediaType}`, filters)
            .then((res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            });
    };

    const fetchNextPageData = () => {
        getDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters)
            .then((res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                };
                setPageNum((prev) => prev + 1);
            });
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setGenre(null);
        setSortBy(null);
        fetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems, action) => {
        if (action.name === 'sortBy') {
            setSortBy(selectedItems);
            if (action.action !== 'clear') {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            };
            // console.log(selectedItems);
        };

        if (action.name === 'genres') {
            setGenre(selectedItems);
            if (action.action !== 'clear') {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            };
            // console.log(selectedItems);
        };

        setPageNum(1);
        fetchInitialData();
    };

    return (
        <div className='explorePage'>
            <ContentWrapper>
                <div>
                    <ScrollButton />
                </div>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === 'tv' ? 'Explore TV Series' : 'Explore Movies'}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name='genres'
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            components={animatedComponents}
                            getOptionValue={(option) => option.id}
                            getOptionLabel={(option) => option.name}
                            onChange={onChange}
                            placeholder='Select genres'
                            className='react-select-container genresDD'
                            classNamePrefix='react-select'
                        />
                        <Select
                            name='sortBy'
                            value={sortBy}
                            options={sortByData}
                            components={animatedComponents}
                            onChange={onChange}
                            isClearable={true}
                            placeholder='Sort by'
                            className='react-select-container sortByDD'
                            classNamePrefix='react-select'
                        />
                    </div>
                </div>

                {loading && <Spinner />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className='content'
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    return (
                                        <MovieCard key={index} data={item} mediaType={mediaType} />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};
