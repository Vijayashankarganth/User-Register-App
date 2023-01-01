import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../Reducer/userReducer'
import countryReducer from '../Reducer/countryReducer'
import adminUserReducer from '../Reducer/adminUserReducer'
const ConfigureStore = () => {
    const store=createStore(combineReducers({
        user:userReducer,
        country:countryReducer,
        userList:adminUserReducer
    }),applyMiddleware(thunk))
    return store
}

export default ConfigureStore