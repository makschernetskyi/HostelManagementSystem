import React from 'react'
import styles from "./AddButton.module.sass"
import { NavLink, useLocation } from 'react-router-dom'
import classes from '../../../tools/classes.js'

const getAddURI = (path) => {
		switch(path){
			case "/hostel/":
				const hostelName = new URLSearchParams(location.search).get('name');
				const hostelId = new URLSearchParams(location.search).get('id');
				return `/addNewRoom/?room=${encodeURI(hostelName)}&id=${hostelId}`;
			case "/room/":
				const roomName = new URLSearchParams(location.search).get('name');
				const roomId = new URLSearchParams(location.search).get('id');
				return `/addNewTenant/?room=${encodeURI(roomName)}&id=${roomId}`;
			case "/":
				return `/addNewHostel/`;
			default: return "/";
		}
	}


export const AddButton = props =>{
	const location = useLocation();
	return(
		<NavLink to = {getAddURI(location.pathname)} className = {classes(styles.Button, styles.FirstRow)}>
			<img src="/static/icons/add.svg" className={styles.Icon}/>
		</NavLink>
	)
}