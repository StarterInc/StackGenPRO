/**
 * Generated REDUX Reducer
 */
import { modeled } from 'react-redux-form';

/*
 * TOOD: implement offline updates // optimistically update the state, revert on
 * rollback const followingUsersReducer = (state, action) { switch(action.type) {
 * case 'FOLLOW_USER': return { ...state, [action.payload.userId]: true }; case
 * 'FOLLOW_USER_ROLLBACK': return omit(state, [action.payload.userId]); default:
 * return state; } }
 */
import {

  SET_TRADE,
  SET_LAST_UPDATED,
  FETCH_TRADE,

  CREATE_TRADE,
  RECEIVE_TRADE,

  FAILED_TRADE,
  FAILED_FETCH_TRADE,
  
  LOGOUT_TRADE,
  RESET_PASSWORD

} from '../state/TradeAction.js'

// define the state tree for the Trade
import initialState from "../state/InitialState"

function TradeReducer(state = initialState, action) {

alert('TradeInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_TRADE:{
      // alert('FETCH_TRADE received action:' + action.type + '
		// TRADE: ' + action.TRADE + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_TRADE:{
     // ('FETCH_TRADE received action:' + action.type + '
		// TRADE: ' + action.TRADE + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_TRADE:{
     // alert('RECEIVE_TRADE received action:' + action.type +
		// ' TRADEInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_TRADE:{
      alert('FAIILED_FETCH_TRADE received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_TRADE:{
      return{
        ...state,
        fetching:false,
        TradeInfo: {}
      }
      break;
    }

    case RESET_PASSWORD:{
      return{
          ...state,
          fetching:true,
          password:action.payload
        }
        break;
      }

    default:{
      return{
        ...state,
        fetching:false
      }
    }
  }
}

// Decorated modeled reducer
const TradeModeledReducer = modeled(TradeReducer, ' Trade');

export default TradeModeledReducer;
