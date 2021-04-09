import React from 'react'
import styles from './Main.module.sass'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import { HostelsList } from './HostelsList'
import { RoomsList } from './RoomsList'
import { TenantsList } from './TenantsList'




export const Main = props => 
	<main className = {styles.main}>
		<Switch>
			<Route exact path = '/'>
				<HostelsList hostels = {props.hostels}/>
			</Route>
			<Route path = "/hostel/">
				<RoomsList/>
			</Route>
			<Route path = "/room/">
				<TenantsList/>
			</Route>
		</Switch>
	</main>

