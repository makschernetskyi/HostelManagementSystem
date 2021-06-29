import React, { useState, useEffect } from 'react'
import styles from './TenantsList.module.sass'
import { useLocation } from 'react-router'
import axios from 'axios'
import { generateBeds } from './generateBeds.js'
import { fetchTenants } from '../../../redux/Reducers/tenantsReducer'

const requestRoomsURL = "/api/v0/rooms/"



export const TenantsList = ({state, dispatch}) =>{
	
	const search = useLocation().search;
	const roomId = parseInt(new URLSearchParams(search).get('id'));
	//const roomName = new URLSearchParams(search).get('name');

	const fetchTenantsData = (roomId) =>{
		dispatch(fetchTenants(roomId))
	}

	useEffect(() => {
		fetchTenantsData(roomId)
	}, []);

	

	return(
		<div className = {styles.List}>
			<div className = {styles.List_Items} >
				{generateBeds(state.bedsAmount, state.tenants, styles)}
			</div>
		</div>
	)
}
		
