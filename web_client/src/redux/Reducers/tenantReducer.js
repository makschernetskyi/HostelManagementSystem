import axios from 'axios';


const API_URL = '/api/v0/'

const TENANT_FETCH_TENANT = 'TENANT-FETCH-TENANT';
//const TENANT_UPDATE_PAYMENT_DATE = 'TENANT-UPDATE-PAYMENT-DATE';
const TENANT_FETCHING_ERROR = 'TENANT-FETCHING-ERROR';
const TENANT_PATCH_TENANT = 'TENANT-PATCH-TENANT'
const TENANT_NEXT_PAYMENT_DATE_INPUT_TENANT = 'TENANT-NEXT-PAYMENT-DATE-INPUT-TENANT';


export const nextPaymentDateInputChangedActionCreator = (date) =>{
	const action = {
			type: TENANT_NEXT_PAYMENT_DATE_INPUT_TENANT,
			date: date
		}
	return action
}
const patchedTenantActionCreator = (response) =>{
	const action = {
			type: TENANT_PATCH_TENANT,
			response: response
		}
	return action
}


const fetchTenantFromAPI = async (tenantId) =>{
	return await axios.get(`${API_URL}tenants/${tenantId}/`);
}

async function patchPaymentDate(date, tenantId, headers){
	return await axios.patch(`${API_URL}tenants/${tenantId}/`,
	{
		next_payment_date: date
	},
	headers)
}

export const updateTenantPaymentDate = (paymentDate, tenantId, headers) =>{
	return (dispatch)=>patchPaymentDate(paymentDate, tenantId, headers)
		.then(
			response=>dispatch(patchedTenantActionCreator(response))
		)
}


const fetchTenantActionCreator = (data) =>{
	const action = {
			type: TENANT_FETCH_TENANT,
			data: data
		}
	return action
}

const fetchingErrorActionCreator = (error) =>{
	const action = {
			type: TENANT_FETCHING_ERROR,
			error: error
		}
	return action
}

export function fetchTenant(tenantId){
	return (dispatch)=>{
		return fetchTenantFromAPI(tenantId)
			.then(
				response=>{
					return dispatch(fetchTenantActionCreator(response.data));
				},
				error=>{
					return dispatch(fetchingErrorActionCreator(error))
				}
			)
	}
}







const initialState = {
	tenant: {},
	errors: [],
	nextPaymentDate: ''
}


const hostelsReducer = (state = initialState, action) =>{
	switch(action.type){
		case TENANT_FETCH_TENANT:
			state.tenant = action.data;
			state.nextPaymentDate = action.data.next_payment_date
			return state;
		case TENANT_FETCHING_ERROR:
			state.errors.push(action.error);
			return state;
		case TENANT_NEXT_PAYMENT_DATE_INPUT_TENANT:
			state.nextPaymentDate = action.date
			return state;
		case TENANT_PATCH_TENANT:
			location.reload()
			return state;
		default:
			return state;
	}
}

export default hostelsReducer;