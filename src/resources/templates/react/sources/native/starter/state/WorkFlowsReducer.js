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

  SET_WORKFLOWS,
  SET_LAST_UPDATED,
  FETCH_WORKFLOWS,

  CREATE_WORKFLOWS,
  RECEIVE_WORKFLOWS,

  FAILED_WORKFLOWS,
  FAILED_FETCH_WORKFLOWS,
  
  LOGOUT_WORKFLOWS,
  RESET_PASSWORD

} from '../state/WorkFlowsAction.js'

// define the state tree for the WorkFlows
import initialState from "../state/InitialState"

function WorkFlowsReducer(state = initialState, action) {

alert('WorkFlowsInfo Reducer called: ' );
// action: ' + JSON.stringify(action.type));
  switch (action.type) {

    case FETCH_WORKFLOWS:{
      // alert('FETCH_WORKFLOWS received action:' + action.type + '
		// WORKFLOWS: ' + action.WORKFLOWS + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case CREATE_WORKFLOWS:{
     // ('FETCH_WORKFLOWS received action:' + action.type + '
		// WORKFLOWS: ' + action.WORKFLOWS + ' password: '
		// + action.password)
      return{
          ...state,
          fetching:true,
        }
        break;
    }

    case RECEIVE_WORKFLOWS:{
     // alert('RECEIVE_WORKFLOWS received action:' + action.type +
		// ' WORKFLOWSInfo: ' + JSON.stringify(action.payload))
      return{
        ...state,
        ...action.payload,
        fetching:false,
      }
      break;
    }

    case FAILED_FETCH_WORKFLOWS:{
      alert('FAIILED_FETCH_WORKFLOWS received action:' + action.type)
      return [
        {
          ...state,
          fetching:false,
          error:action.payload,
        }
      ];
      break;
    }

    case LOGOUT_WORKFLOWS:{
      return{
        ...state,
        fetching:false,
        WorkFlowsInfo: {}
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
const WorkFlowsModeledReducer = modeled(WorkFlowsReducer, ' WorkFlows');

export default WorkFlowsModeledReducer;
