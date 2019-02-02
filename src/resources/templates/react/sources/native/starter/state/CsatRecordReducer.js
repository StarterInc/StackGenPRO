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

  SET_CSATRECORD,
  SET_LAST_UPDATED,
  FETCH_CSATRECORD,

  CREATE_CSATRECORD,
  RECEIVE_CSATRECORD,

  FAILED_CSATRECORD,
  FAILED_FETCH_CSATRECORD,
  
  LOGOUT_CSATRECORD,
  RESET_PASSWORD

} from '../state/CsatRecordAction.js'

// define the state tree for the CsatRecord
import initialState from "../state/InitialState"

function CsatRecordReducer(state = initialState, action) {

alert('CsatRecordInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_CSATRECORD:{
      // alert('FETCH_CSATRECORD received action:' + action.type + '
		// CSATRECORD: ' + action.CSATRECORD + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_CSATRECORD:{
     // ('FETCH_CSATRECORD received action:' + action.type + '
		// CSATRECORD: ' + action.CSATRECORD + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_CSATRECORD:{
     // alert('RECEIVE_CSATRECORD received action:' + action.type +
		// ' CSATRECORDInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_CSATRECORD:{
      alert('FAIILED_FETCH_CSATRECORD received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_CSATRECORD:{
      return{
        ...state,
        fetching:false,
        CsatRecordInfo: {}
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
const CsatRecordModeledReducer = modeled(CsatRecordReducer, ' CsatRecord');

export default CsatRecordModeledReducer;
