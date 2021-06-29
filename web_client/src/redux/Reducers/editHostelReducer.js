import axios from 'axios';
import convertObjectCamelCaseFieldNamesToSnakeCase from '../coverterCamelCaseToSnakeCase'
import redirectOnSuccess from '../redirectOnSuccess'



const EDIT_HOSTEL_HOSTEL_NAME_INPUT_CHANGED = 'EDIT-HOSTEL-HOSTEL-NAME-INPUT-CHANGED'
const EDIT_HOSTEL_ADRESS_INPUT_CHANGED = 'EDIT-HOSTEL-ROOM-NUMBER-CHANGED'
const EDIT_HOSTEL_ABOUT_INPUT_CHANGED = 'EDIT-HOSTEL-AMOUNT-OF-BEDS-INPUT-CHANGED'
const EDIT_HOSTEL_RESPONCE_FROM_API_RECEIVED = 'EDIT-HOSTEL-RESPONCE-FROM-API-RECEIVED'
const EDIT_HOSTEL_INITIAL_DATA_RECEIVED = 'EDIT-HOSTEL-INITIAL-DATA-RECEIVED'
const EDIT_HOSTEL_SUBSCRIBE_HISTORY = 'EDIT-HOSTEL-SUBSCRIBE-HISTORY'

const API_URL = '/api/v0/'








export const nameInputChangedActionCreator = (name) =>{
	const action = {
		type: EDIT_HOSTEL_HOSTEL_NAME_INPUT_CHANGED,
		data:{
			name: name
		}
	}
	return action
}

export const adressInputChangedActionCreator = (adress) =>{
	const action = {
		type: EDIT_HOSTEL_ADRESS_INPUT_CHANGED,
		data:{
			adress: adress
		}
	}
	return action
}

export const aboutInputChangedActionCreator = (aboutText) =>{
	const action = {
		type: EDIT_HOSTEL_ABOUT_INPUT_CHANGED,
		data:{
			about: aboutText
		}
	}
	return action
}



export const subscribeHistoryActionCreator = (history) =>{
	const action = {
			type: EDIT_HOSTEL_SUBSCRIBE_HISTORY,
			historyObserver: history
		}
	return action
}





const responseFromAPIReceivedActionCreator = (response) =>{
	const action = {
		type: EDIT_HOSTEL_RESPONCE_FROM_API_RECEIVED,
		response: response
	}
	return action;
}

const initialDataReceivedActionCreator = (data) =>{
	const action = {
		type: EDIT_HOSTEL_INITIAL_DATA_RECEIVED,
		data: data
	}
	return action;
}



export const fetchInitialData = (id) =>{
	return (dispatch)=>
		getHostel(id)
			.then(response=>dispatch(initialDataReceivedActionCreator(response.data)))
}

async function getHostel(id){
	return axios.get(`${API_URL}hostels/${id}/`)
}



export const updateHostel = (data, initialData, id, headers) =>{

	let actualData = {}
	for(let prop in data){
		if(data[prop]!=initialData[prop]){
				actualData[prop] = data[prop]
		}
	}


	actualData = convertObjectCamelCaseFieldNamesToSnakeCase(actualData)



	return (dispatch)=>{
		return patchHostel(actualData, id,headers)
				.then(response=>{
					dispatch(responseFromAPIReceivedActionCreator(response))
				})
	}

}

async function patchHostel(data, id, headers){
	console.info(data)
	return axios.patch(`${API_URL}hostels/${id}/`, data, headers)
}







const initialState = {
	initialData:{
		name: '',
		adress: '',
		about: ''
	},
	data:{
		name: '',
		adress: '',
		about: ''
	},
	history:{
		push: (url)=>{console.log(url)}
	},
	url: '/'

}




const addRoomReducer = (state=initialState, action) =>{
	switch(action.type){
		case EDIT_HOSTEL_HOSTEL_NAME_INPUT_CHANGED:
			state.data.name = action.data.name
			return state;
		case EDIT_HOSTEL_ADRESS_INPUT_CHANGED:
			state.data.adress = action.data.adress
			return state;
		case EDIT_HOSTEL_ABOUT_INPUT_CHANGED:
			state.data.about = action.data.about
			return state;
		case EDIT_HOSTEL_RESPONCE_FROM_API_RECEIVED:
			console.log(action.response)
			redirectOnSuccess(state.history, state.successURL)
			return state;
		case EDIT_HOSTEL_INITIAL_DATA_RECEIVED:
			state.data.name = action.data.name;
			state.data.adress = action.data.adress;
			state.data.about = action.data.about;
			Object.assign(state.initialData, state.data);
			return state;
		case EDIT_HOSTEL_SUBSCRIBE_HISTORY:
			state.history = action.historyObserver;
			return state;
		default:
			return state;
	}
}

export default addRoomReducer;