import { httpService } from './http.service'
// import { storageService } from './async-storage.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
var gWatchedUser = null;

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
    getGuestUser,
}

async function getUsers() {
    return await httpService.get(`user`)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    gWatchedUser = user;
    return user;
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    socketService.emit('set-user-socket', user._id);
    if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    socketService.emit('set-user-socket', user._id);
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.emit('unset-user-socket');
    return await httpService.post('auth/logout')
}


function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    const currUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
    return currUser
}

function getGuestUser() {
    return {
        "_id": "624298a9e48762573484a9e5",
        "username": "Guest",
        "fullname": "Guest User",
        "imgUrl": "../src/assets/svgs/guest.svg",
    }

}

const users = [
    {
        "_id": 'u105',
        "fullname": "Yoni Lazarus",
        "username": "Yoni",
        "password": "123", "imgUrl": "https://res.cloudinary.com/cajan22a/image/upload/v1648369158/WhatsApp_Image_2022-03-27_at_11.02.12_gmtcrl.jpg",
    },
    {
        "_id": 'u106',
        "fullname": "Almog Ben-Binyamin",
        "username": "Almog",
        "imgUrl": "https://res.cloudinary.com/cajan22a/image/upload/v1648369158/WhatsApp_Image_2021-12-10_at_16.38.26_sft38h.jpg",
    },
    {
        "_id": 'u107',
        "fullname": "Zviki Zaks",
        "username": "Zviki",
        "imgUrl": "https://res.cloudinary.com/cajan22a/image/upload/v1648369158/WhatsApp_Image_2022-03-27_at_11.17.15_rq2ja9.jpg",
    },
]