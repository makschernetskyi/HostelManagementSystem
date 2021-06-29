import React from 'react';
import axios from 'axios';
import styles from './App.module.sass';

import { SideBar } from '../SideBar';
import { Main } from '../Main';
import { Footer } from '../Footer';




export const App = ({state, dispatch}) =>
	<div className = {styles.App}>
		<SideBar state = {state} dispatch = {dispatch}/>
		<Main state = {state} dispatch={dispatch}/>
		<Footer/>
	</div>
