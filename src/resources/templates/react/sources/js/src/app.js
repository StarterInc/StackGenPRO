import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';
import getAppStore from './store/store';

{{#dataobjects}}
import { get{{objname}}s } from './actions/{{objname}}s'
{{/dataobjects}}

import './styles/styles.scss';

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

store.dispatch(get{{objectname}}s()).then(() => {
    ReactDOM.render(template, document.getElementById('app'));
});
