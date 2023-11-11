import { useEffect, useState} from 'react';
import getDataFromApi from './dataApi';
import Spinner from '../components/spinner/Spinner';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setData(null);
        setError(null);

        getDataFromApi(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                setLoading(false);
                setError('Something went wrong!');
            });
    }, [url]);

    if (loading) {
        return <Spinner />;
    };

    return { data, loading, error};
}

export default useFetch;