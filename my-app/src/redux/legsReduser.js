import { aircraftAPI } from "../API/API";

let initialState = {
    aircrafts: [],
    aircraftInfo: null,
    legs: null,
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
        default:
            return state;
    }
}



const setAircrafts = (aircrafts) => ({ type: 'SET_AC', aircrafts })
const setAircraftInfo = (aircraftInfo) => ({ type: 'SET_INFO', aircraftInfo })
const setAircraftLegs = (legs) => ({ type: 'SET_LEGS', legs })
const setAircraftLegsAddRes = (res) => ({ type: 'SET_LEGS_ADD_RES', res })
const setPreloader = (isLoading) => ({ type: 'SET_PRELOADER', isLoading })




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

export const getLegs = (msn) => {
    return async (dispatch) => {
        dispatch(setPreloader(true))
        const getLegsData = await aircraftAPI.getLegs(msn)
        dispatch(setPreloader(false))
        dispatch(setAircraftLegs(getLegsData))
    }
}

export const addLeg = (values, msn) => {
    return async (dispatch) => {
        dispatch(setPreloader(true))
        const addLegData = await aircraftAPI.addLeg(values, msn)
        dispatch(setAircraftLegsAddRes(addLegData))
        dispatch(setPreloader(false))
        if (addLegData.resultCode === 1) {
            console.log('added')
            dispatch(getAircraftInfo(msn))
            console.log(initialState.legs)
        }
        setTimeout(function () { dispatch(setAircraftLegsAddRes(null)); }, 1000);

    }
}

export default legsReduser