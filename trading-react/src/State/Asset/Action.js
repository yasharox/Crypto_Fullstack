
import api from "@/config/api";
import * as types from "./ActionType";

// Action Creators

/**
 * Fetches a single asset by its ID
 */
export const getAssetById = ({ assetId, jwt }) => async (dispatch) => {
    dispatch({ type: types.GET_ASSET_REQUEST });

    try {
        const response = await api.get(`/api/assets/${assetId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({
            type: types.GET_ASSET_SUCCESS,
            payload: response.data,
        });

        console.log (" Get asset by id", response.data);
    } catch (error) {
        dispatch({
            type: types.GET_ASSET_FAILURE,
            error: error.message,
        });
    }
};



/**
 * Fetches specific asset details for a user based on coinId
 */
export const getAssetDetails = ({ coinId, jwt }) => async (dispatch) => {
    dispatch({ type: types.GET_ASSET_DETAILS_REQUEST });

    try {
        const response = await api.get(`/api/assets/coin/${coinId}/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({
            type: types.GET_ASSET_DETAILS_SUCCESS,
            payload: response.data,
        });
        console.log("Asset details --- ", response.data);
    } catch (error) {

        console.log ( "asset details", error);
        dispatch({
            type: types.GET_ASSET_FAILURE, // Note: Your image shows GET_ASSET_FAILURE here instead of GET_ASSET_DETAILS_FAILURE
            error: error.message,
        });
    }
};

/**
 * Fetches all assets belonging to the user
 */
export const getUserAssets = (jwt) => async (dispatch) => {
    dispatch({ type: types.GET_USER_ASSETS_REQUEST });

    try {
        const response = await api.get("/api/assets", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({
            type: types.GET_USER_ASSETS_SUCCESS,
            payload: response.data,
        });

        console.log("user assets --- ", response.data);
    } catch (error) {
        console.log("user assets --- ", error);
        dispatch({
            type: types.GET_USER_ASSETS_FAILURE,
            error: error.message,
        });
    }
};