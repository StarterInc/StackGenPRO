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

  SET_APISPEC,
  SET_LAST_UPDATED,
  FETCH_APISPEC,

  CREATE_APISPEC,
  RECEIVE_APISPEC,

  FAILED_APISPEC,
  FAILED_FETCH_APISPEC,
  
  LOGOUT_APISPEC,
  RESET_PASSWORD

} from '../state/ApiSpecAction.js'

// define the state tree for the ApiSpec
import initialState from "../state/InitialState"

function ApiSpecReducer(state = initialState, action) {

alert('ApiSpecInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_APISPEC:{
      // alert('FETCH_APISPEC received action:' + action.type + '
		// APISPEC: ' + action.APISPEC + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_APISPEC:{
     // ('FETCH_APISPEC received action:' + action.type + '
		// APISPEC: ' + action.APISPEC + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_APISPEC:{
     // alert('RECEIVE_APISPEC received action:' + action.type +
		// ' APISPECInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_APISPEC:{
      alert('FAIILED_FETCH_APISPEC received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_APISPEC:{
      return{
        ...state,
        fetching:false,
        ApiSpecInfo: {}
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
const ApiSpecModeledReducer = modeled(ApiSpecReducer, ' ApiSpec');

export default ApiSpecModeledReducer;
