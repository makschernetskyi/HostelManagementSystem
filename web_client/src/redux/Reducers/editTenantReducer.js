import axios from 'axios';
import convertObjectCamelCaseFieldNamesToSnakeCase from '../coverterCamelCaseToSnakeCase'


const EDIT_TENANT_NAME_INPUT_CHANGED = 'EDIT-TENANT-NAME-INPUT-CHANGED'
const EDIT_TENANT_SURNAME_INPUT_CHANGED = 'EDIT-TENANT-SURNAME-INPUT-CHANGED'
const EDIT_TENANT_BED_INPUT_CHANGED = 'EDIT-TENANT-BED-INPUT-CHANGED'
const EDIT_TENANT_PHONE_INPUT_CHANGED = 'EDIT-TENANT-PHONE-INPUT-CHANGED'
const EDIT_TENANT_PASSPORT_PHOTO_CHANGED = 'EDIT-TENANT-PASSPORT-INPUT-CHANGED'
const EDIT_TENANT_FEE_INPUT_CHANGED = 'EDIT-TENANT-FEE-INPUT-CHANGED'
const EDIT_TENANT_MOVING_IN_DATE_INPUT_CHANGED = 'EDIT-TENANT-MOVING-IN-INPUT-CHANGED'
const EDIT_TENANT_NEXT_PAYMENT_DATE_CHANGED = 'EDIT-TENANT-NEXT-PAYMENT-INPUT-CHANGED'
const EDIT_TENANT_DEPOSIT_INPUT_CHANGED = 'EDIT-TENANT-DEPOSIT-INPUT-CHANGED'
const EDIT_TENANT_RESPONCE_FROM_API_RECEIVED = 'EDIT-TENANT-RESPONCE-FROM-API-RECEIVED'
const EDIT_TENANT_PUT_ERROR = 'EDIT-TENANT-PUT-ERROR'
const EDIT_TENANT_ROOM_INPUT_CHANGED = 'EDIT-TENANT-ROOM-INPUT-CHANGED'
const EDIT_TENANT_SUBSCRIBE_HISTORY = 'EDIT-TENANT-SUBSCRIBE-HISTORY'
const EDIT_TENANT_SET_SUCCESS_URL = 'EDIT-TENANT-SET-SUCCESS-URL'

const API_URL = '/api/v0/'

const EDIT_TENANT_FETCH_TENANT = 'EDIT-TENANT-FETCH-TENANT';
// const FETCHING_ERROR = 'FETCHING-ERROR';



export const nameInputChangedActionCreator = (name) =>{
	const action = {
		type: EDIT_TENANT_NAME_INPUT_CHANGED,
		data:{
			name: name
		}
	}
	return action
}
export const surnameInputChangedActionCreator = (surname) =>{
	const action = {
		type: EDIT_TENANT_SURNAME_INPUT_CHANGED,
		data:{
			surname: surname
		}
	}
	return action
}
export const bedInputChangedActionCreator = (bed) =>{
	const action = {
		type: EDIT_TENANT_BED_INPUT_CHANGED,
		data:{
			bed: bed
		}
	}
	return action
}
export const phoneInputChangedActionCreator = (phone) =>{
	const action = {
		type: EDIT_TENANT_PHONE_INPUT_CHANGED,
		data:{
			phone: phone
		}
	}
	return action
}
export const passportPhotoInputChangedActionCreator = (photo) =>{
	const action = {
		type: EDIT_TENANT_PASSPORT_PHOTO_CHANGED,
		data:{
			photo: photo
		}
	}
	return action
}
export const feeInputChangedActionCreator = (fee) =>{
	const action = {
		type: EDIT_TENANT_FEE_INPUT_CHANGED,
		data:{
			fee: fee
		}
	}
	return action
}
export const movingInDateChangedActionCreator = (date) =>{
	const action = {
		type: EDIT_TENANT_MOVING_IN_DATE_INPUT_CHANGED,
		data:{
			date: date
		}
	}
	return action
}
export const nextPaymentDateInputChangedActionCreator = (date) =>{
	const action = {
		type: EDIT_TENANT_NEXT_PAYMENT_DATE_CHANGED,
		data:{
			date: date
		}
	}
	return action
}
export const depositInputChangedActionCreator = (deposit) =>{
	const action = {
		type: EDIT_TENANT_DEPOSIT_INPUT_CHANGED,
		data:{
			deposit: deposit
		}
	}
	return action
}

export const roomInputChangedActionCreator = (room) =>{
	const action = {
		type: EDIT_TENANT_ROOM_INPUT_CHANGED,
		data:{
			room: room
		}
	}
	return action
}






const fetchHostelFromAPI = async (url) =>{
	if(typeof url !== 'string')
		throw new TypeError('hostel primary key is not type of number')
	const hostel = await axios.get(url);
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

const fetchTenantFromAPI = async (tenantId) =>{
	return await axios.get(`${API_URL}tenants/${tenantId}/`);
}


const fetchTenantActionCreator = (data) =>{
	const action = {
			type: EDIT_TENANT_FETCH_TENANT,
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
// }

async function fetchAdditionalDataforTenant(tenant){
	const hostel = await fetchHostelFromAPI(tenant.hostel);
	const rooms = await fetchRoomsFromAPI(hostel.data.rooms);
	tenant.adjacentRooms = rooms;
	return tenant;
}


export function fetchTenant(tenantId){
	return (dispatch)=>{
		return fetchTenantFromAPI(tenantId)
			.then(
				response=>{
					return fetchAdditionalDataforTenant(response.data)
				}
			).then(
				tenant=>{
					dispatch(fetchTenantActionCreator(tenant))
				}
			)
	}
}


const requestPatchTenant = async (data, id, headers) =>{
	return axios.patch(`${API_URL}tenants/${id}/`, data, headers)
}

const responseFromAPIReceivedActionCreator = (response) =>{
	const action = {
		type: EDIT_TENANT_RESPONCE_FROM_API_RECEIVED,
		response: response
	}
	return action;
}

// const putErrorActionCreator = (error) =>{
// 	const action = {
// 			type: EDIT_TENANT_PUT_ERROR,
// 			error: error
// 		}
// 	return action
// }

export const updateTenant = (data, initialData, id, headers) =>{

	const actualData = {}
	for(let prop in data){
		if(data[prop]!=initialData[prop]){
			if(prop=='room'||prop=='bedNumber'){
				actualData.room = data.room
				actualData.bedNumber = data.bedNumber
			}else{
				actualData[prop] = data[prop]
			}
		}
	}

	return (dispatch)=>{
		return requestPatchTenant(convertObjectCamelCaseFieldNamesToSnakeCase(actualData),id,headers)
				.then(
					response=>{
						dispatch(responseFromAPIReceivedActionCreator(response))
					}/*,
					error=>{
						dispatch(putErrorActionCreator(error))
					}*/
				)
	}

}





const initialState = {
	initialData:{
		name: '',
		surname: '',
		bedNumber: 1,
		telephoneNumber: '',
		passportPhoto: '',
		fee: 0,
		movingInDate: '',
		nextPaymentDate: '',
		deposit: 0,
		room: ''
	},
	data:{
		name: '',
		surname: '',
		bedNumber: 1,
		telephoneNumber: '',
		passportPhoto: '',
		fee: 0,
		movingInDate: '',
		nextPaymentDate: '',
		deposit: 0,
		room: ''
	},
	history:{
		push:(url)=>url
	},
	adjacentRooms:[],
	successURL: '/'


}



export const subscribeHistoryActionCreator = (history) =>{
	const action = {
			type: EDIT_TENANT_SUBSCRIBE_HISTORY,
			historyObserver: history
		}
	return action
}
export const setSuccessUrlActionCreator = (url) =>{
	const action = {
			type: EDIT_TENANT_SET_SUCCESS_URL,
			url: url
		}
	return action
}

function redirectOnSuccess(history, url){
	history.push(url);
}




const editTenantReducer = (state=initialState, action) =>{
	switch(action.type){
		case EDIT_TENANT_NAME_INPUT_CHANGED:
			state.data.name = action.data.name
			return state;
		case EDIT_TENANT_SURNAME_INPUT_CHANGED:
			state.data.surname = action.data.surname
			return state;
		case EDIT_TENANT_BED_INPUT_CHANGED:
			state.data.bedNumber = action.data.bed
			return state;
		case EDIT_TENANT_PHONE_INPUT_CHANGED:
			state.data.telephoneNumber = action.data.phone
			return state;
		case EDIT_TENANT_PASSPORT_PHOTO_CHANGED:
			state.data.passportPhoto = action.data.photo
			return state;
		case EDIT_TENANT_FEE_INPUT_CHANGED:
			state.data.fee = action.data.fee
			return state;
		case EDIT_TENANT_MOVING_IN_DATE_INPUT_CHANGED:
			state.data.movingInDate = action.data.date
			return state;
		case EDIT_TENANT_NEXT_PAYMENT_DATE_CHANGED:
			state.data.nextPaymentDate = action.data.date
			return state;
		case EDIT_TENANT_DEPOSIT_INPUT_CHANGED:
			state.data.deposit = action.data.deposit
			return state;
		case EDIT_TENANT_RESPONCE_FROM_API_RECEIVED:
			console.log(action.response)
			redirectOnSuccess(state.history, state.successURL)
			return state;
		case EDIT_TENANT_ROOM_INPUT_CHANGED:
			state.data.room = action.data.room;
			return state;
		case EDIT_TENANT_FETCH_TENANT:
			state.data.name = action.data.name
			state.data.surname = action.data.surname
			state.data.bedNumber = action.data.bed_number
			state.data.telephoneNumber = action.data.telephone_number
			state.data.passportPhoto = action.data.passport_photo
			state.data.fee = action.data.fee
			state.data.movingInDate = action.data.moving_in_date
			state.data.paymentType = action.data.payment_type
			state.data.nextPaymentDate = action.data.next_payment_date
			state.data.deposit = action.data.deposit
			state.data.room = action.data.room
			state.adjacentRooms = action.data.adjacentRooms
			console.info(action.data.adjacentRooms)
			Object.assign(state.initialData,state.data)
			return state;
		case EDIT_TENANT_PUT_ERROR:
			// alert(action.error)
			return state;
		case EDIT_TENANT_SUBSCRIBE_HISTORY:
			state.history = action.historyObserver;
			return state;
		case EDIT_TENANT_SET_SUCCESS_URL:
			state.successURL = action.url;
			return state;
		default:
			return state;
	}
}

export default editTenantReducer