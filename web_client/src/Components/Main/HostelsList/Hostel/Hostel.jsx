import React from 'react'
import styles from './Hostel.module.sass'
import {NavLink} from 'react-router-dom'




export const Hostel = props =>
		<NavLink to={props.link} className = {styles.HostelItem} >
			<p><b>name:</b>{props.name}</p>
			<p><b>adress:</b> {props.adress}</p>
			<p><b>rooms:</b> {props.rooms}</p>
			<p><b>available beds:</b><span className = {props.freeSpace>2?styles.red:''}>{props.freeSpace}</span></p>	
			{props.description&&<p><b>about:</b>{props.description}</p>}
		</NavLink>
