/*
 * Action for CRUD ops
 * 
 * GENERATED FILE: DO NOT EDIT!
 *
 */
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

        axios.post('{{objectname}}/{param}', {{objectnamevarname}})
          .then(result => {
            dispatch(_add{{objectname}}(result.data));
          })
          .catch(function (error) {
            dispatch(_{{objectnamevarname}}Error(`ERROR posting {{objectname}} ${JSON.stringify(error)}`));
            console.log(error);
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
        }).catch(function (error){
            dispatch(_{{objectnamevarname}}Error(`ERROR removing {{objectname}} ${JSON.stringify(error)}`));
        });
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
        }).catch(function (error){
            dispatch(_{{objectnamevarname}}Error(`ERROR updating {{objectname}} ${JSON.stringify(error)}`));
        });
    }
};

const _get{{objectname}}s = ({{objectname}}s) => ({
    type: 'GET_{{objectnameupper}}S',
    {{objectname}}s
});

export const get{{objectname}}s = () => {
    return (dispatch) => {
        return axios.get('{{objectname}}/list/100').then(result => {
            const {{objectname}}s = [];

            result.data.forEach(item => {
                {{objectname}}s.push(item);
            })

            dispatch(_get{{objectname}}s({{objectname}}s));
        }).catch(function (error){
            dispatch(_{{objectnamevarname}}Error(`ERROR fetching {{objectname}} list ${JSON.stringify(error)}`));
        });
    };
};

const _{{objectnamevarname}}Error = ({ message } = {}) => ({
    type: '{{objectnameupper}}_ERROR',
    message
});