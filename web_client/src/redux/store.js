import * as Redux from 'redux';
import thunk from 'redux-thunk';
import hostelsReducer from './Reducers/hostelsReducer.js'
import roomsReducer from './Reducers/roomsReducer.js'
import tenantsReducer from './Reducers/tenantsReducer.js'
import tenantReducer from './Reducers/tenantReducer.js'
import addTenantReducer from './Reducers/addTenantReducer.js'
import editTenantReducer from './Reducers/editTenantReducer.js'
import addRoomReducer from './Reducers/addRoomReducer.js'
import editRoomReducer from './Reducers/editRoomReducer.js'
import addHostelReducer from './Reducers/addHostelReducer.js'
import editHostelReducer from './Reducers/editHostelReducer'

const reducers = Redux.combineReducers({
	hostelsPage: hostelsReducer,
	roomsPage: roomsReducer,
	tenantsPage: tenantsReducer,
	tenantPage: tenantReducer,
	addTenantPage: addTenantReducer,
	editTenantPage: editTenantReducer,
	addRoomPage: addRoomReducer,
	editRoomPage: editRoomReducer,
	addHostelPage: addHostelReducer,
	editHostelPage: editHostelReducer
})

const store = Redux.createStore(
		reducers,
		Redux.applyMiddleware(thunk)
	);
export default store;