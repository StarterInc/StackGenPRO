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

  SET_CONTACTMETHOD,
  SET_LAST_UPDATED,
  FETCH_CONTACTMETHOD,

  CREATE_CONTACTMETHOD,
  RECEIVE_CONTACTMETHOD,

  FAILED_CONTACTMETHOD,
  FAILED_FETCH_CONTACTMETHOD,
  
  LOGOUT_CONTACTMETHOD,
  RESET_PASSWORD

} from '../state/ContactMethodAction.js'

// define the state tree for the ContactMethod
import initialState from "../state/InitialState"

function ContactMethodReducer(state = initialState, action) {

alert('ContactMethodInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_CONTACTMETHOD:{
      // alert('FETCH_CONTACTMETHOD received action:' + action.type + '
		// CONTACTMETHOD: ' + action.CONTACTMETHOD + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_CONTACTMETHOD:{
     // ('FETCH_CONTACTMETHOD received action:' + action.type + '
		// CONTACTMETHOD: ' + action.CONTACTMETHOD + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_CONTACTMETHOD:{
     // alert('RECEIVE_CONTACTMETHOD received action:' + action.type +
		// ' CONTACTMETHODInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_CONTACTMETHOD:{
      alert('FAIILED_FETCH_CONTACTMETHOD received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_CONTACTMETHOD:{
      return{
        ...state,
        fetching:false,
        ContactMethodInfo: {}
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
const ContactMethodModeledReducer = modeled(ContactMethodReducer, ' ContactMethod');

export default ContactMethodModeledReducer;
