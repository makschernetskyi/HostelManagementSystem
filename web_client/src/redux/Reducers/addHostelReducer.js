import axios from 'axios';
import convertObjectCamelCaseFieldNamesToSnakeCase from '../coverterCamelCaseToSnakeCase'
import redirectOnSuccess from '../redirectOnSuccess'



const ADD_HOSTEL_HOSTEL_NAME_INPUT_CHANGED = 'ADD-HOSTEL-HOSTEL-NAME-INPUT-CHANGED'
const ADD_HOSTEL_ADRESS_INPUT_CHANGED = 'ADD-HOSTEL-ROOM-NUMBER-CHANGED'
const ADD_HOSTEL_ABOUT_INPUT_CHANGED = 'ADD-HOSTEL-AMOUNT-OF-BEDS-INPUT-CHANGED'
const ADD_HOSTEL_RESPONCE_FROM_API_RECEIVED = 'ADD-HOSTEL-RESPONCE-FROM-API-RECEIVED'
const ADD_HOSTEL_SUBSCRIBE_HISTORY = 'ADD-HOSTEL-SUBSCRIBE-HISTORY'

const API_URL = '/api/v0/'








export const nameInputChangedActionCreator = (name) =>{
	const action = {
		type: ADD_HOSTEL_HOSTEL_NAME_INPUT_CHANGED,
		data:{
			name: name
		}
	}
	return action
}

export const adressInputChangedActionCreator = (adress) =>{
	const action = {
		type: ADD_HOSTEL_ADRESS_INPUT_CHANGED,
		data:{
			adress: adress
		}
	}
	return action
}

export const aboutInputChangedActionCreator = (aboutText) =>{
	const action = {
		type: ADD_HOSTEL_ABOUT_INPUT_CHANGED,
		data:{
			about: aboutText
		}
	}
	return action
}



export const subscribeHistoryActionCreator = (history) =>{
	const action = {
			type: ADD_HOSTEL_SUBSCRIBE_HISTORY,
			historyObserver: history
		}
	return action
}





const responseFromAPIReceivedActionCreator = (response) =>{
	const action = {
		type: ADD_HOSTEL_RESPONCE_FROM_API_RECEIVED,
		response: response
	}
	return action;
}

export const createHostel = (data, headers) =>{

	const actualData = convertObjectCamelCaseFieldNamesToSnakeCase(data)

	return (dispatch)=>{
		return postHostel(actualData,headers)
				.then(response=>{
					dispatch(responseFromAPIReceivedActionCreator(response))
				})
	}

}

async function postHostel(data, headers){
	console.info(data)
	return axios.post(`${API_URL}hostels/`, data, headers)
}







const initialState = {
	data:{
		name: '',
		adress: '',
		about: ''
	},
	history:{
		push: (url)=>{console.log(url)}
	},
	successURL: '/'

}




const addRoomReducer = (state=initialState, action) =>{
	switch(action.type){
		case ADD_HOSTEL_HOSTEL_NAME_INPUT_CHANGED:
			state.data.name = action.data.name
			return state;
		case ADD_HOSTEL_ADRESS_INPUT_CHANGED:
			state.data.adress = action.data.adress
			return state;
		case ADD_HOSTEL_ABOUT_INPUT_CHANGED:
			state.data.about = action.data.about
			return state;
		case ADD_HOSTEL_RESPONCE_FROM_API_RECEIVED:
			redirectOnSuccess(state.history, state.successURL)
			return state;
		case ADD_HOSTEL_SUBSCRIBE_HISTORY:
			state.history = action.historyObserver;
			return state;
		default:
			return state;
	}
}

export default addRoomReducer;