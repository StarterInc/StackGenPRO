/**
 * Create the Redux Store
 * 
 * GENERATED FILE: DO NOT EDIT!
 *  
 */
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'

{{#dataobjects}}
import {{objname}}s from '../reducers/{{objname}}s';
{{/dataobjects}}
import thunk from 'redux-thunk';

// these reducers will appear in the State as "xyz:resultingvalue()"
const CombinedReducer = combineReducers({
  {{#dataobjects}}
  {{objname}}s,
  {{/dataobjects}}

// TODO: builtins
  // appStatus,
  // locations,
  // maps,
  // categories,
  // roles,
  // userInfo,
})

export default () => {
    return createStore(CombinedReducer,
      applyMiddleware(thunk));
};