import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { fetchTenant, nextPaymentDateInputChangedActionCreator, updateTenantPaymentDate } from "../../../redux/Reducers/tenantReducer";

import Modal from './Modal.jsx'
import styles from "./Tenant.module.sass";







export const Tenant = ({state,dispatch}) =>{
	const search = useLocation().search;
	const tenantId = new URLSearchParams(search).get('id');

	useEffect(() => {
		dispatch(fetchTenant(tenantId))
		return function cleanup(){
		}
	}, []);

	const imageRef = useRef();
	const imageContainerRef = useRef();
	const nextPaymentDateInputRef = useRef()
	const submitButtonRef = useRef()
	const payButtonRef = useRef()
	const modalRef = useRef()

	const nextPaymentDateInputChanged = () =>{
		dispatch(nextPaymentDateInputChangedActionCreator(nextPaymentDateInputRef.current.value))
	}

	const submitButtonClicked = () =>{
		const token = document.cookie
						.split('; ')
						.find(row => row.startsWith('csrftoken='))
						.split('=')[1];
		const headers ={
			headers:{
				'X-CSRFToken': token
			}
		}
		dispatch(updateTenantPaymentDate(state.nextPaymentDate, tenantId, headers))
	}

	const showHideButtonClicked = () =>{
		modalRef.current.classList.toggle(styles.hide)
		modalRef.current.classList.toggle(styles.show)
	}

	function resizeImageToModalView(){
		imageRef.current.classList.toggle(styles.Tenant_Field_passportPhoto__modalImage)
		imageRef.current.classList.toggle(styles.Tenant_Field_passportPhoto)
		imageContainerRef.current.classList.toggle(styles.Tenant_Field_passportPhoto_container__modalImage)
		imageContainerRef.current.classList.toggle(styles.Tenant_Field_passportPhoto_container)
	}

	return(
		<div className={styles.TenantData}>
			<div className={styles.Tenant_Field}><p className={styles.Tenant_Field_header}>Name: </p> {state.tenant.name}</div>
			<div className={styles.Tenant_Field}><p className={styles.Tenant_Field_header}>Surname: </p> {state.tenant.surname}</div>
			<div className={styles.Tenant_Field}><p className={styles.Tenant_Field_header}>passport photo: </p><div className={styles.Tenant_Field_passportPhoto_container} ref={imageContainerRef}><img className={styles.Tenant_Field_passportPhoto} ref={imageRef} onClick={resizeImageToModalView} src={state.tenant.passport_photo}></img></div></div>
			<div className={styles.Tenant_Field}><p className={styles.Tenant_Field_header}>fee: </p> {state.tenant.fee}zł</div>
			<div className={styles.Tenant_Field}><p className={styles.Tenant_Field_header}>kaucja: </p> {state.tenant.deposit}zł</div>
			<div className={styles.Tenant_Field}><p className={styles.Tenant_Field_header}>next payment date: </p> {state.tenant.next_payment_date} <button ref={payButtonRef} className={styles.Tenant_Field_payButton} onClick={showHideButtonClicked}>Paid</button> </div>
			<div className={styles.Tenant_Field}><p className={styles.Tenant_Field_header}>moving in date: </p> {state.tenant.moving_in_date}</div>
			<Modal modalRef={modalRef} showHideButtonClicked={showHideButtonClicked} nextPaymentDateInputChanged={nextPaymentDateInputChanged} submitButtonClicked = {submitButtonClicked} nextPaymentDateInputRef={nextPaymentDateInputRef} submitButtonRef={submitButtonRef} state={state}></Modal>
		</div>
	)
}