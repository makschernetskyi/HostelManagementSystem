import React from 'react'
import styles from "./EditButton.module.sass"
import { NavLink, useLocation } from 'react-router-dom'
import classes from '../../../tools/classes.js'


const getEditURI = (path) =>{
	const id = new URLSearchParams(location.search).get('id')
	switch(path){
		case "/room/":
			return `/editRoom/?id=${id}`;
		case "/tenant/":
			return `/editTenant/?id=${id}`;
		case "/hostel/":
			return `/editHostel/?id=${id}`;;
		default: return "/";
	}
}


export const EditButton = props =>{
	const location = useLocation();

	return(
		<NavLink to = {getEditURI(location.pathname)} className = {styles.Button}>
			<img src="/static/icons/edit.svg" className={styles.Icon}/>
		</NavLink>
	)
}