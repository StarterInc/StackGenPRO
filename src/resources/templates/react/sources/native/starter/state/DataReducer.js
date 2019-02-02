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

  SET_DATA,
  SET_LAST_UPDATED,
  FETCH_DATA,

  CREATE_DATA,
  RECEIVE_DATA,

  FAILED_DATA,
  FAILED_FETCH_DATA,
  
  LOGOUT_DATA,
  RESET_PASSWORD

} from '../state/DataAction.js'

// define the state tree for the Data
import initialState from "../state/InitialState"

function DataReducer(state = initialState, action) {

alert('DataInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_DATA:{
      // alert('FETCH_DATA received action:' + action.type + '
		// DATA: ' + action.DATA + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_DATA:{
     // ('FETCH_DATA received action:' + action.type + '
		// DATA: ' + action.DATA + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_DATA:{
     // alert('RECEIVE_DATA received action:' + action.type +
		// ' DATAInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_DATA:{
      alert('FAIILED_FETCH_DATA received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_DATA:{
      return{
        ...state,
        fetching:false,
        DataInfo: {}
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
const DataModeledReducer = modeled(DataReducer, ' Data');

export default DataModeledReducer;
