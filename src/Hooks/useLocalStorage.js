import { useEffect, useState } from "react";
/* Note: JSON.stringify((prevState) => [...prevState, 4, 5, 6]) returns undefined value */
export function useLocalStorage(key, initialData)
{
    const[data, setData] = useState(initialData)

    useEffect(() =>{
        const existingData = JSON.parse(localStorage.getItem(key))
        if(existingData) {
            setData(existingData)
        }
        else
        {
            localStorage.setItem(key, JSON.stringify(initialData))
        }
    }, [])

    const updateLocalStorage = (newData) => { //here newData can be any data like: array, object and function
        // console.log(newData);
        if(typeof newData === 'function')
        {
            localStorage.setItem(key, JSON.stringify(newData(data))) //if someone call fun with prev state
        }
        else{
            localStorage.setItem(key, JSON.stringify(newData))
        }
        setData(newData)
    }
    return [data, updateLocalStorage]
}