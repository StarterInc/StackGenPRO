/**
 * Main entrypoint of the StackGen React app.
 *
 * {{GENERATED_MESSAGE}}
 * {{LICENSE}}
 * {{COMPANY_INFO}}
 * {{CONTACT_INFO}}}

 *
 *
 */
import React from 'react';
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom';
import AppRouter from './stackgen/routers/AppRouter';
import getAppStore from './stackgen/store/store';

// import the generated data object CRUD actions
{{#dataobjects}}
// import { get{{objname}}s } from './stackgen/actions/{{objname}}s'
{{/dataobjects}}

import './stackgen/styles/styles.scss';

const store = getAppStore();

const appRendering = (
	<Provider store={store}>
	    <AppRouter />
	</Provider>
);

/**
 * TODO: load each Microservice into base store
 * TODO: implement a capability to lazy load...
 * TODO: implement offline capability / cache
 *
 */
// function initAllData(){
 // var ret = {

  {{#dataobjects}}
  //... 	get{{objname}}s(),
  {{/dataobjects}}
 // }
 //  return {};
// }

  // TODO: fix data fetch here not hardcoded to getUsers()
// store.dispatch(getUsers()).then(() => {
    ReactDOM.render(appRendering, document.getElementById('root'));
// });
