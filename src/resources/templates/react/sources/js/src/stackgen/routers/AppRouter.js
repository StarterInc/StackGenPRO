import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import DashBoard from '../components/DashBoard';

// TODO: move out StackGen APP Specific
import FieldMapper from '../components/FieldMapper';


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
                <Route path="/" component={DashBoard} exact={true} />
                <Route path="/fieldmapper" component={FieldMapper} exact={true} />
                {{#dataobjects}}
                <Route path="/{{objname}}/" component={Add{{objname}}} />
                <Route path="/{{objname}}/edit" component={Edit{{objname}}} />
                {{/dataobjects}}
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
