import axios from 'axios';
import convertObjectCamelCaseFieldNamesToSnakeCase from '../coverterCamelCaseToSnakeCase'



const ADD_ROOM_ROOM_NAME_INPUT_CHANGED = 'ADD-ROOM-ROOM-NAME-INPUT-CHANGED'
const ADD_ROOM_ROOM_NUMBER_INPUT_CHANGED = 'ADD-ROOM-ROOM-NUMBER-CHANGED'
const ADD_ROOM_AMOUNT_OF_BEDS_INPUT_CHANGED = 'ADD-ROOM-AMOUNT-OF-BEDS-INPUT-CHANGED'
const ADD_ROOM_RESPONCE_FROM_API_RECEIVED = 'ADD-ROOM-RESPONCE-FROM-API-RECEIVED'
const ADD_ROOM_SET_HOSTEL_URL = 'ADD-ROOM-SET-ROOM-URL'
const ADD_ROOM_SUBSCRIBE_HISTORY = 'ADD-ROOM-SUBSCRIBE-HISTORY'
const ADD_ROOM_SET_SUCCESS_URL = 'ADD-ROOM-SET-SUCCESS-URL'

const API_URL = '/api/v0/'








export const roomNameInputChangedActionCreator = (name) =>{
	const action = {
		type: ADD_ROOM_ROOM_NAME_INPUT_CHANGED,
		data:{
			name: name
		}
	}
	return action
}

export const roomNumberInputChangedActionCreator = (roomNumber) =>{
	const action = {
		type: ADD_ROOM_ROOM_NUMBER_INPUT_CHANGED,
		data:{
			roomNumber: roomNumber
		}
	}
	return action
}

export const amountOfBedsInputChangedActionCreator = (amountOfBeds) =>{
	const action = {
		type: ADD_ROOM_AMOUNT_OF_BEDS_INPUT_CHANGED,
		data:{
			amountOfBeds: amountOfBeds
		}
	}
	return action
}



export const setHostelUrlActionCreator = (hostelId) =>{
	const action ={
		type: ADD_ROOM_SET_HOSTEL_URL,
		data:{
			hostelId: hostelId
		}
	}
	return action;
}

export const subscribeHistoryActionCreator = (history) =>{
	const action = {
			type: ADD_ROOM_SUBSCRIBE_HISTORY,
			historyObserver: history
		}
	return action
}
export const setSuccessUrlActionCreator = (url) =>{
	const action = {
			type: ADD_ROOM_SET_SUCCESS_URL,
			url: url
		}
	return action
}

function redirectOnSuccess(history,url){
	history.push(url);
}



const requestPostRoom = async (data, headers) =>{
	console.info(data)
	return axios.post(`${API_URL}rooms/`, data, headers)
}

const responseFromAPIReceivedActionCreator = (response) =>{
	const action = {
		type: ADD_ROOM_RESPONCE_FROM_API_RECEIVED,
		response: response
	}
	return action;
}

export const postNewRoom = (data, headers) =>{


	return (dispatch)=>{
		return requestPostRoom(convertObjectCamelCaseFieldNamesToSnakeCase(data),headers)
				.then(response=>{
					dispatch(responseFromAPIReceivedActionCreator(response))
				})
	}

}







const initialState = {
	data:{
		roomName: '',
		roomNumber: 1,
		amountOfBeds: 0,
		hostel:''
	},
	history:{
		push: (url)=>{console.log(url)}
	},
	url: '/'

}




const addRoomReducer = (state=initialState, action) =>{
	switch(action.type){
		case ADD_ROOM_ROOM_NAME_INPUT_CHANGED:
			state.data.roomName = action.data.name
			return state;
		case ADD_ROOM_ROOM_NUMBER_INPUT_CHANGED:
			state.data.roomNumber = action.data.roomNumber
			return state;
		case ADD_ROOM_AMOUNT_OF_BEDS_INPUT_CHANGED:
			state.data.amountOfBeds = action.data.amountOfBeds
			return state;
		case ADD_ROOM_RESPONCE_FROM_API_RECEIVED:
			console.log(action.response)
			redirectOnSuccess(state.history, state.successURL)
			return state;
		case ADD_ROOM_SET_HOSTEL_URL:
			state.data.hostel = 'http://localhost:8000/api/v0/hostels/' + action.data.hostelId + '/'
			return state;
		case ADD_ROOM_SUBSCRIBE_HISTORY:
			state.history = action.historyObserver;
			return state;
		case ADD_ROOM_SET_SUCCESS_URL:
			state.successURL = action.url;
			return state;
		default:
			return state;
	}
}

export default addRoomReducer;