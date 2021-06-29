import axios from 'axios';
import convertObjectCamelCaseFieldNamesToSnakeCase from '../coverterCamelCaseToSnakeCase'



const EDIT_ROOM_ROOM_NAME_INPUT_CHANGED = 'EDIT-ROOM-ROOM-NAME-INPUT-CHANGED'
const EDIT_ROOM_ROOM_NUMBER_INPUT_CHANGED = 'EDIT-ROOM-ROOM-NUMBER-CHANGED'
const EDIT_ROOM_AMOUNT_OF_BEDS_INPUT_CHANGED = 'EDIT-ROOM-AMOUNT-OF-BEDS-INPUT-CHANGED'
const EDIT_ROOM_HOSTEL_CHANGED = 'EDIT-ROOM-HOSTEL-CHANGED'
const EDIT_ROOM_RESPONCE_FROM_API_RECEIVED = 'EDIT-ROOM-RESPONCE-FROM-API-RECEIVED'
const EDIT_ROOM_SET_HOSTEL_URL = 'EDIT-ROOM-SET-ROOM-URL'
const EDIT_ROOM_SUBSCRIBE_HISTORY = 'EDIT-ROOM-SUBSCRIBE-HISTORY'

const EDIT_ROOM_FETCH_ROOM = 'EDIT-ROOM-FETCH-ROOM';
//const FETCHING_ERROR = 'FETCHING-ERROR';

const API_URL = '/api/v0/'








export const roomNameInputChangedActionCreator = (name) =>{
	const action = {
		type: EDIT_ROOM_ROOM_NAME_INPUT_CHANGED,
		data:{
			name: name
		}
	}
	return action
}

export const roomNumberInputChangedActionCreator = (roomNumber) =>{
	const action = {
		type: EDIT_ROOM_ROOM_NUMBER_INPUT_CHANGED,
		data:{
			roomNumber: roomNumber
		}
	}
	return action
}

export const amountOfBedsInputChangedActionCreator = (amountOfBeds) =>{
	const action = {
		type: EDIT_ROOM_AMOUNT_OF_BEDS_INPUT_CHANGED,
		data:{
			amountOfBeds: amountOfBeds
		}
	}
	return action
}

export const hostelInputChangedActionCreator = (hostel) =>{
	const action = {
		type: EDIT_ROOM_HOSTEL_CHANGED,
		data:{
			hostel: hostel
		}
	}
	return action
}


const fetchRoomFromAPI = async (roomId) =>{
	return axios.get(`${API_URL}rooms/${roomId}/`)
}


const fetchRoomActionCreator = (data) =>{
	const action = {
			type: EDIT_ROOM_FETCH_ROOM,
			data: data
		}
	return action
}

// const fetchingErrorActionCreator = (error) =>{
// 	const action = {
// 			type: FETCHING_ERROR,
// 			error: error
// 		}
// 	return action
//}

export function fetchRoom(roomId){
	return (dispatch)=>{
		return fetchRoomFromAPI(roomId)
			.then(
				room => dispatch(fetchRoomActionCreator(room.data))
			)
	}
}



export const setHostelUrlActionCreator = (hostelId) =>{
	const action ={
		type: EDIT_ROOM_SET_HOSTEL_URL,
		data:{
			hostelId: hostelId
		}
	}
	return action;
}

export const subscribeHistoryActionCreator = (history) =>{
	const action = {
			type: EDIT_ROOM_SUBSCRIBE_HISTORY,
			historyObserver: history
		}
	return action
}


function redirectOnSuccess(history,url){
	history.push(url);
}



const requestPatchRoom = async (data, id, headers) =>{
	console.info(data)
	return axios.patch(`${API_URL}rooms/${id}/`, data, headers)
}

const responseFromAPIReceivedActionCreator = (response) =>{
	const action = {
		type: EDIT_ROOM_RESPONCE_FROM_API_RECEIVED,
		response: response
	}
	return action;
}

export const updateRoom = (data, initialData, id, headers) =>{

	const actualData = {}
	for(let prop in data){
		if(data[prop]!=initialData[prop]){
			if(prop=='hostel'||prop=='roomNumber'){
				actualData.room = `http://localhost:8000/api/v0/hostels/${data.hostel}/`
				actualData.roomNumber = data.roomNumber
			}else{
				actualData[prop] = data[prop]
			}
		}
	}

	return (dispatch)=>{
		return requestPatchRoom(convertObjectCamelCaseFieldNamesToSnakeCase(actualData), id, headers)
				.then(response=>{
					dispatch(responseFromAPIReceivedActionCreator(response))
				})
	}

}







const initialState = {
	initialData:{
		roomName: '',
		roomNumber: 1,
		amountOfBeds: 0,
		hostel:''
	},
	data:{
		roomName: '',
		roomNumber: 1,
		amountOfBeds: 0,
		hostel:''
	},
	history:{
		push: (url)=>{console.log(url)}
	},
	successURL: '/'

}




const editRoomReducer = (state=initialState, action) =>{
	switch(action.type){
		case EDIT_ROOM_ROOM_NAME_INPUT_CHANGED:
			state.data.roomName = action.data.name
			return state;
		case EDIT_ROOM_ROOM_NUMBER_INPUT_CHANGED:
			state.data.roomNumber = action.data.roomNumber
			return state;
		case EDIT_ROOM_AMOUNT_OF_BEDS_INPUT_CHANGED:
			state.data.amountOfBeds = action.data.amountOfBeds
			return state;
		case EDIT_ROOM_RESPONCE_FROM_API_RECEIVED:
			redirectOnSuccess(state.history, state.successURL)
			return state;
		case EDIT_ROOM_FETCH_ROOM:
			state.data.roomName = action.data.room_name;
			state.data.roomNumber = action.data.room_number;
			state.data.amountOfBeds = action.data.amount_of_beds
			state.data.hostel = parseInt(action.data.hostel.match(/\d+/g).pop())
			state.successURL = `/hostel/?id=${state.data.hostel}`
			Object.assign(state.initialData, state.data)
			return state;
		case EDIT_ROOM_HOSTEL_CHANGED:
			state.successURL = `/hostel/?id=${action.data.hostel}`;
			state.data.hostel = action.data.hostel;
			return state;
		case EDIT_ROOM_SUBSCRIBE_HISTORY:
			state.history = action.historyObserver;
			return state;
		default:
			return state;
	}
}

export default editRoomReducer;