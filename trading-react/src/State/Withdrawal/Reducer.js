// withdrawalReducer.js

import {
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
  WITHDRAWAL_FAILURE,

  WITHDRAWAL_PROCEED_REQUEST,
  WITHDRAWAL_PROCEED_SUCCESS,
  WITHDRAWAL_PROCEED_FAILURE,

  GET_WITHDRAWAL_HISTORY_REQUEST,
  GET_WITHDRAWAL_HISTORY_SUCCESS,
  GET_WITHDRAWAL_HISTORY_FAILURE,

  GET_WITHDRAWAL_REQUEST_REQUEST,
  GET_WITHDRAWAL_REQUEST_SUCCESS,
  GET_WITHDRAWAL_REQUEST_FAILURE,

  ADD_PAYMENT_DETAILS_SUCCESS,
  GET_PAYMENT_DETAILS_SUCCESS,
} from "./ActionType";

const initialState = {
  withdrawal: null,
  history: [],
  requests: [],
  paymentDetails: null,
  loading: false,
  error: null,
};

const withdrawalReducer = (state = initialState, action) => {
  switch (action.type) {

    // ===================== REQUEST STATES =====================
    case WITHDRAWAL_REQUEST:
    case WITHDRAWAL_PROCEED_REQUEST:
    case GET_WITHDRAWAL_HISTORY_REQUEST:
    case GET_WITHDRAWAL_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // ===================== WITHDRAWAL =====================
    case WITHDRAWAL_SUCCESS:
      return {
        ...state,
        withdrawal: action.payload,
        loading: false,
        error: null,
      };

    // ===================== PAYMENT DETAILS =====================
    case ADD_PAYMENT_DETAILS_SUCCESS:
      //    return {
      //   ...state,
      //   paymentDetails: action.payload,
      //   loading: false,
      // };
    case GET_PAYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        paymentDetails: action.payload,
        loading: false,
        error: null,
      };

    // ===================== WITHDRAWAL PROCEED =====================
    case WITHDRAWAL_PROCEED_SUCCESS:
      return {
        ...state,
        requests: state.requests.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
        error: null,
      };

    // ===================== WITHDRAWAL HISTORY =====================
    case GET_WITHDRAWAL_HISTORY_SUCCESS:
      return {
        ...state,
        history: action.payload,
        loading: false,
        error: null,
      };

    // ===================== WITHDRAWAL REQUEST LIST =====================
    case GET_WITHDRAWAL_REQUEST_SUCCESS:
      return {
        ...state,
        requests: action.payload,
        loading: false,
        error: null,
      };

    // ===================== FAILURE STATES =====================
    case WITHDRAWAL_FAILURE:
    case WITHDRAWAL_PROCEED_FAILURE:
    case GET_WITHDRAWAL_HISTORY_FAILURE:
    case GET_WITHDRAWAL_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ===================== DEFAULT =====================
    default:
      return state;
  }
};

export default withdrawalReducer;
