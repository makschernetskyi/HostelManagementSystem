import React from 'react'
import styles from './Hostel.module.sass'
import {NavLink} from 'react-router-dom'




export const Hostel = props =>
		<NavLink to={props.link} className = {styles['hostel-item']} >
			<p className = {[
					styles['hostel-item__name'],
					styles['hoostel-item-header'],
					styles['hostel-item-field']
				].join(' ')
			}>
					{props.name}
			</p>
			<p
				className={[
					styles['hostel-item__total__beds__amount'],
					styles['hostel-item-field']
				].join(' ')
			}>
				{props.adress}
			</p>
			<p
				className={[
					styles['hostel-item__total__beds__amount'],
					styles['hostel-item-field']
				].join(' ')
			}>
				Rooms: {props.rooms}
			</p>
			<p
				className={[
					styles['hostel-item__total__beds__amount'],
					styles['hostel-item-field']
				].join(' ')
			}>
				Free beds: {props.freeSpace}
			</p>
			<p
				className={[
					styles['hostel-item__total__beds__amount'],
					styles['hostel-item-field']
				].join(' ')
			}>
				About: {props.description}
			</p>
		</NavLink>
