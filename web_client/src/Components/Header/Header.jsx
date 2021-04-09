import React from 'react';
import styles from './Header.module.sass';

import {LogOutButton} from "./LogOutButton";
import {AddButton} from "./AddButton";
import {SearchBar} from "./Searchbar"



export const Header = props =>{
	return(
		<header className = {styles.header}>
			<SearchBar/>
			<AddButton link='newHostel'/>
			<LogOutButton/>
		</header>
	)
}