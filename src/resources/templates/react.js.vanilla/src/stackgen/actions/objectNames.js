import axios from '../axios/axios';

const _add{{objectname}} = ({{objectname}}) => ({
    type: 'ADD_{{objectnameupper}}',
    {{objectname}}
});

export const add{{objectname}} = ({{objectnamevarname}}Data = {
  {{#variables}}
    {{variablename}}: '{{variableval}}',
  {{/variables}}
}) => {
    return (dispatch) => {
        const {{objectnamevarname}} = {

          {{#variables}}
        		{{variablename}}: {{objectnamevarname}}Data.{{variablename}},
        	{{/variables}}
        };

        return axios.post('{{objectname}}/{param}', {{objectnamevarname}}).then(result => {
            dispatch(_add{{objectname}}(result.data));
        });
    };
};

const _remove{{objectname}} = ({ id } = {}) => ({
    type: 'REMOVE_{{objectnameupper}}',
    id
});

export const remove{{objectname}} = ({ id } = {}) => {
    return (dispatch) => {
        return axios.delete(`{{objectname}}/${id}`).then(() => {
            dispatch(_remove{{objectname}}({ id }));
        })
    }
};

const _edit{{objectname}} = (id, updates) => ({
    type: 'EDIT_{{objectnameupper}}',
    id,
    updates
});

export const edit{{objectname}} = (id, updates) => {
    return (dispatch) => {
        return axios.put(`{{objectname}}/${id}`, updates).then(() => {
            dispatch(_edit{{objectname}}(id, updates));
        });
    }
};

const _get{{objectname}}s = ({{objectname}}s) => ({
    type: 'GET_{{objectnameupper}}',
    {{objectname}}s
});

export const get{{objectname}}s = () => {
    return (dispatch) => {
        return axios.get('{{objectname}}/list/100').then(result => {
            const {{objectname}}s = [];

            result.data.forEach(item => {
                {{objectname}}s.push(item);
            });

            dispatch(_get{{objectname}}s({{objectname}}s));
        }).catch(error => {
          alert(error)
        });
    };
};
