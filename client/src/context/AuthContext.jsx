import { createContext, useContext , useEffect, useState} from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(sessionStorage.getItem('token'))
    
    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            { children }
        </AuthContext.Provider>
    )
}