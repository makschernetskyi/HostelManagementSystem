import React, { useState, useEffect } from 'react'
import styles from './RoomsList.module.sass'

import {Room} from './Room'
import { useLocation } from 'react-router'
import axios from 'axios'

const API_HOSTELS_URL = "/api/v0/hostels/"

export const RoomsList = props =>{
	

	const [rooms, setRooms] = useState(null)

	
	const search = useLocation().search;
	const hostelId = parseInt(new URLSearchParams(search).get('id'));
	const hostelName = new URLSearchParams(search).get('name');


	useEffect(() => {
			let source = axios.CancelToken.source();
			const fetchHostel = async () =>{
				const hostelData = await axios.get(API_HOSTELS_URL+hostelId+'/',{cancelToken:source.token});

				return hostelData
			}

			const fetchRooms = async (hostel) =>{
				const roomsURLs = hostel?.data?.rooms || [];
				const roomsResponse = await Promise.all(
					roomsURLs.map(url => axios.get(url,{cancelToken:source.token}))
				)
				let roomsData;
				if(roomsResponse.length){
					roomsData = roomsResponse.map(room=>room.data);
				}else{
					roomsData = [];
				}
				setRooms(roomsData);
			}
			const fetchData = async () =>{
				fetchRooms(await fetchHostel())
			}
			fetchData()
			return function cleanup(){
				source.cancel("cancelling loading");
			}
	}, []);

	return(
		<div className = {styles['list-wrapper']}>
			<div className = {styles.list} >
				{rooms?.map(room=><Room name={room.room_name} number={room.room_number} occupatedBeds={room.occupated_beds} bedsAmount={room.amount_of_beds} id={room.id} key={room.id}/>)}
			</div>
		</div>
	)
}
		
