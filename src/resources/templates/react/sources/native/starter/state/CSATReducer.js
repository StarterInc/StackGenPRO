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

  SET_CSAT,
  SET_LAST_UPDATED,
  FETCH_CSAT,

  CREATE_CSAT,
  RECEIVE_CSAT,

  FAILED_CSAT,
  FAILED_FETCH_CSAT,
  
  LOGOUT_CSAT,
  RESET_PASSWORD

} from '../state/CsatAction.js'

// define the state tree for the Csat
import initialState from "../state/InitialState"

function CsatReducer(state = initialState, action) {

alert('CsatInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_CSAT:{
      // alert('FETCH_CSAT received action:' + action.type + '
		// CSAT: ' + action.CSAT + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_CSAT:{
     // ('FETCH_CSAT received action:' + action.type + '
		// CSAT: ' + action.CSAT + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_CSAT:{
     // alert('RECEIVE_CSAT received action:' + action.type +
		// ' CSATInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_CSAT:{
      alert('FAIILED_FETCH_CSAT received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_CSAT:{
      return{
        ...state,
        fetching:false,
        CsatInfo: {}
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
const CsatModeledReducer = modeled(CsatReducer, ' Csat');

export default CsatModeledReducer;
