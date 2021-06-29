import React from 'react'
import styles from './Room.module.sass'
import {NavLink} from 'react-router-dom'

import getLink from './linkGenerator.js'



const c = (...classes) => {
	return classes.join(' ');
}

export const Room = props =>
		<NavLink to={getLink(props.name, props.id)} className = {styles.RoomItem} >
			<h1 className = {c(
					styles.RoomItem_name,
					styles.RoomItem_header,
					styles.RoomItem_field
			)}>

				{props.name}
			</h1>
			<p className = {c(
					styles.RoomItem_name,
					styles.RoomItem_header
			)}>
				room #{props.number}
			</p>
			
			occupated beds:
			<div className={c(
					styles.RoomItem_availableSpaceStatus,
					styles.RoomItem_field
				)
			}>
				
				<p>
					<span className = {props.occupatedBeds<props.bedsAmount?styles.red:''}>
						{props.occupatedBeds}
					</span>/
					<span>{props.bedsAmount}</span>	
				</p>

			</div>
		</NavLink>

