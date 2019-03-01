
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
  //  categories,
  // roles,
  // userInfo,
})

// TODO: implement Redux devtools
// https://github.com/zalmoxisus/redux-devtools-extension#usage
export default () => {
    return createStore(CombinedReducer,
      applyMiddleware(thunk));
};
