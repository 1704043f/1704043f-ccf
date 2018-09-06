import axios from 'axios';
import { USER_PROFILE } from './types';

export const fetchUserDetails = (sub) => {
    const url = `/api/user/${sub}`;
    const request = axios.get(url);
    let userInfo, userRole, userID;
    return (dispatch) => {
    request.then(res => {
        userInfo = res.data[0];
        localStorage.setItem('role', userInfo.role);
        localStorage.setItem('userID', userInfo.id);
        localStorage.setItem('sub', userInfo.sub);
        userRole = localStorage.getItem('role') ? localStorage.getItem('role') : userInfo.role;
        userID = localStorage.getItem('userID') ? localStorage.getItem('userID') : userInfo.id;
        console.log("user role and user ID : " , userRole, userID);
            dispatch ({
                type: USER_PROFILE,
                payload: {
                    role : userRole ,
                    id : userID,
                }
            })
    })
    }
}

export const getUserRole = () => {
    return window.localStorage.getItem('role');
}

export const getUserID = () => {
    return window.localStorage.getItem('userID');
}