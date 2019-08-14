import React, { Component } from 'react'
import HomePage from './page/home'
import CreatePage from './page/create'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { priceList, categories } from './store/mockData'
import { flattenArr, ID, parseToYearAndMonth } from './utility'
import axios from 'axios'

export const AppContext = React.createContext()

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: {},
			categories: {},
			currentYearMonth: parseToYearAndMonth('2018-08-11'),
		}
		this.actions = {
			getInitialData: () => {
				const {year, month } = this.state.currentYearMonth
				const getItemURLWithQuery = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
				const promiseArr = [ axios.get('/categories'), axios.get(getItemURLWithQuery) ]
				Promise.all(promiseArr).then( arrays => {
					console.log(arrays)
					const [ categories, itemsWithFilter ] = arrays
					this.setState({
						items: flattenArr(itemsWithFilter.data),
						categories: flattenArr(categories.data)
					})
				})
			},

			selectNewMonth: (year, month) => {
				const getItemURLWithQuery = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
				const promiseArr = [ axios.get(getItemURLWithQuery) ]
				Promise.all(promiseArr).then( arrays => {
					const [ itemsWithFilter ] = arrays
					this.setState({
						items: flattenArr(itemsWithFilter.data),
						currentYearMonth: { year, month }
					})
				})
			},

			createItem: (item) => {
				console.log('createItem', item)
				const newId = ID()
				item['id'] = newId
				const parseDate = parseToYearAndMonth(item.date)
				const monthCategory = `${parseDate.year}-${parseDate.month}`
				item['monthCategory'] = monthCategory
				const date = new Date(item.date)
				item.timestamp = Math.floor(new Date(date).getTime() / 1000) // 根据时间排序
				axios.post('/items', item).then( response => {
					console.log(response)
					this.setState({
						items: { ...this.state.items, [newId]: item }
					})
				})
				// this.setState({
				// 	items: { ...this.state.items, [newId]: item }
				// })
			},
			updateItem: (item, id) => {
				console.log('updateItem', item, id)
				const parseDate = parseToYearAndMonth(item.date)
				const monthCategory = `${parseDate.year}-${parseDate.month}`
				item['monthCategory'] = monthCategory
				const date = new Date(item.date)
				item.timestamp = Math.floor(new Date(date).getTime() / 1000) // 根据时间排序
				const newItem = {
					...this.state.items[id],
					...item
				}
				axios.put(`/items/${id}`, newItem).then( response => {
					console.log(response)
					this.setState({
						items: {...this.state.items, [newItem.id] : newItem }
					})
				})
				// this.setState({
				// 	items: {...this.state.items, [newItem.id] : newItem }
				// })
			},
			deleteItem: (item) => {
				axios.delete(`/items/${item.id}`).then( response => {
					console.log(response)
					delete this.state.items[item.id]
					this.setState({
						items: this.state.items
					})
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
