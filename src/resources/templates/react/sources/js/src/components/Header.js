import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h2>{{appname}} DashBoard</h2>
        <h4>Data Management Application</h4>
        <div className='header__nav'>
        <NavLink to='/' activeClassName='activeNav' exact={true}>Dashboard</NavLink>
        <br/>
        {{#dataobjects}}
        <NavLink to='/{{objname}}/add' activeClassName='activeNav'>{{objname}}</NavLink>
        {{/dataobjects}}
        </div>
    </header>
);

export default Header;
