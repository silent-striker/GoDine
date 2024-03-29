import React, {useState} from 'react'
import { jwtDecode } from 'jwt-decode'

// it will hold all auth related data
const AuthContext = React.createContext({});

const USER_STATE = "godine_user_state";

export const AuthProvider = ({ children }) => {
    const [userState, setUserState] = useState(null);

    // sets user state and cookie
    const setAuthData = (token, role) => {
        const userInfo = jwtDecode(token);
        // default expiry of 20 mins in milliseconds
        const defaultExpiryTime = 20 * 60 * 1000;
        const defaultExpiresIn = Date.now() + defaultExpiryTime;

        const state = {
            userId: userInfo.id,
            expiresIn: userInfo.expiresIn? userInfo.expiresIn: defaultExpiresIn,
            role: role
        };

        setUserState(state);
        sessionStorage.setItem(USER_STATE, JSON.stringify(state));
    }

    // clear user auth data when users logs out or validity expires
    const clearAuthData = () => {
        setUserState(null);
        sessionStorage.removeItem(USER_STATE);
    }

    // fetch current auth data of the user
    const getAuthData = () => {
        if(!state){
            const userState = JSON.parse(sessionStorage.getItem(USER_STATE));
            setUserState(userState);
        }
        return state;
    }

    // user id for fetching data of the user
    const getUserId = () => {
        return state.userId || getAuthData().userId;
    }

    // checking session validity
    const isSessionValid = () => {
        const state = JSON.parse(localStorage.getItem('authData'));
        const userId = state? state.userId: userState.userId;
        const expiry = state? state.expiresIn: userState.expireIn;
        const role = state? state.role: userState.role;

        return userId !== null && userId !== '' 
                && expiry !== null && expiry !== '' 
                && Date.now() < et
                && role !== null && role !== '';
    }
    
    const authData = {
        getAuthData,
        setAuthData,
        clearAuthData,
        isSessionValid,
        getUserId
    }

    return(
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;