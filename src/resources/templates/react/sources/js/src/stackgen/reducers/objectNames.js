/**
 * Reducer for {{objectnamevarname}}
 * 
 * GENERATED FILE: DO NOT EDIT!
 * 
 */
const {{objectnamevarname}}sReducerDefaultState = [];

export default (state = {{objectnamevarname}}sReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_{{objectnameupper}}':
            return [
                ...state,
                action.{{objectnamevarname}}
            ];
        case 'REMOVE_{{objectnameupper}}':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_{{objectnameupper}}':
            return state.map(({{objectnamevarname}}) => {
                if ({{objectnamevarname}}.id === action.id) {
                    return {
                        ...{{objectnamevarname}},
                        ...action.updates
                    };
                } else {
                    return {{objectnamevarname}};
                }
            });
        case 'GET_{{objectnameupper}}S':
            return action.{{objectnamevarname}}s;
        default:
            return state;
    }
};
