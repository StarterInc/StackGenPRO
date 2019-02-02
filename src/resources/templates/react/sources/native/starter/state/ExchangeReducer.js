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

  SET_EXCHANGE,
  SET_LAST_UPDATED,
  FETCH_EXCHANGE,

  CREATE_EXCHANGE,
  RECEIVE_EXCHANGE,

  FAILED_EXCHANGE,
  FAILED_FETCH_EXCHANGE,
  
  LOGOUT_EXCHANGE,
  RESET_PASSWORD

} from '../state/ExchangeAction.js'

// define the state tree for the Exchange
import initialState from "../state/InitialState"

function ExchangeReducer(state = initialState, action) {

alert('ExchangeInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_EXCHANGE:{
      // alert('FETCH_EXCHANGE received action:' + action.type + '
		// EXCHANGE: ' + action.EXCHANGE + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_EXCHANGE:{
     // ('FETCH_EXCHANGE received action:' + action.type + '
		// EXCHANGE: ' + action.EXCHANGE + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_EXCHANGE:{
     // alert('RECEIVE_EXCHANGE received action:' + action.type +
		// ' EXCHANGEInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_EXCHANGE:{
      alert('FAIILED_FETCH_EXCHANGE received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_EXCHANGE:{
      return{
        ...state,
        fetching:false,
        ExchangeInfo: {}
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
const ExchangeModeledReducer = modeled(ExchangeReducer, ' Exchange');

export default ExchangeModeledReducer;
