
const INITIAL_STATE = {
    recipes: [],
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
                recipes: [...state.recipes, action.recipe]
            }

        case 'REMOVE_RECIPE':
            return {
                ...state,
                recipes: state.recipes.filter(recipe => recipe._id !== action.recipeId)
            }

        case 'UPDATE_RECIPE':
            return {
                ...state,
                recipes: state.recipes.map(recipe => recipe._id === action.recipe._id ? action.recipe : recipe)
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