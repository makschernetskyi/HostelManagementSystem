import React, { useEffect } from 'react'
import styles from './RoomsList.module.sass'

import {Room} from './Room'
import { useLocation } from 'react-router'
import { fetchRooms } from '../../../redux/Reducers/roomsReducer'

export const RoomsList = ({state, dispatch}) =>{
	


	
	const search = useLocation().search;
	const hostelId = parseInt(new URLSearchParams(search).get('id'));

	const fetchRoomsData = (hostelId) => {
		dispatch(fetchRooms(hostelId))
	}

	useEffect(() => {
			fetchRoomsData(hostelId)
			return ()=>{}
	}, []);

	return(
		<div className = {styles.List}>
			<div className = {styles.List_Items} >
				{state.rooms.sort((room1,room2) => room1.room_number-room2.room_number).map(room=><Room name={room.room_name} number={room.room_number} occupatedBeds={room.tenants.length} bedsAmount={room.amount_of_beds} id={room.id} key={room.id}/>)}
			</div>
		</div>
	)
}
		
