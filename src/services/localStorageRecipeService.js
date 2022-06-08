import { storageService } from './storageService.js'
import { makeId } from './utilService.js'
import {httpService} from './http.service'

export const recipeService = {
    query,
    save,
    remove,
    getById,
    getEmptyRecipe
}

const STORAGE_KEY = 'recipes'
const ENDPOINT = 'dish'

const gDefaultRecipes = [
    { id: 'r1', title: 'schnitzel', type: 'main', onePot: false, tags: ['chicken', 'shabbat'], kosherStatus: 'meat', difficult: false, addedBy: 'admin', addedDate: Date.now(), quick: true, time: 30, link: '' },
    { id: 'r2', title: 'veggie stir-fry', type: 'main', onePot: true, tags: ['vegetarian', 'pasta', 'leftovers'], kosherStatus: 'parve', difficult: false, addedBy: 'admin', addedDate: Date.now(), quick: true, time: 30, link: '' },
    { id: 'r3', title: 'moroccan tilapia', type: 'main', onePot: false, tags: ['fish', 'shabbat', 'healthy'], kosherStatus: 'parve', difficult: false, addedBy: 'admin', addedDate: Date.now(), quick: true, time: 30, link: '' },
    { id: 'r4', title: 'tuna noodle casserole', type: 'main', onePot: true, tags: ['kid-friendly', 'pasta'], kosherStatus: 'dairy', difficult: false, addedBy: 'admin', addedDate: Date.now(), quick: true, time: 30, link: '' },
    { id: 'r5', title: 'veggie skewers', type: 'vegetable side', onePot: false, tags: ['kid-friendly', 'healthy', 'light'], kosherStatus: 'parve', difficult: true, addedBy: 'admin', addedDate: Date.now(), quick: false, time: 45, link: '' },
 
]

var gRecipes = _loadRecipes()

function query(filterBy) {
    let recipesToReturn = gRecipes;
    if (filterBy) {
        var { kosherStatus, type } = filterBy
        if (type) recipesToReturn = gRecipes.filter(recipe =>  (recipe.type === type))
        if (kosherStatus) recipesToReturn = gRecipes.filter(recipe =>  (recipe.kosherStatus === kosherStatus))
       
        // if (quick) recipesToReturn = recipesToReturn.filter(recipe => recipe.quick)
    }
    return Promise.resolve([...recipesToReturn]);
}

function getById(id) {
    const recipe = gRecipes.find(recipe => recipe.id === id)
    return Promise.resolve({ ...recipe })
}

function remove(id) {
    const idx = gRecipes.findIndex(recipe => recipe.id === id)
    gRecipes.splice(idx, 1)
    if (!gRecipes.length) gRecipes = gDefaultRecipes.slice()
    storageService.store(STORAGE_KEY, gRecipes)
    return Promise.resolve()
}

function save(recipeToSave) {
    if (recipeToSave.id) {
        const idx = gRecipes.findIndex(recipe => recipe.id === recipeToSave.id)
        gRecipes.splice(idx, 1, recipeToSave)
    } else {
        recipeToSave.id = makeId()
        recipeToSave.addedDate = Date.now()
        recipeToSave.addedBy = 'Guest'
        gRecipes.push(recipeToSave)
    }
    storageService.store(STORAGE_KEY, gRecipes)
    return Promise.resolve(recipeToSave);
}

function getEmptyRecipe() {
    return {
        title: '', 
        type: '', 
        onePot: null, 
        // tags: [], 
        kosherStatus: '', 
        difficult: null,
        quick: null,
        time: '', 
        link: '' ,

    }
}

function _loadRecipes() {
    let recipes = storageService.load(STORAGE_KEY)
    if (!recipes || !recipes.length) recipes = gDefaultRecipes
    storageService.store(STORAGE_KEY, recipes)
    return recipes
}

