import React from 'react'
import styles from "./DeleteButton.module.sass"
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'
import classes from '../../../tools/classes.js'


const deleteRequestAndIfSuccessRedirect = async (url, headers, redirectUrl, history) => {
	axios.delete(url, headers).then(response => {
		history.push(redirectUrl)
		console.log(response)
	}).catch(err=>{
		alert(err);
	})
}



const deleteInstance = (path, history) => {

	const token = document.cookie
						.split('; ')
						.find(row => row.startsWith('csrftoken='))
						.split('=')[1];
	const headers ={
		headers:{
			'X-CSRFToken': token
		}
	}

	const id = new URLSearchParams(location.search).get('id');
	switch(path){
		case "/hostel/":
			deleteRequestAndIfSuccessRedirect(`/api/v0/hostels/${id}/`, headers, '/', history);
			break;
		case "/tenant/":
			deleteRequestAndIfSuccessRedirect(`/api/v0/tenants/${id}/`, headers, '/', history);
			break;
		case "/room/":
			deleteRequestAndIfSuccessRedirect(`/api/v0/rooms/${id}/`, headers, '/', history);
			break;
		default: return "/";
	}
}



export const DeleteButton = props =>{
	const location = useLocation();
	const history = useHistory()

	return(
		<div onClick = {() =>deleteInstance(location.pathname, history)} className = {styles.Button}>
			<img src="/static/icons/delete.svg" className={styles.Icon}/>
		</div>
	)
}