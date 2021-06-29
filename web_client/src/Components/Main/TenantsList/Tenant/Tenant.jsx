import React from 'react'
import styles from './Tenant.module.sass'
import {NavLink} from 'react-router-dom'

import getLink from './linkGenerator.js'

const validatePaymentDate = (date) =>{
	console.log(new Date(Date.now()))
	return new Date(date) > new Date(Date.now())
}

export const Tenant = props =>
		<NavLink to={getLink(props.name, props.id)} className = {styles.Tenant} >
			<div className={styles.TennantInner}>
				<p className={styles.Tenant_field}>
					{props.name}
					{validatePaymentDate(props.nextPaymentDate)||<span className={styles.red}><br/>NOT PAID</span>}
				</p>
			</div>
			<div className={styles.Tenant_bedNumber}>
				{props.bedNumber}
			</div>
		</NavLink>

