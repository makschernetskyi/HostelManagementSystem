import React from 'react'
import styles from './HostelsList.module.sass'
import getHostelItems from './getHostelItems'




export const HostelsList = props => 
	<div className = {styles.list_wrapper}>
		<div className = {styles.list} >
			{getHostelItems(props.hostels)}
		</div>
	</div>

