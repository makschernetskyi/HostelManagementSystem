import axios from 'axios';


const API_URL = '/api/v0/'

const TENANTS_FETCH_TENANTS = 'TENANTS-FETCH-TENANTS';
const TENANTS_FETCHING_ERROR = 'TENANTS-FETCHING-ERROR';


const fetchRoomFromAPI = async (id) =>{
	if(typeof id !== 'number')
		throw new TypeError('room id is not type of number')
	const response = await axios.get(API_URL+`rooms/${id}/`)
	return response.data;
}

const fetchTenantsFromAPI = async (tenantsURLs = []) =>{
	let response = []
	if(tenantsURLs.length)
		response =  await Promise.all(
							tenantsURLs.map(
								url => axios.get(url))
						)
	return response.map(tenantResponse => tenantResponse.data)
}


const fetchTenantsActionCreator = (tenants, amountOfBeds) =>{
	const action = {
			type: TENANTS_FETCH_TENANTS,
			data: {
				tenants: tenants,
				amountOfBeds: amountOfBeds
			}
		}
	return action
}

// const fetchingErrorActionCreator = (error) =>{
// 	const action = {
// 			type: TENANTS_FETCHING_ERROR,
// 			error: error
// 		}
// 	return action
//}


const fetchTenantsFromAPIAndPassAmountOfBeds = async (tenantsURLs, amountOfBeds) =>{
	const tenants = await fetchTenantsFromAPI(tenantsURLs)
	return [tenants, amountOfBeds]
}


export function fetchTenants(roomId){
	return (dispatch)=>{
		return fetchRoomFromAPI(roomId)
			.then(
				room => [room.tenants, room.amount_of_beds]
			)
			.then(
				([tenantsURLs, amountOfBeds]) => fetchTenantsFromAPIAndPassAmountOfBeds(tenantsURLs, amountOfBeds)
			)
			.then(
				([tenants, amountOfBeds]) => dispatch(fetchTenantsActionCreator(tenants, amountOfBeds))
			)
	}
}


const initialState = {
	tenants: [],
	bedsAmount: 0,
	errors: []
}


const tenantsReducer = (state = initialState, action) =>{
	switch(action.type){
		case TENANTS_FETCH_TENANTS:
			state.tenants = action.data.tenants;
			state.bedsAmount = action.data.amountOfBeds;
			return state
		case TENANTS_FETCHING_ERROR:
			state.errors = action.error;
			return state
		default:
			return state;
	}
}

export default tenantsReducer;