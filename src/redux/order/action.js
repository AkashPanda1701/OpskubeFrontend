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
} from './actionTypes';

import axios from 'axios';


export const getOrder = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ORDER_LOADING });
        const { data } = await axios.get(`http://localhost:3300/orders`,{
            headers: {
                'content-type': 'text/json',
                token: localStorage.getItem('token'),
                }
        });
        // console.log('data: ', data);
        dispatch({ type: GET_ORDER_SUCCESS, payload: {
            orders: data,
        } });
    } catch (error) {
        console.log('error: ', error);
        dispatch({ type: GET_ORDER_ERROR});
    }
}

export const addOrder = (bookname) => async (dispatch) => {
    // console.log('bookname: ', bookname);
    try {
        dispatch({ type: ADD_ORDER_LOADING });
        const { data } = await axios.post(`http://localhost:3300/orders`, {bookname},{
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token'),
                }
        });
        // console.log('data: ', data);
        dispatch({ type: ADD_ORDER_SUCCESS, payload: {
            bookname,
            message: data.message,
        } });
    } catch (error) {
        console.log('error: ', error);
        dispatch({ type: ADD_ORDER_ERROR, payload: {
            message: error.response.data.message,
        } });
    }
}

export const deleteOrder = (bookname,bookdate) => async (dispatch) => {
    // console.log('bookname: ', bookname);
    try {
        dispatch({ type: DELETE_ORDER_LOADING });
        const { data } = await axios.delete(`http://localhost:3300/orders`,{
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token'),
                bookname,
                bookdate,
                }
        });
        // console.log('data: ', data);
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: {
            bookname,
            message: data.message,
        } });
    } catch (error) {
        console.log('error: ', error);
        dispatch({ type: DELETE_ORDER_ERROR, payload: {
            message: error.response.data.message,
        } });
    }
}