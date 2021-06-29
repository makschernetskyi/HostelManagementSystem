import React from 'react'
import styles from './HostelsList.module.sass'
import getHostelItems from './getHostelItems'
import {useEffect} from 'react'

import {fetchHostels} from '../../../redux/Reducers/hostelsReducer'




export const HostelsList = ({state, dispatch}) => {

	const fetchHostelsData = () => {
		dispatch(fetchHostels());
	}

	useEffect(() => {
		fetchHostelsData()
		return () => {};
	}, []);

	return(
		<div className = {styles.List}>
			<div className = {styles.List_Items} >
				{getHostelItems(state.hostels)}
				{state.errors[0]?.message}
			</div>
		</div>
	)
}

