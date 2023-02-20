import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_LOADING,
} from './actionTypes';
import axios from 'axios';


export const login = (formdata) => async (dispatch) => {
    // console.log('formdata: ', formdata);
    try {
        dispatch({ type: AUTH_LOGIN_LOADING });
        const { data } = await axios.post(`http://localhost:3300/users/login`, formdata);
        // console.log('data: ', data);
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: {
            username: data.username,
            token: data.token,
            message: data.message,
        } });
    } catch (error) {
        console.log('error: ', error);
        dispatch({ type: AUTH_LOGIN_ERROR , payload: {
            message: error.response.data.message,
        } });
        
    }
};