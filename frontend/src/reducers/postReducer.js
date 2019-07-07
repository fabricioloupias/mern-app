import {
    GET_POSTS,
    ADD_POST,
    DELETE_POST,
    DATA_LOADING
  } from '../actions/types';
  
  const initialState = {
    posts: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_POSTS:
        return {
          ...state,
          posts: action.payload,
          loading: false
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(item => item._id !== action.payload)
        };
      case ADD_POST:
        return {
          ...state,
          posts: [action.payload, ...state.posts]
        };
      case DATA_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }