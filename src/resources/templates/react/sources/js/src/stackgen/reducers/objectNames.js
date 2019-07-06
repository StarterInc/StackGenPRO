/**
 * Reducer for {{objectname}}
 * 
 * GENERATED FILE: DO NOT EDIT!
 * 
 */
const {{objectname}}sReducerDefaultState = [];

export default (state = {{objectname}}sReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_{{objectnameupper}}':
            return [
                ...state,
                action.{{objectname}}
            ];
        case 'REMOVE_{{objectnameupper}}':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_{{objectnameupper}}':
            return state.map(({{objectname}}) => {
                if ({{objectname}}.id === action.id) {
                    return {
                        ...{{objectname}},
                        ...action.updates
                    };
                } else {
                    return {{objectname}};
                }
            });
        case 'GET_{{objectnameupper}}S':
            return action.{{objectname}}s;

        case '{{objectnameupper}}_ERROR':
            return {
                errorMessage: action.errorMessage
            };

        default:
            return state;
    }
};