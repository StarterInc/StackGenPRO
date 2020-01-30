/*
 * Actions for CRUD ops
 *
 * {{GENERATED_MESSAGE}} 
 * 
 * {{LICENSE}} 
 * 
 * {{COMPANY_INFO}} 
 * 
 * {{CONTACT_INFO}}
 *
 *
 */
import axios from '../axios/axios';
import { actionTypes } from '../reducers/actionTypes'

/*
const {{objectnamevarname}}Data = {
{{#variables}}
    {{variablename}}: '{{variableval}}',
{{/variables}}
}
*/

export const reset{{objectname}} = () => ({
    type: actionTypes.RESET_{{objectnameupper}},
message: '',
    errorMessage: '',
    submitting: false
});

const _add{{objectname}} = ({{objectname}}) => ({
    type: actionTypes.ADD_{{objectnameupper}},
    message: 'Added new {{objectname}}',
    {{objectname}}
});

export const add{{objectname}} = ({{objectnamevarname}}Data) => {
    return (dispatch) => {
	    axios.post('{{objectname}}/', {{objectnamevarname}}Data)
	      .then(result => {
	        dispatch(_add{{objectname}}(result.data));
	      })
	      .catch(function (error) {
	          console.log("{{objectname}}Gen Redux add {{objectname}} Action failed: " + error);
	          dispatch(_{{objectnamevarname}}Error(`ERROR posting {{objectname}} ${JSON.stringify(error)}`));
	      });
    };
};

const _remove{{objectname}} = ({ id } = {}) => ({
    type: actionTypes.REMOVE_{{objectnameupper}},
    id,
    message: 'Removed {{objectname}}'
});

export const remove{{objectname}} = ({ id } = {}) => {
    return (dispatch) => {
        return axios.delete(`{{objectname}}/${id}`).then(() => {
            dispatch(_remove{{objectname}}({ id }));
        }).catch(function (error){
        	if(error.response && error.response.status === 404){
        		dispatch(_{{objectnamevarname}}Error(`Could not remove {{objectname}}: ${id}. Not found.`));
        	}else{
        		dispatch(_{{objectnamevarname}}Error(`ERROR removing {{objectname}} ${JSON.stringify(error)}`));
        	}
        });
    }
};

const _edit{{objectname}} = (id, updates) => ({
    type: actionTypes.EDIT_{{objectnameupper}},
    id,
    updates
});


export const edit{{objectname}} = (id, updates) => {
  return dispatch => {
    return axios
      .put(`{{objectname}}/${id}`, updates)
      .then(() => {
        dispatch(_edit{{objectname}}(id, updates));
      })
      .catch(function(error) {
        if (error.response && error.response.status === 404) {
          dispatch( _{{objectnamevarname}}Error(`Could not find {{objectname}}: ${id}`));
        } else {
          dispatch(
        	_{{objectnamevarname}}Error(`ERROR updating {{objectname}} ${JSON.stringify(error)}`)
          );
        }
      });
  };
};

const _list{{objectname}}s = ({{objectname}}s) => ({
    type: actionTypes.LIST_{{objectnameupper}}S,
    {{objectname}}s
});

export const list{{objectname}}s = (startIndex, limit) => {
	if(typeof(limit) === 'undefined'){
		limit = 100;
	}
	return (dispatch) => {
	    return axios.get(`{{objectname}}/list/${limit}`).then(result => {
	        const {{objectname}}s = [];
	
	        result.data.forEach(item => {
	            {{objectname}}s.push(item);
	        })
	
	        dispatch(_list{{objectname}}s({{objectname}}s));
	    }).catch(function (error){
    	if(error.response && error.response.status === 404){
    		dispatch(_{{objectnamevarname}}Error(`No results fetching {{objectname}} list.`));
    	}else{
    		dispatch(_{{objectnamevarname}}Error(`ERROR fetching {{objectname}} list ${JSON.stringify(error)}`));
        	}
        });
    };
};

const _get{{objectname}} = ({{objectname}}s) => ({
    type: actionTypes.GET_{{objectnameupper}},
    {{objectname}}s
});

export const get{{objectname}} = (id) => {
    return (dispatch) => {
        return axios.get(`{{objectname}}/${id}`).then(result => {
            dispatch(_get{{objectname}}(result.data));
        }).catch(function (error){
        	if(error.response && error.response.status === 404){
        		dispatch(_{{objectnamevarname}}Error(`No results found for {{objectname}}: ${id}.`));
        	}else{
        		dispatch(_{{objectnamevarname}}Error(`ERROR fetching {{objectname}} item ${JSON.stringify(error)}`));
        	}
        });
    };
};

const _{{objectnamevarname}}Error = (message) => ({
    type: actionTypes.{{objectnameupper}}_ERROR,
    errorMessage : message
});