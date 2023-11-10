import { useEffect } from 'react'
import './App.css'
import getDataFromApi from './hooks/dataApi'

function App() {
    useEffect(() => {
        apiTesting();
    }, [])

    const apiTesting = () => {
        getDataFromApi('/movie/popular')
            .then((res) => {
                console.log(res);
            })
    }

    return (
        <>
        <div>
            App
        </div>
        </>
    )
}

export default App
