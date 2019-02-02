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

  SET_ORDER,
  SET_LAST_UPDATED,
  FETCH_ORDER,

  CREATE_ORDER,
  RECEIVE_ORDER,

  FAILED_ORDER,
  FAILED_FETCH_ORDER,
  
  LOGOUT_ORDER,
  RESET_PASSWORD

} from '../state/OrderAction.js'

// define the state tree for the Order
import initialState from "../state/InitialState"

function OrderReducer(state = initialState, action) {

alert('OrderInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_ORDER:{
      // alert('FETCH_ORDER received action:' + action.type + '
		// ORDER: ' + action.ORDER + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_ORDER:{
     // ('FETCH_ORDER received action:' + action.type + '
		// ORDER: ' + action.ORDER + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_ORDER:{
     // alert('RECEIVE_ORDER received action:' + action.type +
		// ' ORDERInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_ORDER:{
      alert('FAIILED_FETCH_ORDER received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_ORDER:{
      return{
        ...state,
        fetching:false,
        OrderInfo: {}
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
const OrderModeledReducer = modeled(OrderReducer, ' Order');

export default OrderModeledReducer;
