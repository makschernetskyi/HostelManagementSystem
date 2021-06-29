import React, { useRef } from 'react';
import styles from './Tenant.module.sass'
import classes from '../../../tools/classes';



const Modal = ({nextPaymentDateInputChanged, submitButtonClicked, showHideButtonClicked, modalRef, nextPaymentDateInputRef, submitButtonRef, state}) => {

	const quitButtonRef = useRef()


	return (
		<div className={classes(styles.Modal, styles.hide)} ref={modalRef}>
			<span className={styles.Modal_quitButton} ref={quitButtonRef} onClick={showHideButtonClicked}>⨯</span>
			<div className={styles.Modal_Content}>
				next:
				<input type="date" ref={nextPaymentDateInputRef} className={styles.Modal_Content_nextPaymentDateInput} value={state.nextPaymentDate} onChange={nextPaymentDateInputChanged}/>
				<button ref={submitButtonRef} className={styles.Modal_Content_submitButton} onClick={submitButtonClicked}>Pay</button>
			</div>	
		</div>
	);
}

export default Modal;
