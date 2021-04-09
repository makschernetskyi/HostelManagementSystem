import React from 'react';
import axios from 'axios';
import {Component} from 'react';
import styles from './App.module.sass';

import { Header } from '../Header';
import { Main } from '../Main';
import { Footer } from '../Footer';




export class App extends Component{
	constructor(props){
		super(props)
		this.state={
			Hostels:[]
		}
	}
	

	componentDidMount(){
		axios.get('/api/v0/hostels/')
			.then( response => this.setState({
				Hostels: response.data
			}))
			.catch(e => console.error(e))
	}

	render(){
		return(
			<div className = {styles.App}>
				<Header/>
				<Main hostels = {this.state.Hostels}/>
				<Footer/>
			</div>
		)
	}

}