import axios from 'axios';
import {
    GET_POSTS,
    ADD_POST,
    DELETE_POST,
    DATA_LOADING
} from './types';

import { returnErrors } from './errorActions';


export const getPosts = () => dispatch => {
    dispatch(setPostsLoading());
    axios
        .get('/api/posts')
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};


export const setPostsLoading = () => {
    return {
        type: DATA_LOADING
    };
};