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

  SET_STACK,
  SET_LAST_UPDATED,
  FETCH_STACK,

  CREATE_STACK,
  RECEIVE_STACK,

  FAILED_STACK,
  FAILED_FETCH_STACK,
  
  LOGOUT_STACK,
  RESET_PASSWORD

} from '../state/StackAction.js'

// define the state tree for the Stack
import initialState from "../state/InitialState"

function StackReducer(state = initialState, action) {

alert('StackInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_STACK:{
      // alert('FETCH_STACK received action:' + action.type + '
		// STACK: ' + action.STACK + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_STACK:{
     // ('FETCH_STACK received action:' + action.type + '
		// STACK: ' + action.STACK + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_STACK:{
     // alert('RECEIVE_STACK received action:' + action.type +
		// ' STACKInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_STACK:{
      alert('FAIILED_FETCH_STACK received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_STACK:{
      return{
        ...state,
        fetching:false,
        StackInfo: {}
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
const StackModeledReducer = modeled(StackReducer, ' Stack');

export default StackModeledReducer;
