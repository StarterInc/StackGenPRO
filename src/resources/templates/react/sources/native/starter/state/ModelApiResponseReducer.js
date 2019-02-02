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

  SET_MODELAPIRESPONSE,
  SET_LAST_UPDATED,
  FETCH_MODELAPIRESPONSE,

  CREATE_MODELAPIRESPONSE,
  RECEIVE_MODELAPIRESPONSE,

  FAILED_MODELAPIRESPONSE,
  FAILED_FETCH_MODELAPIRESPONSE,
  
  LOGOUT_MODELAPIRESPONSE,
  RESET_PASSWORD

} from '../state/ModelApiResponseAction.js'

// define the state tree for the ModelApiResponse
import initialState from "../state/InitialState"

function ModelApiResponseReducer(state = initialState, action) {

alert('ModelApiResponseInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_MODELAPIRESPONSE:{
      // alert('FETCH_MODELAPIRESPONSE received action:' + action.type + '
		// MODELAPIRESPONSE: ' + action.MODELAPIRESPONSE + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_MODELAPIRESPONSE:{
     // ('FETCH_MODELAPIRESPONSE received action:' + action.type + '
		// MODELAPIRESPONSE: ' + action.MODELAPIRESPONSE + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_MODELAPIRESPONSE:{
     // alert('RECEIVE_MODELAPIRESPONSE received action:' + action.type +
		// ' MODELAPIRESPONSEInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_MODELAPIRESPONSE:{
      alert('FAIILED_FETCH_MODELAPIRESPONSE received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_MODELAPIRESPONSE:{
      return{
        ...state,
        fetching:false,
        ModelApiResponseInfo: {}
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
const ModelApiResponseModeledReducer = modeled(ModelApiResponseReducer, ' ModelApiResponse');

export default ModelApiResponseModeledReducer;
