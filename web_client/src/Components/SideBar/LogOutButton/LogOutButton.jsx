import React from 'react'
import styles from './LogOutButton.module.sass'
import classes from '../../../tools/classes.js'




export const LogOutButton = props =>{

	function redirectToLogoutPage(){
		location = '/authentication/logout';
	}

	return(
		<a className = {classes(styles.Button, styles.FifthRow)} href='/authentication/logout'>
			<img src="/static/icons/logout.svg" className={styles.Icon}/>
		</a>


	)

}