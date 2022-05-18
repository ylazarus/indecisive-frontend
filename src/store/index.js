import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { recipeReducer } from "./reducers/recipeReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const rootReducer = combineReducers({
    recipeModule: recipeReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

window.myStore = store