import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { roomNameInputChangedActionCreator, roomNumberInputChangedActionCreator, amountOfBedsInputChangedActionCreator, postNewRoom, setHostelUrlActionCreator, setSuccessUrlActionCreator, subscribeHistoryActionCreator } from '../../../redux/Reducers/addRoomReducer';
import styles from './AddRoom.module.sass';
import classes from '../../../tools/classes'






export const AddRoom = ({state, dispatch}) =>{

	const search = useLocation().search
	const hostelName = decodeURI(new URLSearchParams(search).get('hostel'));
	const hostelId = new URLSearchParams(search).get('id');

	const history = useHistory()
	
	const formRefs ={
		roomName: React.createRef(),
		roomNumber: React.createRef(),
		amountOfBeds: React.createRef()
	}

	const roomNameInputChanged = () =>{
		dispatch(roomNameInputChangedActionCreator(formRefs.roomName.current.value))
	}
	const roomNumberInputChanged = () =>{
		dispatch(roomNumberInputChangedActionCreator(formRefs.roomNumber.current.value))
	}
	const amountOfBedsInputChanged = () =>{
		dispatch(amountOfBedsInputChangedActionCreator(formRefs.amountOfBeds.current.value))
	}



	

	const handleSubmit = event =>{
		event.preventDefault()
		const token = document.cookie
						.split('; ')
						.find(row => row.startsWith('csrftoken='))
						.split('=')[1];
		const headers ={
			headers:{
				'X-CSRFToken': token
			}
		}
		console.info('state is', state.data)
		dispatch(postNewRoom(state.data,headers))
	}

	useEffect(() => {
		dispatch(setSuccessUrlActionCreator(`/hostel/?id=${hostelId}`))
		dispatch(subscribeHistoryActionCreator(history))
		dispatch(setHostelUrlActionCreator(hostelId))
		return () => {
		};
	}, []);
	


	return(
		<form onSubmit={handleSubmit} className={classes(styles.Form, styles.Form__addForm)}>
			<div className={styles.FormInput}>
				<input type="text" id='nameInput' placeholder=" " className={styles.FormInput_textInput} ref = {formRefs.roomName} value={state.data.roomName} onChange={roomNameInputChanged} required/>
				<label htmlFor='nameInput'  className={styles.FormInput_label} >name</label>
			</div>
			<div className={styles.FormInput}>
				<input type="number" id="roomNumberInput" className={styles.FormInput_numberInput} placeholder=" " ref = {formRefs.roomNumber} value={state.data.roomNumber} onChange={roomNumberInputChanged} required/>
				<label htmlFor='roomNumberInput' className={styles.FormInput_label} >number</label>
			</div>
			<div className={styles.FormInput}>
				<input type="number" id="amountOfBedsInput" className={styles.FormInput_numberInput} placeholder=" " ref = {formRefs.amountOfBeds} value={state.data.amountOfBeds} onChange={amountOfBedsInputChanged} required/>
				<label htmlFor='amountOfBedsInput' className={styles.FormInput_label} >beds</label>
			</div>
			<button type="submit" className={styles.FormSubmitButton}>Add</button>
		</form>
	)
}