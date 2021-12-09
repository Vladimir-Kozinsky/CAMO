import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import legsReduser from './legsReduser'

let rootReduser = combineReducers({
    legs: legsReduser
})

let store = createStore(rootReduser, applyMiddleware(thunk) )
window.store = store

export default store
