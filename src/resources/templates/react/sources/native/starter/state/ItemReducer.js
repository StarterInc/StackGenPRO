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

  SET_ITEM,
  SET_LAST_UPDATED,
  FETCH_ITEM,

  CREATE_ITEM,
  RECEIVE_ITEM,

  FAILED_ITEM,
  FAILED_FETCH_ITEM,
  
  LOGOUT_ITEM,
  RESET_PASSWORD

} from '../state/ItemAction.js'

// define the state tree for the Item
import initialState from "../state/InitialState"

function ItemReducer(state = initialState, action) {

alert('ItemInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_ITEM:{
      // alert('FETCH_ITEM received action:' + action.type + '
		// ITEM: ' + action.ITEM + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_ITEM:{
     // ('FETCH_ITEM received action:' + action.type + '
		// ITEM: ' + action.ITEM + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_ITEM:{
     // alert('RECEIVE_ITEM received action:' + action.type +
		// ' ITEMInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_ITEM:{
      alert('FAIILED_FETCH_ITEM received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_ITEM:{
      return{
        ...state,
        fetching:false,
        ItemInfo: {}
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
const ItemModeledReducer = modeled(ItemReducer, ' Item');

export default ItemModeledReducer;
