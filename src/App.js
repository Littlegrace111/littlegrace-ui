import React, { Component } from 'react'
import HomePage from './page/home'
import CreatePage from './page/create'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { priceList, categories } from './store/mockData'
import { flattenArr } from './utility'

export const AppContext = React.createContext()

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: flattenArr(priceList),
			categories: flattenArr(categories)
		}
	}

	render() {
		return (
			<AppContext.Provider value={{
				state: this.state
			}}>
				<div className="App">
					<BrowserRouter>
						<Route path='/' exact component={HomePage} ></Route>
						<Route path='/create' component={CreatePage} ></Route>
						<Route path='/edit/:id' component={CreatePage} ></Route>
					</BrowserRouter>
				</div>
			</AppContext.Provider>
		)
	}
}

export default App;
