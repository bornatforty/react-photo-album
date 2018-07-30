import {createStore} from 'redux' //allows updating state, registering listeners.

import albumAppReducer from './albumAppReducer' //change the app state in response to actions

const store = createStore(albumAppReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store