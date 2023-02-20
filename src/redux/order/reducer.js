import {
    GET_ORDER_LOADING,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    ADD_ORDER_LOADING,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_ERROR,
    DELETE_ORDER_LOADING,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_ERROR,
    CLEAR_ORDER_MESSAGE,
} from './actionTypes';

const initialState = {
    loading: false,
    error: false,
    orders: [],
    message: '',
};

export const orderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ORDER_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                orders: payload.orders,
            };
        case GET_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            };

        case ADD_ORDER_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case ADD_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                orders: [...state.orders, { bookname: payload.bookname ,bookdate:new Date()}],
                message: payload.message,
            };
        case ADD_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: payload.message,
            };

        case DELETE_ORDER_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                orders: state.orders.filter((book) => book.bookname !== payload.bookname),
                message: payload.message,
            };
        case DELETE_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                message: payload.message,
            };

        case CLEAR_ORDER_MESSAGE:
            return {
                ...state,
                message: '',
            };

        default:
            return state;
    }
}