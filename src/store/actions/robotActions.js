import { robotService } from "../../services/robotService"

export function loadRobots() {
    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().robotModule
            const robots = await robotService.query(filterBy)
            dispatch({ type: 'SET_ROBOTS', robots })
        } catch (err) {
            console.log('err:', err)
        }

    }
}

export function removeRobot(robotId) {
    return async (dispatch) => {
        try {
            await robotService.remove(robotId)
            dispatch({ type: 'REMOVE_ROBOT', robotId })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}