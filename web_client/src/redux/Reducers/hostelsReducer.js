import axios from 'axios';


const API_URL = '/api/v0/'

const HOSTELS_FETCH_HOSTELS = 'HOSTELS-FETCH-HOSTELS';
const HOSTELS_FETCHING_ERROR = 'HOSTELS-FETCHING-ERROR';

const fetchHostelsFromAPI = async () =>{
	return await axios.get(API_URL+'hostels/');
}


const fetchHostelsActionCreator = (data) =>{
	const action = {
			type: HOSTELS_FETCH_HOSTELS,
			data: data
		}
	return action
}

const fetchingErrorActionCreator = (error) =>{
	const action = {
			type: HOSTELS_FETCHING_ERROR,
			error: error
		}
	return action
}

export function fetchHostels(){
	return (dispatch)=>{
		return fetchHostelsFromAPI()
			.then(
				response=>{
					return dispatch(fetchHostelsActionCreator(response.data));
				},
				error=>{
					return dispatch(fetchingErrorActionCreator(error))
				}
			)
	}
	// .catch(error=>{
	// 	const action = {
	// 		type: HOSTELS_FETCHING_ERROR,
	// 		error: error
	// 	}
	// 	dispatch(action);
	// })
}


const initialState = {
	hostels: [],
	errors: []
}


const hostelsReducer = (state = initialState, action) =>{
	switch(action.type){
		case HOSTELS_FETCH_HOSTELS:
			state.hostels = action.data;
			return state;
		case HOSTELS_FETCHING_ERROR:
			console.log(HOSTELS_FETCHING_ERROR);
			state.errors.push(action.error);
			return state;
		default:
			return state;
	}
}

export default hostelsReducer;