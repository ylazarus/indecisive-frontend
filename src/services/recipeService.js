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

const ENDPOINT = 'dish'

async function query(filterBy = {}) {
    console.log('going to search in db', filterBy); 
    return await httpService.get(ENDPOINT, filterBy)

}

async function getById(id) {
    return await httpService.get(`${ENDPOINT}/${id}`)

}

async function remove(id) {
    return await httpService.delete(`${ENDPOINT}/${id}`)

}

async function save(dish) {
    const updatedDish = dish.id
        ? await httpService.put(`${ENDPOINT}/${dish.id}`, dish)
        : await httpService.post(ENDPOINT, dish)
    return updatedDish
}


function getEmptyRecipe() {
    return {
        title: '', 
        type: '', 
        onePot: false, 
        // tags: [], 
        kosherStatus: '', 
        difficult: false,
        quick: null,
        time: '', 
        link: '' ,

    }
}



