import axios from "axios"
import {createContext, useContext, useEffect} from "react"
import { useState } from "react"
import { toast } from "react-toastify"
export const ShopCentext = createContext()

const ShopContextProvider = (props) => {

        const [isLoggedIn ,setIsLoginIn] = useState(false)

    const [userData,setUserDate] =useState(false)

    const getAuthState= async() =>{
        try {
            const {data} = await axios.get(backendUrl +"/api/admin/getUserData")
            if(data.success){
                setIsLoginIn(true)
                setUserDate(data.userData)
            } else {
                setIsLoginIn(false)
                setUserDate(null)
            }
        } catch (error) {
            setIsLoginIn(false)
            setUserDate(null)
        }

    }
    useEffect(() =>{
        getAuthState()
    },[])
    const getUserDate = async()=>{

        try {
            const {data} = await axios.get(backendUrl+"/api/admin/getUserData")
            data.success ? setUserDate(data.userData): toast.error(data.message)
            console.log(data)
        } catch (error) {
            toast.error(error.message)
            
        }
    }

 const backendUrl = "https://vaultifyadmin.onrender.com"
 const MobileApi = "http://vaultify-43wm.onrender.com"
    const Value = { 
        backendUrl,
        isLoggedIn ,
        setIsLoginIn,
        userData,
        setUserDate,
        getUserDate,
        MobileApi
    }
  
    return (

        <ShopCentext.Provider value={Value}>
        {props.children}
    </ShopCentext.Provider>
    )
}

// Custom hook to use the ShopContext
export const useShopContext = () => {
    return useContext(ShopCentext);
}

export default ShopContextProvider;
