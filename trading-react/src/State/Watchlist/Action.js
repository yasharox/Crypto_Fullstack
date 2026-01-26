// src/State/Watchlist/Action.js

import api from '@/config/api';
import * as types from './ActionType';



/* ================================
   GET USER WATCHLIST
================================ */
export const getUserWatchlist = (jwt) => async (dispatch) => {

  dispatch({ type: types.GET_USER_WATCHLIST_REQUEST });

  try {
    const response = await api.get('/api/watchlist/user', {
        headers: {
            // Authorization: `Bearer ${jwt}`,
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
            },
    });

    dispatch({
      type: types.GET_USER_WATCHLIST_SUCCESS,
      payload: response.data,
    });

    console.log ("user Watchlist", response.data);
  } catch (error) {

    console.log ( "error", error);
    dispatch({
      type: types.GET_USER_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};

/* ================================
   ADD COIN TO WATCHLIST
================================ */
export const addItemToWatchlist = ({coinId , jwt}) => async (dispatch) => {
  dispatch({ type: types.ADD_COIN_TO_WATCHLIST_REQUEST });

  try {
    const response = await api.patch( `/api/watchlist/add/coin/${coinId}`,
        {},
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem ("jwt")}`, 
            },       
    }
 );

    dispatch({
      type: types.ADD_COIN_TO_WATCHLIST_SUCCESS,
      payload: response.data,
    });

    console.log ( "add coin to watchlist", response.data);
  } catch (error) {

    console.log ( "error", error.response.data);
    dispatch({
      type: types.ADD_COIN_TO_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};
