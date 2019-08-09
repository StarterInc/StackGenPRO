/**
 * Reducer for {{objectname}}

 * {{GENERATED_MESSAGE}}
 * {{LICENSE}}
 * {{COMPANY_INFO}}
 * {{CONTACT_INFO}}

 * 
 */
import {actionTypes} from "./actionTypes";

const {{objectname}}sReducerDefaultState = [];

export default (state = {{objectname}}sReducerDefaultState, action) => {

    switch (action.type) {

        case actionTypes.ADD_{{objectnameupper}}:
            return {
                ...state,
                ...action.{{objectnamevarname}},
                submitting:false,
                message : action.message,
                errorMessage: action.errorMessage
            };

        case actionTypes.REMOVE_{{objectnameupper}}:
            return state.filter(({ id }) => id !== action.id);

        case actionTypes.EDIT_{{objectnameupper}}:
            return state.map(({{objectname}}) => {
                if ({{objectname}}.id === action.id) {
                    return {
                        ...{{objectname}},
                        ...action.updates,
                        submitting:false,
                        message : action.message,
                        errorMessage: action.errorMessage
                    };
                } else {
                    return {{objectname}};
                }
            });

        case actionTypes.RESET_{{objectnameupper}}:
            return {
                ...state,
                message : action.message,
                errorMessage: action.errorMessage
            };

        case actionTypes.LIST_{{objectnameupper}}S:
            return action.{{objectname}}s;            
            
            
        case actionTypes.GET_{{objectnameupper}}:
                return {
                	state,
                	{{objectnamevarname}}: ...action.{{objectname}},
                	selectedId: action.
                    submitting:false,
                    message : action.message,
                    errorMessage: action.errorMessage
                };
            });

        case actionTypes.{{objectnameupper}}_ERROR:
            return {
                ...state,
                message : action.message,
                errorMessage: action.errorMessage
            };

        default:
            return state;
    }
};