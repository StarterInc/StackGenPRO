/**
 * {{objectname}} Data Object row header
 * 
 * {{GENERATED_MESSAGE}}
 * {{LICENSE}}
 * {{COMPANY_INFO}}
 * {{CONTACT_INFO}}
 *
 */
import React from 'react';

const {{objectname}}Header = () => (
	  <>
    <thead>
  		  <tr>
  			  {{#variables}}
  				  <th>
  				  {{variablename}}
  				  </th>
  			  {{/variables}}
    			  <th></th>
    			  <th></th>
  		    </tr>
      </thead>
	  </>
  );

export default ({{objectname}}Header);
