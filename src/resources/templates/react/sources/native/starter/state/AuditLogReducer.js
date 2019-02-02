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

  SET_AUDITLOG,
  SET_LAST_UPDATED,
  FETCH_AUDITLOG,

  CREATE_AUDITLOG,
  RECEIVE_AUDITLOG,

  FAILED_AUDITLOG,
  FAILED_FETCH_AUDITLOG,
  
  LOGOUT_AUDITLOG,
  RESET_PASSWORD

} from '../state/AuditLogAction.js'

// define the state tree for the AuditLog
import initialState from "../state/InitialState"

function AuditLogReducer(state = initialState, action) {

alert('AuditLogInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_AUDITLOG:{
      // alert('FETCH_AUDITLOG received action:' + action.type + '
		// AUDITLOG: ' + action.AUDITLOG + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_AUDITLOG:{
     // ('FETCH_AUDITLOG received action:' + action.type + '
		// AUDITLOG: ' + action.AUDITLOG + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_AUDITLOG:{
     // alert('RECEIVE_AUDITLOG received action:' + action.type +
		// ' AUDITLOGInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_AUDITLOG:{
      alert('FAIILED_FETCH_AUDITLOG received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_AUDITLOG:{
      return{
        ...state,
        fetching:false,
        AuditLogInfo: {}
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
const AuditLogModeledReducer = modeled(AuditLogReducer, ' AuditLog');

export default AuditLogModeledReducer;
