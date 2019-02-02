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

  SET_ACCOUNT,
  SET_LAST_UPDATED,
  FETCH_ACCOUNT,

  CREATE_ACCOUNT,
  RECEIVE_ACCOUNT,

  FAILED_ACCOUNT,
  FAILED_FETCH_ACCOUNT,
  
  LOGOUT_ACCOUNT,
  RESET_PASSWORD

} from '../state/AccountAction.js'

// define the state tree for the Account
import initialState from "../state/InitialState"

function AccountReducer(state = initialState, action) {

alert('AccountInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_ACCOUNT:{
      // alert('FETCH_ACCOUNT received action:' + action.type + '
		// ACCOUNT: ' + action.ACCOUNT + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_ACCOUNT:{
     // ('FETCH_ACCOUNT received action:' + action.type + '
		// ACCOUNT: ' + action.ACCOUNT + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_ACCOUNT:{
     // alert('RECEIVE_ACCOUNT received action:' + action.type +
		// ' ACCOUNTInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_ACCOUNT:{
      alert('FAIILED_FETCH_ACCOUNT received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_ACCOUNT:{
      return{
        ...state,
        fetching:false,
        AccountInfo: {}
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
const AccountModeledReducer = modeled(AccountReducer, ' Account');

export default AccountModeledReducer;
