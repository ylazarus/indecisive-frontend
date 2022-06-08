
const INITIAL_STATE = {
    recipes: null,
    searchBy: null
}

export function recipeReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_RECIPES':
            return {
                ...state,
                recipes: action.recipes
            }

        case 'ADD_RECIPE':
            return {
                ...state,
                // recipes: [...state.recipes, action.recipe] // don't want to update state, don't need more than three, change to addRecipes: if adding admin page
            }

        case 'REMOVE_RECIPE':
            return {
                ...state,
                recipes: state.recipes.filter(recipe => recipe.id !== action.recipeId)
            }

        case 'UPDATE_RECIPE':
            return {
                ...state,
                recipes: state.recipes.map(recipe => recipe.id === action.recipe.id ? action.recipe : recipe)
            }
        case 'SET_SEARCH_BY':
            return {
                ...state,
                searchBy: {...action.searchBy}
            }

        default:
            return state;
    }
}