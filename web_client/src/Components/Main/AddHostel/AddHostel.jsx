import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { nameInputChangedActionCreator, adressInputChangedActionCreator, aboutInputChangedActionCreator, createHostel, subscribeHistoryActionCreator } from '../../../redux/Reducers/addHostelReducer';
import styles from './AddHostel.module.sass';
import classes from '../../../tools/classes'






export const AddHostel = ({state, dispatch}) =>{

	const history = useHistory()
	
	const formRefs ={
		name: React.createRef(),
		adress: React.createRef(),
		about: React.createRef()
	}

	const nameInputChanged = () =>{
		dispatch(nameInputChangedActionCreator(formRefs.name.current.value))
	}
	const adressInputChanged = () =>{
		dispatch(adressInputChangedActionCreator(formRefs.adress.current.value))
	}
	const aboutInputChanged = () =>{
		dispatch(aboutInputChangedActionCreator(formRefs.about.current.value))
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
		dispatch(createHostel(state.data,headers))
	}

	useEffect(() => {
		dispatch(subscribeHistoryActionCreator(history))
		return () => {
		};
	}, []);
	


	return(
		<form onSubmit={handleSubmit} className={classes(styles.Form, styles.Form__addForm)}>
			<div className={styles.FormInput}>
				<input type="text" id='nameInput' placeholder=" " name="hostel_name" className={styles.FormInput_textInput} ref = {formRefs.name} value={state.data.name} onChange={nameInputChanged} required/>
				<label htmlFor='nameInput'  className={styles.FormInput_label} >name</label>
			</div>
			<div className={styles.FormInput}>
				<input type="adress" id='adressInput' placeholder=" " name="adress" className={styles.FormInput_textInput} ref = {formRefs.adress} value={state.data.adress} onChange={adressInputChanged} required/>
				<label htmlFor='adressInput'  className={styles.FormInput_label} >adress</label>
			</div>
			<div className={styles.FormInput}>
				<input type="text" id='nameInput' placeholder=" " name="about" className={styles.FormInput_textInput} ref = {formRefs.about} value={state.data.about} onChange={aboutInputChanged} required/>
				<label htmlFor='nameInput'  className={styles.FormInput_label} >about</label>
			</div>
			<button type="submit" className={styles.FormSubmitButton}>Add</button>
		</form>
	)
}