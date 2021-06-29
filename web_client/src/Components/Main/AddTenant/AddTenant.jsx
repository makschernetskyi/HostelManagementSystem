import React, { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router';
import { bedInputChangedActionCreator, feeInputChangedActionCreator, depositInputChangedActionCreator, movingInDateChangedActionCreator, nameInputChangedActionCreator, nextPaymentDateInputChangedActionCreator, passportPhotoInputChangedActionCreator, phoneInputChangedActionCreator, surnameInputChangedActionCreator, setRoomUrlActionCreator, postNewTenant, setSuccessUrlActionCreator, subscribeHistoryActionCreator } from '../../../redux/Reducers/addTenantReducer';
import styles from './AddTenant.module.sass';
import classes from '../../../tools/classes'






export const AddTenant = ({state, dispatch}) =>{

	const search = useLocation().search
	const roomName = decodeURI(new URLSearchParams(search).get('room'));
	const roomId = new URLSearchParams(search).get('id');

	const history = useHistory()
	
	const formRefs ={
		name: useRef(),
		surname: useRef(),
		bed: useRef(),
		phone: useRef(),
		passPhoto: useRef(),
		fee: useRef(),
		movingInDate: useRef(),
		nextPayment: useRef(),
		deposit: useRef(),
		passPhotoImage: useRef()
	}

	const nameInputChanged = () =>{
		dispatch(nameInputChangedActionCreator(formRefs.name.current.value))
	}
	const surnameInputChanged = () =>{
		dispatch(surnameInputChangedActionCreator(formRefs.surname.current.value))
	}
	const bedInputChanged = () =>{
		dispatch(bedInputChangedActionCreator(formRefs.bed.current.value))
	}
	const phoneInputChanged = () =>{
		dispatch(phoneInputChangedActionCreator(formRefs.phone.current.value))
	}
	const passPhotoInputChanged = () =>{
		const passportPhoto = formRefs.passPhoto.current.files[0];
		if(!passportPhoto){
			formRefs.passPhotoImage.current.src = '/static/icons/Photo_Placeholder.png';
			return alert('please, select valid image');
		}
		const reader = new FileReader();
		reader.readAsDataURL(passportPhoto);
		reader.onloadend = async (event) =>{
			const passportPhoto = event.target.result;
			formRefs.passPhotoImage.current.src = passportPhoto;
			dispatch(passportPhotoInputChangedActionCreator(passportPhoto))
		}
	}
	const feeInputChanged = () =>{
		dispatch(feeInputChangedActionCreator(formRefs.fee.current.value))
	}
	const movingInDateInputChanged = () =>{
		dispatch(movingInDateChangedActionCreator(formRefs.movingInDate.current.value))
	}
	const nextPaymentDayInputChanged = () =>{
		dispatch(nextPaymentDateInputChangedActionCreator(formRefs.nextPayment.current.value))
	}
	const depositInputChanged = () =>{
		dispatch(depositInputChangedActionCreator(formRefs.deposit.current.value))
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
		dispatch(postNewTenant(state.data,headers))
	}

	useEffect(() => {
		dispatch(setSuccessUrlActionCreator(`/room/?id=${roomId}`))
		dispatch(subscribeHistoryActionCreator(history))
		dispatch(setRoomUrlActionCreator(roomId))
		return () => {
		};
	}, []);
	


	return(
		<form onSubmit={handleSubmit} className={classes(styles.Form, styles.Form__addForm)}>
			{/*<legend>Add Tenant to <span>{roomName}</span></legend>*/}
			<div className={styles.FormInput}>
				<input type="text" id='nameInput' placeholder=" " className={styles.FormInput_textInput} ref = {formRefs.name} value={state.data.name} onChange={nameInputChanged} required/>
				<label htmlFor='nameInput'  className={styles.FormInput_label} >name</label>
			</div>
			<div className={styles.FormInput}>
				<input type="text" id="surnameInput" placeholder=" " className={styles.FormInput_textInput} ref = {formRefs.surname} value={state.data.surname} onChange={surnameInputChanged} pattern="[\sa-zA-Z]+" required/>
				<label htmlFor='surnameInput' className={styles.FormInput_label} >surname</label>
			</div>
			<div className={styles.FormInput}>
				<input type="number" id="bedInput" className={styles.FormInput_numberInput} placeholder=" " ref = {formRefs.bed} value={state.data.bedNumber} onChange={bedInputChanged} required/>
				<label htmlFor='bedInput' className={styles.FormInput_label} >bed</label>
			</div>
			<div className={styles.FormInput}>
				<input type="text" id="phoneInput" className={styles.FormInput_textInput} placeholder=" " ref = {formRefs.phone} value={state.data.telephoneNumber} onChange={phoneInputChanged} pattern="[\+0-9]\d+"/>
				<label htmlFor='phoneInput' className={styles.FormInput_label} >phone</label>
			</div>
			<div className={styles.FormFileInput}>
				<label htmlFor="photoInput" className={styles.FormFileInput_fileInputLabel}>drag a passport photo or choose it from this device</label>
				<img src='/static/icons/Photo_Placeholder.png' ref={formRefs.passPhotoImage} className={styles.FormFileInput_FileImage} alt="-" />
				<input type="file" id="photoInput" className={styles.FormFileInput_fileInput} placeholder="passport photo" ref = {formRefs.passPhoto} onChange={passPhotoInputChanged} accept="image/*"/>
			</div>
			<div className={styles.FormInput}>
				<input type="number" id="feeInput" className={styles.FormInput_numberInput} placeholder=" " ref = {formRefs.fee} value={state.data.fee} onChange={feeInputChanged} required/>
				<label htmlFor='feeInput' className={styles.FormInput_label} >fee</label>
			</div>
			<div className={styles.FormInput}>
				<input type="date" id="movingInDateInput" className={styles.FormInput_dateInput} placeholder=" " ref = {formRefs.movingInDate} value={state.data.movingInDate} onChange={movingInDateInputChanged} required/>
				<label htmlFor='movingInDateInput' className={styles.FormInput_label} >moved in</label>
			</div>
			<div className={styles.FormInput}>
				<input type="date" className={styles.FormInput_dateInput} placeholder=" " ref = {formRefs.nextPayment} value={state.data.nextPaymentDate} onChange={nextPaymentDayInputChanged} required/>
				<label htmlFor='movingInDateInput' className={styles.FormInput_label} >next payment</label>
			</div>
			<div className={styles.FormInput}>
				<input type="number" id="depositInput" className={styles.FormInput_numberInput} ref = {formRefs.deposit} value={state.data.deposit} onChange={depositInputChanged}/>
				<label htmlFor='feeInput' className={styles.FormInput_label}>kaucja</label>
			</div>
			<button type="submit" className={styles.FormSubmitButton}>Add</button>
		</form>
	)
}