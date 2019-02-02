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

  SET_CSATDATA,
  SET_LAST_UPDATED,
  FETCH_CSATDATA,

  CREATE_CSATDATA,
  RECEIVE_CSATDATA,

  FAILED_CSATDATA,
  FAILED_FETCH_CSATDATA,
  
  LOGOUT_CSATDATA,
  RESET_PASSWORD

} from '../state/CsatdataAction.js'

// define the state tree for the Csatdata
import initialState from "../state/InitialState"

function CsatdataReducer(state = initialState, action) {

alert('CsatdataInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_CSATDATA:{
      // alert('FETCH_CSATDATA received action:' + action.type + '
		// CSATDATA: ' + action.CSATDATA + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_CSATDATA:{
     // ('FETCH_CSATDATA received action:' + action.type + '
		// CSATDATA: ' + action.CSATDATA + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_CSATDATA:{
     // alert('RECEIVE_CSATDATA received action:' + action.type +
		// ' CSATDATAInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_CSATDATA:{
      alert('FAIILED_FETCH_CSATDATA received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_CSATDATA:{
      return{
        ...state,
        fetching:false,
        CsatdataInfo: {}
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
const CsatdataModeledReducer = modeled(CsatdataReducer, ' Csatdata');

export default CsatdataModeledReducer;
