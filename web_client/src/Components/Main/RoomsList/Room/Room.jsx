import React from 'react'
import styles from './Room.module.sass'
import {NavLink} from 'react-router-dom'

import getLink from './linkGenerator.js'

export const Room = props =>
		<NavLink to={getLink(props.name, props.id)} className = {styles['room-item']} >
			<h1 className = {[
					styles['room-item__name'],
					styles['room-item-header'],
					styles['room-item-field']
				].join(' ')
			}>
					{props.name}
			</h1>
			<p className = {[
					styles['room-item__name'],
					styles['room-item-header']
				].join(' ')
			}>
					{props.number}
			</p>
			
			available beds:
			<div className={[
					styles['room-item__available__space__status'],
					styles['room-item-field']
				].join(' ')
			}>

					<sup>{props.occupatedBeds}</sup>/<sub>{props.bedsAmount}</sub>


			</div>
		</NavLink>

