import React, { Component } from 'react'
import HomePage from './page/home'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
	render() {
		return (
			<div className="App">
				<HomePage />
			</div>
		)
	}
}

export default App;
