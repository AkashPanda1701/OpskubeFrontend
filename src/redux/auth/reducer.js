import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_LOADING,
    AUTH_LOGOUT,
    CLEAR_AUTH_MESSAGE,
} from './actionTypes';



const initialState = {
    loading: false,
    error: false,
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
    message: '',
};

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH_LOGIN_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case AUTH_LOGIN_SUCCESS:
            localStorage.setItem('username', payload.username);
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                loading: false,
                error: false,
                username: payload.username,
                token: payload.token,
                message: payload.message,
            };
        case AUTH_LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: payload.message,
            };

        case AUTH_LOGOUT:
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            return {
                ...state,
                loading: false,
                error: false,
                username: '',
                token: '',
            };

        case CLEAR_AUTH_MESSAGE:
            return {
                ...state,
                message: '',
            };


        default:
            return state;
    }
}

