import { userService } from "../../services/user-service";

export function login(userCred) {
    return async (dispatch) => {
        if (!userCred.fullname){
            try {
                const loggedinUser = await userService.login(userCred)
                dispatch({ type: 'SET_LOGGED_IN_USER', loggedinUser})
            } catch (error) {
                console.log('from user Actions error: ', error);        
                throw error        
            }
        } else {
            try {
                const loggedinUser = await userService.signup(userCred)
                dispatch({ type: 'SET_LOGGED_IN_USER', loggedinUser})
            } catch (error) {
                console.log('from user Actions error: ', error);        
                throw error
            }
        }
        
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({type: 'REMOVE_LOGGED_IN_USER'})
        } catch (error) {
            console.log('error: ', error);
            throw error
        }
    }
}