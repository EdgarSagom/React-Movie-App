import { useEffect } from 'react';

import getDataFromApi from './hooks/dataApi';

import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice';

function App() {
    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);
    console.log(url);

    useEffect(() => {
        apiTesting();
    }, []);

    const apiTesting = () => {
        getDataFromApi('/movie/popular')
            .then((res) => {
                console.log(res);
                dispatch(getApiConfiguration(res));
        });
    };

    return (
        <>
        <div>
            App
            {url?.total_pages}
        </div>
        </>
    )
}

export default App
