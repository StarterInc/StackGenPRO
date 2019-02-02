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

  SET_TAG,
  SET_LAST_UPDATED,
  FETCH_TAG,

  CREATE_TAG,
  RECEIVE_TAG,

  FAILED_TAG,
  FAILED_FETCH_TAG,
  
  LOGOUT_TAG,
  RESET_PASSWORD

} from '../state/TagAction.js'

// define the state tree for the Tag
import initialState from "../state/InitialState"

function TagReducer(state = initialState, action) {

alert('TagInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_TAG:{
      // alert('FETCH_TAG received action:' + action.type + '
		// TAG: ' + action.TAG + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_TAG:{
     // ('FETCH_TAG received action:' + action.type + '
		// TAG: ' + action.TAG + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_TAG:{
     // alert('RECEIVE_TAG received action:' + action.type +
		// ' TAGInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_TAG:{
      alert('FAIILED_FETCH_TAG received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_TAG:{
      return{
        ...state,
        fetching:false,
        TagInfo: {}
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
const TagModeledReducer = modeled(TagReducer, ' Tag');

export default TagModeledReducer;
