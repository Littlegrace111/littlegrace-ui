import React, { Component } from 'react';
import AsyncRoute from './router/';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { priceList, categories } from './store/mockData'
// import { flattenArr, ID, parseToYearAndMonth } from './utility'
// import axios from 'axios'
import { Provider } from 'react-redux'
import store from './store'

export const AppContext = React.createContext();

class App extends Component {
	render() {
		return (
			<Provider store={ store }>
				<div className="App">
					<AsyncRoute />
				</div>
			</Provider>
		)
	}
}

export default App;
