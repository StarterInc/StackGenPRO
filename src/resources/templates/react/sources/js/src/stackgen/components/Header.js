import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => (		
	<Navbar bg="light" expand="lg">
	  <Navbar.Brand href="#home">
		  <div>
			  <h2>{{appname}} ObjectMenu</h2>
			  <h5>Data Management Application</h5>
		  </div>
	  </Navbar.Brand>
	  <Navbar.Toggle aria-controls="basic-navbar-nav" />
	  <Navbar.Collapse id="basic-navbar-nav">
	    <Nav className="mr-auto">
		    <Nav.Link> 
		      	<NavLink to='/' activeClassName='activeNav' exact={true}>Dashboard</NavLink>
		    </Nav.Link>
		    <Nav.Link> 
		    	<NavLink to={`/fieldmapper`}>Field Mapper</NavLink>
		    </Nav.Link> 
		    
		    <NavLink to='/swagger' activeClassName='activeNav'>API Swagger UI</NavLink>
	    	<NavLink to='/api-docs' activeClassName='activeNav'>API (JSON)</NavLink>
	    	
	    	<NavLink to='/login' activeClassName='activeNav'>Login</NavLink>
			
	    	
		    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
		      
		        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
		        <NavDropdown.Divider />
			      
			    {{#dataobjects}}
			    	<NavDropdown.Item >
				      	<NavLink to='/{{objname}}/add' activeClassName='activeNav'>{{objname}}</NavLink>
				      	</NavDropdown.Item>
				{{/dataobjects}}

			</NavDropdown>
		      
		    <Form inline>
			    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
			    <Button variant="outline-success">Search</Button>
		    </Form>
	    </Nav>
	    
	  </Navbar.Collapse>
	</Navbar>
);

export default Header;
