import React from 'react'
import styles from "./AddButton.module.sass"
import { NavLink, useLocation } from 'react-router-dom'


const getAddURI = (location)=>{
	switch(location){
		case "/hostel/": return "/addNewRoom/";
		case "/room/": return "/addNewTenant/";
		case "/": return "/addNewHostel/";
		default: return "/";
	}
}


export const AddButton = props =>{
	const search = useLocation();
	
	return(
		<NavLink to = {getAddURI(search.pathname)} className = {styles.button}>
			+
		</NavLink>
	)
}