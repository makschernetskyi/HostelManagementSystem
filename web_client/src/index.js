import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './Components/App';
import store from './redux/store.js'

import {BrowserRouter as Router} from 'react-router-dom'


const rerenderEntireTree = (state) =>{

	ReactDOM.render(
		<Router>
			<App state = {state} dispatch={store.dispatch.bind(store)}/>
		</Router>,
		document.getElementById('root')
	)
}

store.subscribe(()=>rerenderEntireTree(store.getState()))
rerenderEntireTree(store.getState())

