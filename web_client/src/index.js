import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './Components/App';

import {BrowserRouter as Router} from 'react-router-dom'


const rerenderEntireTree = (state) =>{

	ReactDOM.render(
		<Router>
			<App appState = {state}/>
		</Router>,
		document.getElementById('root')
		)
}


rerenderEntireTree()

