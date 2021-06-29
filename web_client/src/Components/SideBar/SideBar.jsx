import React from 'react';
import styles from './SideBar.module.sass';

import {LogOutButton} from "./LogOutButton";
import {AddButton} from "./AddButton";
import {SearchBar} from "./Searchbar"
import {EditButton} from "./EditButton"
import {DeleteButton} from "./DeleteButton"
import { Route } from 'react-router';



export const SideBar = ({state,dispatch}) =>{
	return(
		<header className = {styles.Header}>
			<Route path={["/hostel/", "/room/"]} >
				<AddButton link='newHostel'/>
				<EditButton/>
				<DeleteButton/>
			</Route>
			<Route exact path="/">
				{/*<SearchBar/>*/}
				<AddButton link='newHostel'/>
			</Route>
			<Route path="/tenant/">
				<EditButton/>
				<DeleteButton/>
			</Route>
			<LogOutButton/>
		</header>
	)
}