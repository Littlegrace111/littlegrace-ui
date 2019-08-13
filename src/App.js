import React, { Component } from 'react'
import HomePage from './page/home'
import CreatePage from './page/create'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { priceList, categories } from './store/mockData'
import { flattenArr, ID } from './utility'

export const AppContext = React.createContext()

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: flattenArr(priceList),
			categories: flattenArr(categories)
		}
		this.actions = {
			createItem: (item) => {
				console.log('createItem', item)
				const itemId = ID()
				item['id'] = itemId
				const date = new Date(item.date)
				item.timestamp = Math.floor(new Date(date).getTime() / 1000)
				this.setState({
					items: { ...this.state.items, [itemId]: item }
				})
			},
			updateItem: (item, id) => {
				console.log('updateItem', item, id)
				const date = new Date(item.date)
				item.timestamp = Math.floor(new Date(date).getTime() / 1000)
				const newItem = {
					...this.state.items[id],
					...item
				}
				this.setState({
					items: {...this.state.items, [newItem.id] : newItem }
				})
			},
			deleteItem: (item) => {
				delete this.state.items[item.id]
				this.setState({
					items: this.state.items
				})
			}
		}
	}

	render() {
		return (
			<AppContext.Provider value={{
				state: this.state,
				actions: this.actions
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
