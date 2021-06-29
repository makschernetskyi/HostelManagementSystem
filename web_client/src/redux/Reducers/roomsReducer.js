import axios from 'axios';


const API_URL = '/api/v0/'

const ROOMS_FETCH_ROOMS = 'ROOMS-FETCH-ROOMS';
const ROOMS_FETCHING_ERROR = 'ROOMS-FETCHING-ERROR';


const fetchHostelFromAPI = async (pk) =>{
	if(typeof pk !== 'number')
		throw new TypeError('hostel primary key is not type of number')
	const hostel = await axios.get(API_URL+`hostels/${pk}/`);
	return hostel
}

const fetchRoomsFromAPI = async (roomsURLs = []) =>{
	let response = []
	if(roomsURLs.length)
		response =  await Promise.all(
							roomsURLs.map(
								url => axios.get(url))
						)
	return response.map(room => room?.data)
}


const fetchRoomsActionCreator = (data) =>{
	const action = {
			type: ROOMS_FETCH_ROOMS,
			data: data
		}
	return action
}

// const fetchingErrorActionCreator = (error) =>{
// 	const action = {
// 			type: ROOMS_FETCHING_ERROR,
// 			error: error
// 		}
// 	return action
//}

export function fetchRooms(hostelPk){
	return (dispatch)=>{
		return fetchHostelFromAPI(hostelPk)
			.then(
				hostel => hostel.data.rooms
			)
			.then(
				roomsURLs => fetchRoomsFromAPI(roomsURLs)
			)
			.then(
				rooms => dispatch(fetchRoomsActionCreator(rooms))
			)
	}
}


const initialState = {
	rooms: [],
	errors: []
}


const roomsReducer = (state = initialState, action) =>{
	switch(action.type){
		case ROOMS_FETCH_ROOMS:
		console.info(action.data)
			state.rooms = action.data;
			return state
		case ROOMS_FETCHING_ERROR:
			state.errors = action.error;
			return state
		default:
			return state;
	}
}

export default roomsReducer;