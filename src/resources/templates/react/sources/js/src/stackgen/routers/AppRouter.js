/**
 * Main router for the app data management views
 *
 * GENERATED FILE: DO NOT EDIT!
 *
 */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import ObjectMenu from '../components/ObjectMenu';
import FieldMapper from '../components/FieldMapper';
import Login from '../components/login';
import Logout from '../components/logout';

{{#dataobjects}}
import Add{{objname}} from '../components/{{objname}}/Add{{objname}}';
import Edit{{objname}} from '../components/{{objname}}/Edit{{objname}}';
{{/dataobjects}}
import NotFound from '../components/NotFound';

const AppRouter = () => (
    <BrowserRouter>
        <div className='container'>
            <Header />
            <Switch>
                <Route path="/" component={ObjectMenu} exact={true} />
                <Route path="/fieldmapper" component={FieldMapper} exact={true} />
                <Route path="/login" component={Login} exact={true} />
                <Route path="/logout" component={Logout} exact={true} />
                {{#dataobjects}}
                <Route path="/{{objname}}/" component={Add{{objname}}} />
                <Route path="/{{objname}}/edit/:id" component={Edit{{objname}}} />
                {{/dataobjects}}
                <Route component={NotFound} />

            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
