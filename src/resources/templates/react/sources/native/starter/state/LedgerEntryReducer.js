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

  SET_LEDGERENTRY,
  SET_LAST_UPDATED,
  FETCH_LEDGERENTRY,

  CREATE_LEDGERENTRY,
  RECEIVE_LEDGERENTRY,

  FAILED_LEDGERENTRY,
  FAILED_FETCH_LEDGERENTRY,
  
  LOGOUT_LEDGERENTRY,
  RESET_PASSWORD

} from '../state/LedgerEntryAction.js'

// define the state tree for the LedgerEntry
import initialState from "../state/InitialState"

function LedgerEntryReducer(state = initialState, action) {

alert('LedgerEntryInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_LEDGERENTRY:{
      // alert('FETCH_LEDGERENTRY received action:' + action.type + '
		// LEDGERENTRY: ' + action.LEDGERENTRY + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_LEDGERENTRY:{
     // ('FETCH_LEDGERENTRY received action:' + action.type + '
		// LEDGERENTRY: ' + action.LEDGERENTRY + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_LEDGERENTRY:{
     // alert('RECEIVE_LEDGERENTRY received action:' + action.type +
		// ' LEDGERENTRYInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_LEDGERENTRY:{
      alert('FAIILED_FETCH_LEDGERENTRY received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_LEDGERENTRY:{
      return{
        ...state,
        fetching:false,
        LedgerEntryInfo: {}
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
const LedgerEntryModeledReducer = modeled(LedgerEntryReducer, ' LedgerEntry');

export default LedgerEntryModeledReducer;
