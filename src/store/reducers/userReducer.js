
const INITIAL_STATE = {
    loggedInUser: null
}


export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_LOGGED_IN_USER':
            return{
                ...state,
                loggedInUser: action.loggedInUser
            }
        case 'REMOVE_LOGGED_IN_USER':
            return{
                ...state,
                loggedInUser: null
            }
    
        default:
            return state;
    }
}