import React, { Component } from 'react'
import HomePage from './page/home'
import CreatePage from './page/create'
import { BrowserRouter, Route } from 'react-router-dom' 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Route path='/' exact component={ HomePage } ></Route>
					<Route path='/create' component={ CreatePage } ></Route>
					<Route path='/edit/:id' component={ CreatePage } ></Route>
				</BrowserRouter>
			</div>
		)
	}
}

export default App;
