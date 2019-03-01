import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';
import getAppStore from './store/store';

{{#dataobjects}}
import { get{{objname}}s } from './actions/{{objname}}s'
{{/dataobjects}}

import './stackgen/styles/styles.scss';

/**
  Main entrypoint of the StackGen React app.

  ** GENERATED FILE DO NOT EDIT! **

*/
const store = getAppStore();

const template = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

/**
 * load each Microservice into base store
 * 
 *  TODO: implement a capability to lazy load... 
 *  
 *  TODO: implement offline capability / cache
 * 
 * @returns
 */
function initAllData(){
  var ret = {
  {{#dataobjects}}
  	...
   	get{{objname}}s(),
  {{/dataobjects}}
  }
  return ret;
}

store.dispatch(initAllData()).then(() => {
    ReactDOM.render(template, document.getElementById('root'));
});
