import axios from 'axios';
import convertObjectCamelCaseFieldNamesToSnakeCase from '../coverterCamelCaseToSnakeCase'



const ADD_TENANT_NAME_INPUT_CHANGED = 'ADD-TENANT-NAME-INPUT-CHANGED'
const ADD_TENANT_SURNAME_INPUT_CHANGED = 'ADD-TENANT-SURNAME-INPUT-CHANGED'
const ADD_TENANT_BED_INPUT_CHANGED = 'ADD-TENANT-BED-INPUT-CHANGED'
const ADD_TENANT_PHONE_INPUT_CHANGED = 'ADD-TENANT-PHONE-INPUT-CHANGED'
const ADD_TENANT_PASSPORT_PHOTO_CHANGED = 'ADD-TENANT-ADD-TENANT-PASSPORT-INPUT-CHANGED'
const ADD_TENANT_FEE_INPUT_CHANGED = 'ADD-TENANT-FEE-INPUT-CHANGED'
const ADD_TENANT_MOVING_IN_DATE_INPUT_CHANGED = 'ADD-TENANT-MOVING-IN-INPUT-CHANGED'
const ADD_TENANT_PAYMENT_TYPE_INPUT_CHANGED = 'ADD-TENANT-PAYMENT-TYPE-INPUT-CHANGED'
const ADD_TENANT_NEXT_PAYMENT_DATE_CHANGED = 'ADD-TENANT-NEXT-PAYMENT-INPUT-CHANGED'
const ADD_TENANT_DEPOSIT_INPUT_CHANGED = 'ADD-TENANT-DEPOSIT-INPUT-CHANGED'
const ADD_TENANT_RESPONCE_FROM_API_RECEIVED = 'ADD-TENANT-RESPONCE-FROM-API-RECEIVED'
const ADD_TENANT_SET_ROOM_URL = 'ADD-TENANT-SET-ROOM-URL'
const ADD_TENANT_SUBSCRIBE_HISTORY = 'ADD-TENANT-SUBSCRIBE-HISTORY'
const ADD_TENANT_SET_SUCCESS_URL = 'ADD-TENANT-SET-SUCCESS-URL'



export const nameInputChangedActionCreator = (name) =>{
	const action = {
		type: ADD_TENANT_NAME_INPUT_CHANGED,
		data:{
			name: name
		}
	}
	return action
}
export const surnameInputChangedActionCreator = (surname) =>{
	const action = {
		type: ADD_TENANT_SURNAME_INPUT_CHANGED,
		data:{
			surname: surname
		}
	}
	return action
}
export const bedInputChangedActionCreator = (bed) =>{
	const action = {
		type: ADD_TENANT_BED_INPUT_CHANGED,
		data:{
			bed: bed
		}
	}
	return action
}
export const phoneInputChangedActionCreator = (phone) =>{
	const action = {
		type: ADD_TENANT_PHONE_INPUT_CHANGED,
		data:{
			phone: phone
		}
	}
	return action
}
export const passportPhotoInputChangedActionCreator = (photo) =>{
	const action = {
		type: ADD_TENANT_PASSPORT_PHOTO_CHANGED,
		data:{
			photo: photo
		}
	}
	return action
}
export const feeInputChangedActionCreator = (fee) =>{
	const action = {
		type: ADD_TENANT_FEE_INPUT_CHANGED,
		data:{
			fee: fee
		}
	}
	return action
}
export const movingInDateChangedActionCreator = (date) =>{
	const action = {
		type: ADD_TENANT_MOVING_IN_DATE_INPUT_CHANGED,
		data:{
			date: date
		}
	}
	return action
}
export const paymentTypeInputChangedActionCreator = (paymentType) =>{
	const action = {
		type: ADD_TENANT_PAYMENT_TYPE_INPUT_CHANGED,
		data:{
			paymentType: paymentType
		}
	}
	return action
}
export const nextPaymentDateInputChangedActionCreator = (date) =>{
	const action = {
		type: ADD_TENANT_NEXT_PAYMENT_DATE_CHANGED,
		data:{
			date: date
		}
	}
	return action
}
export const depositInputChangedActionCreator = (deposit) =>{
	const action = {
		type: ADD_TENANT_DEPOSIT_INPUT_CHANGED,
		data:{
			deposit: deposit
		}
	}
	return action
}

export const setRoomUrlActionCreator = (roomId) =>{
	const action ={
		type: ADD_TENANT_SET_ROOM_URL,
		data:{
			roomId: roomId
		}
	}
	return action;
}

export const subscribeHistoryActionCreator = (history) =>{
	const action = {
			type: ADD_TENANT_SUBSCRIBE_HISTORY,
			historyObserver: history
		}
	return action
}
export const setSuccessUrlActionCreator = (url) =>{
	const action = {
			type: ADD_TENANT_SET_SUCCESS_URL,
			url: url
		}
	return action
}

function redirectOnSuccess(history,url){
	history.push(url);
}



const requestPostTenant = async (data, headers) =>{
	const url = '/api/v0/tenants/';
	return axios.post(url, data, headers)
}

const responseFromAPIReceivedActionCreator = (response) =>{
	const action = {
		type: ADD_TENANT_RESPONCE_FROM_API_RECEIVED,
		response: response
	}
	return action;
}

export const postNewTenant = (data, headers) =>{

	return (dispatch)=>{
		return requestPostTenant(convertObjectCamelCaseFieldNamesToSnakeCase(data),headers)
				.then(response=>{
					dispatch(responseFromAPIReceivedActionCreator(response))
				})
	}

}







const initialState = {
	data:{
		name: '',
		surname: '',
		bedNumber: 1,
		telephoneNumber: '',
		passportPhoto: '',
		fee: 0,
		movingInDate: '',
		paymentType:'',
		nextPaymentDate: '',
		deposit: 0,
		room:''
	},
	history:{
		push: (url)=>{console.log(url)}
	},
	successURL: '/'

}




const addTenantReducer = (state=initialState, action) =>{
	switch(action.type){
		case ADD_TENANT_NAME_INPUT_CHANGED:
			state.data.name = action.data.name
			return state;
		case ADD_TENANT_SURNAME_INPUT_CHANGED:
			state.data.surname = action.data.surname
			return state;
		case ADD_TENANT_BED_INPUT_CHANGED:
			state.data.bedNumber = action.data.bed
			return state;
		case ADD_TENANT_PHONE_INPUT_CHANGED:
			state.data.telephoneNumber = action.data.phone
			return state;
		case ADD_TENANT_PASSPORT_PHOTO_CHANGED:
			state.data.passportPhoto = action.data.photo
			return state;
		case ADD_TENANT_FEE_INPUT_CHANGED:
			state.data.fee = action.data.fee
			return state;
		case ADD_TENANT_MOVING_IN_DATE_INPUT_CHANGED:
			state.data.movingInDate = action.data.date
			return state;
		case ADD_TENANT_PAYMENT_TYPE_INPUT_CHANGED:
			state.data.paymentType = action.data.paymentType
			return state;
		case ADD_TENANT_NEXT_PAYMENT_DATE_CHANGED:
			state.data.nextPaymentDate = action.data.date
			return state;
		case ADD_TENANT_DEPOSIT_INPUT_CHANGED:
			state.data.deposit = action.data.deposit
			return state;
		case ADD_TENANT_RESPONCE_FROM_API_RECEIVED:
			console.log(action.response)
			redirectOnSuccess(state.history, state.successURL)
			return state;
		case ADD_TENANT_SET_ROOM_URL:
			state.data.room = 'http://localhost:8000/api/v0/rooms/' + action.data.roomId + '/'
			return state;
		case ADD_TENANT_SUBSCRIBE_HISTORY:
			state.history = action.historyObserver;
			return state;
		case ADD_TENANT_SET_SUCCESS_URL:
			state.successURL = action.url;
			return state;
		default:
			return state;
	}
}

export default  addTenantReducer;