import { aircraftAPI } from "../API/API";

let initialState = {
    aircrafts: [],
    aircraftInfo: null,
    legs: null,
    sortedLegs: null,
    legsAddRes: null,
    isPreloader: true
}


const legsReduser = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AC':
            return {
                ...state,
                aircrafts: action.aircrafts,
            }
        case 'SET_INFO':
            return {
                ...state,
                aircraftInfo: action.aircraftInfo,
            }
        case 'SET_LEGS':
            return {
                ...state,
                legs: action.legs,
            }
        case 'SET_LEGS_ADD_RES':
            return {
                ...state,
                legsAddRes: action.res,
            }
        case 'SET_PRELOADER':
            return {
                ...state,
                isPreloader: action.isLoading,
            }
        case 'SET_SORTED_LEGS':
            return {
                ...state,
                sortedLegs: action.sortedLegs,
            }
        default:
            return state;
    }
}



const setAircrafts = (aircrafts) => ({ type: 'SET_AC', aircrafts })
const setAircraftInfo = (aircraftInfo) => ({ type: 'SET_INFO', aircraftInfo })
const setAircraftLegs = (legs) => ({ type: 'SET_LEGS', legs })
const setResponse = (res) => ({ type: 'SET_LEGS_ADD_RES', res })
const setPreloader = (isLoading) => ({ type: 'SET_PRELOADER', isLoading })
const setSortedLegs = (sortedLegs) => ({ type: 'SET_SORTED_LEGS', sortedLegs })




export const getAircrafts = () => {
    return async (dispatch) => {
        const aircrafts = await aircraftAPI.getAircraftsList()
        dispatch(setPreloader(false))
        dispatch(setAircrafts(aircrafts))
    }
}

export const getAircraftInfo = (msn) => {
    return async (dispatch) => {
        dispatch(setPreloader(true))
        const getAircraftData = await aircraftAPI.getAircraftInfo(msn)
        dispatch(setPreloader(false))
        dispatch(setAircraftInfo(getAircraftData))
    }
}

export const getLegs = (msn, from = "1980-01-01", to = "2025-01-01") => {
    return async (dispatch) => {
        dispatch(setPreloader(true))
        const getLegsData = await aircraftAPI.getLegs(msn, from, to)
        dispatch(setPreloader(false))
        dispatch(setAircraftLegs(getLegsData))
    }
}

export const addLeg = (values, msn) => {
    return async (dispatch) => {
        dispatch(setPreloader(true))
        const addLegData = await aircraftAPI.addLeg(values, msn)
        dispatch(setResponse(addLegData))
        dispatch(setPreloader(false))
        if (addLegData.resultCode === 1) {
            console.log('added')
            dispatch(getLegs(msn))
            dispatch(getAircraftInfo(msn))
        }
        setTimeout(function () { dispatch(setResponse(null)); }, 1000);

    }
}

export const redLeg = (values, msn, legId) => {
    return async (dispatch) => {
        dispatch(setPreloader(true))
        const redLegData = await aircraftAPI.redLeg(values, msn, legId)
        dispatch(setResponse(redLegData))
        dispatch(setPreloader(false))
        if (redLegData.resultCode === 1) {
            console.log('red')
            dispatch(getLegs(msn))
            dispatch(getAircraftInfo(msn))
        }
        setTimeout(function () { dispatch(setResponse(null)); }, 1000);
    }
}

export const delLeg = (msn, legId) => {
    return async (dispatch) => {
        dispatch(setPreloader(true))
        const delLegData = await aircraftAPI.delLeg(msn, legId)
        dispatch(setResponse(delLegData))
        dispatch(setPreloader(false))
        if (delLegData.resultCode === 1) {
            console.log('del')
            dispatch(getLegs(msn))
            dispatch(getAircraftInfo(msn))
        }
        setTimeout(function () { dispatch(setResponse(null)); }, 1000);

    }
}

export const getSortedLegs = (msn, from, to) => {
    return async (dispatch) => {
        dispatch(setPreloader(true))
        const getSortedLegsData = await aircraftAPI.getSortedLegs(msn, from, to)
        dispatch(setPreloader(false))
        dispatch(setSortedLegs(getSortedLegsData))
    }
}

export default legsReduser