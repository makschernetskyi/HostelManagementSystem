import React from 'react';
import {Component} from 'react';
// import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import styles from './App.sass';

import { Header } from './Components/Header'
import { Main } from './Components/Main'
import { Footer } from './Components/Footer'




class App extends Component{
	render(){
		return(
			<div className = {styles.App}>
				<Header/>
				<Main/>
				<Footer/>
			</div>
		)
	}

}

export default App;