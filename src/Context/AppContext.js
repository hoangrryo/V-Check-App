import { createContext, useEffect, useState } from "react";

export const Appcontext = createContext()

export const AppProvider = ({children}) => {

    let [photoList, setPhotoList] = useState([])
    let [isPhotoList, setIsPhotoList] = useState(false)

    useEffect(()=>{
        console.log(photoList)
    },[photoList])

    const userData = {
        photoList,
        setPhotoList,
        isPhotoList,
        setIsPhotoList,
    }

    return  <Appcontext.Provider value={userData}>
                {children}
            </Appcontext.Provider>
}