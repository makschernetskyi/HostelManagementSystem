import axios from 'axios';


const API_URL = '/api/v0/'

const SEARCHBAR_CHANGED = 'SEARCHBAR-CHANGED';


const initialState = {
	filter: ''
}


const searchBarReducer = (state = initialState, action) =>{
	switch(action.type){
		case SEARCHBAR_CHANGED:
			state.filter = action.data.value
			return state;
		default:
			return state;
	}
}

export default hostelsReducer;