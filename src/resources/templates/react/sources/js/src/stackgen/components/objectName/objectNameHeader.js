/**
 * {{objectname}} Data Object row header
 * 
 * {{GENERATED_MESSAGE}} 
 * 
 * {{LICENSE}} 
 * 
 * {{COMPANY_INFO}} 
 * 
 * {{CONTACT_INFO}}
 * 
 */
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const {{objectname}}Header = () => (
	  <>
    <thead>
  		  <tr>
			  <th colspan='2'>
			  <br/><br/><br/>
				  <Link to={`/{{objectname}}/add/`}>
				  <Button size="sm" variant={'success'}>
				  	<FaPlusCircle size='20' /> New {{objectname}}
	              </Button>
              </Link>
          
			  </th>
  			  {{#variables}}
  				  <th>
  				  {{variablename}}
  				  </th>
  			  {{/variables}}
  		    </tr>
      </thead>
	  </>
  );

export default ({{objectname}}Header);
