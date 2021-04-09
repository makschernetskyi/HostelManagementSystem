import React, { useState, useEffect } from 'react'
import styles from './TenantsList.module.sass'

import {Tenant} from './Tenant'
import { useLocation } from 'react-router'
import axios from 'axios'

const API_ROOMS_URL = "/api/v0/rooms/"

export const TenantsList = props =>{
	

	const [tenants, setTenants] = useState(null)

	
	const search = useLocation().search;
	const roomId = parseInt(new URLSearchParams(search).get('id'));
	const roomName = new URLSearchParams(search).get('name');


	useEffect(() => {
			let source = axios.CancelToken.source();
			const fetchRoom = async () =>{
				const roomData = await axios.get(API_ROOMS_URL+roomId+'/',{cancelToken:source.token});

				return roomData
			}

			const fetchTenants = async (room) =>{
				const tenantsURLs = room?.data?.tenants || [];
				const tenantsResponse = await Promise.all(
					tenantsURLs.map(url => axios.get(url,{cancelToken:source.token}))
				)
				let tenantsData;
				if(tenantsResponse.length){
					tenantsData = tenantsResponse.map(tenant=>tenant.data);
				}else{
					tenantsData = [];
				}
				setTenants(tenantsData);
			}
			const fetchData = async () =>{
				fetchTenants(await fetchRoom())
			}
			fetchData()
			return function cleanup(){
				source.cancel("cancelling loading");
			}
	}, []);

	return(
		<div className = {styles['list-wrapper']}>
			<div className = {styles.list} >
				{tenants?.map(tenant=><Tenant key={tenant.id}/>)}
			</div>
		</div>
	)
}
		
