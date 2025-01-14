import React, { createContext, useEffect, useState } from "react"

export const LIST = createContext(null)

function MyListContext({ children }) {
    const [myList, setMyList] = useState(() => {
        const storedList = localStorage.getItem("myList");
        return storedList ? JSON.parse(storedList) : [];
    });
    useEffect(() => {
        localStorage.setItem("myList", JSON.stringify(myList));
    }, [myList]);

    const handleAddToList = (item) => {
        setMyList((prevList) => {
            const updatedList = prevList.some((i) => i.id === item.id)
                ? prevList.filter((i) => i.id !== item.id)
                : [...prevList, item]
            return updatedList
        })
        cookies.set("myList", myList);
    }

    return (
        <LIST.Provider value={{ myList, handleAddToList }}>
            {children}
        </LIST.Provider>
    )
}

export default MyListContext