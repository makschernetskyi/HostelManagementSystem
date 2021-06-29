import React from 'react'
import styles from './Main.module.sass'
import {Switch, Route} from 'react-router-dom'

import { HostelsList } from './HostelsList'
import { RoomsList } from './RoomsList'
import { TenantsList } from './TenantsList'
import { Tenant } from './Tenant'
import { AddTenant } from './AddTenant'
import { EditTenant } from './EditTenant'
import { AddRoom } from './AddRoom'
import { EditRoom } from './EditRoom'
import { AddHostel } from './AddHostel'
import { EditHostel } from './EditHostel'




export const Main = ({state, dispatch}) =>
	<main className = {styles.Main}>
		<Switch>
			<Route exact path = '/'>
				<HostelsList state = {state.hostelsPage} dispatch={dispatch}/>
			</Route>
			<Route path = "/hostel/">
				<RoomsList state = {state.roomsPage} dispatch={dispatch}/>
			</Route>
			<Route path = "/room/">
				<TenantsList state = {state.tenantsPage} dispatch={dispatch}/>
			</Route>
			<Route path = "/tenant/">
				<Tenant state = {state.tenantPage} dispatch={dispatch}/>
			</Route>
			<Route path= "/addNewTenant/">
				<AddTenant state = {state.addTenantPage} dispatch={dispatch}/>
			</Route>
			<Route path= "/EditTenant/">
				<EditTenant state = {state.editTenantPage} dispatch={dispatch}/>
			</Route>
			<Route path= "/AddNewRoom/">
				<AddRoom state = {state.addRoomPage} dispatch={dispatch}/>
			</Route>
			<Route path= "/EditRoom/">
				<EditRoom state = {state.editRoomPage} dispatch={dispatch}/>
			</Route>
			<Route path= "/AddNewHostel/">
				<AddHostel state = {state.addHostelPage} dispatch={dispatch}/>
			</Route>
			<Route path= "/EditHostel/">
				<EditHostel state = {state.editHostelPage} dispatch={dispatch}/>
			</Route>
		</Switch>
	</main>

