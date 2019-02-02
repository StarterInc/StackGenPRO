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

  SET_CATEGORY,
  SET_LAST_UPDATED,
  FETCH_CATEGORY,

  CREATE_CATEGORY,
  RECEIVE_CATEGORY,

  FAILED_CATEGORY,
  FAILED_FETCH_CATEGORY,
  
  LOGOUT_CATEGORY,
  RESET_PASSWORD

} from '../state/CategoryAction.js'

// define the state tree for the Category
import initialState from "../state/InitialState"

function CategoryReducer(state = initialState, action) {

alert('CategoryInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_CATEGORY:{
      // alert('FETCH_CATEGORY received action:' + action.type + '
		// CATEGORY: ' + action.CATEGORY + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_CATEGORY:{
     // ('FETCH_CATEGORY received action:' + action.type + '
		// CATEGORY: ' + action.CATEGORY + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_CATEGORY:{
     // alert('RECEIVE_CATEGORY received action:' + action.type +
		// ' CATEGORYInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_CATEGORY:{
      alert('FAIILED_FETCH_CATEGORY received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_CATEGORY:{
      return{
        ...state,
        fetching:false,
        CategoryInfo: {}
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
const CategoryModeledReducer = modeled(CategoryReducer, ' Category');

export default CategoryModeledReducer;
