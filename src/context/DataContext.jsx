import React, { createContext, useEffect, useState } from 'react'
import { getData, getTv, topRatedMovies, topRatedTv } from '../services/api'

export const DATA = createContext(null)
export const TV = createContext(null)
export const TOPMOVIES = createContext(null)
export const TOPTV = createContext(null)

function DataContext({ children }) {
    const [tv, setTv] = useState([])
    const [data, setData] = useState([])
    const [topM, setTopM] = useState([])
    const [topTv, setTopTv] = useState([])


    useEffect(() => {
        getData().then(res => setData(res))
        getTv().then(res => setTv(res))
        topRatedMovies().then(res => setTopM(res))
        topRatedTv().then(res => setTopTv(res))
    }, [])

    return (
        <DATA.Provider value={{ data, setData }}>
            <TV.Provider value={{ tv, setTv }}>
                    <TOPMOVIES.Provider value={{ topM, setTopM }}>
                        <TOPTV.Provider value={{ topTv, setTopTv }}>
                            {children}
                        </TOPTV.Provider>
                    </TOPMOVIES.Provider>
            </TV.Provider>
        </DATA.Provider>
    )
}

export default DataContext