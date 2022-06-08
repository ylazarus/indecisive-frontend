import { recipeService } from "../../services/recipeService"

export function loadRecipes() {
    return async (dispatch, getState) => {
        try {
            const { searchBy } = getState().recipeModule
            console.log('in actions, search by is: ', searchBy);
            const recipes = await recipeService.query(searchBy)
            dispatch({ type: 'SET_RECIPES', recipes })
        } catch (err) {
            console.log('err:', err)
        }

    }
}

export function addRecipe(recipe) {
    console.log('in actions, recipe is: ', recipe);
    return async (dispatch) => {
        try {
            await recipeService.save(recipe)
            if (recipe.id) dispatch({type: 'UPDATE_RECIPE', recipe})
            else dispatch({type: 'ADD_RECIPE', recipe})
        } catch (error) {
            throw error
            // console.log('error:', error);
        }
    }
}

export function removeRecipe(recipeId) {
    return async (dispatch) => {
        try {
            await recipeService.remove(recipeId)
            dispatch({ type: 'REMOVE_RECIPE', recipeId })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setSearchBy(searchBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_SEARCH_BY', searchBy })
    }
}