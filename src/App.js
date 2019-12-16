import React, { Component } from 'react';
import AsyncRoute from './router/';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { priceList, categories } from './store/mockData'
import { flattenArr, ID, parseToYearAndMonth } from './utility'
import axios from 'axios'
import { Provider } from 'react-redux'
import store from './store'

export const AppContext = React.createContext();

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items: {},
			categories: {},
			currentYearMonth: parseToYearAndMonth(),
			isLoading: false,
			tabList: []
		}

		// 高阶函数: 入参传递一个函数，返回一个新的函数
		const withLoading = (callback) => {
			return ( ...args ) => {
				this.setState({
					isLoading: true
				})
				return callback( ...args )
			}
		}

		this.actions = {
			// 使用 async await 改造promise
			getInitialData: withLoading( async () => {
				const {year, month } = this.state.currentYearMonth
				const getItemURLWithQuery = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
				const arrays = await Promise.all([ axios.get('/categories'), axios.get(getItemURLWithQuery) ])
				console.log('getInitialData, response =', arrays)
				const [ categories, itemsWithFilter ] = arrays
				this.setState({
					items: flattenArr(itemsWithFilter.data),
					categories: flattenArr(categories.data),
					isLoading: false
				})
			}),

			selectNewMonth: withLoading( async (year, month) => {
				this.setState({ items: {} })
				const getItemURLWithQuery = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
				const arrays = await Promise.all([ axios.get(getItemURLWithQuery) ])
				console.log('selectNewMonth', arrays)
				const [ itemsWithFilter ] = arrays
				this.setState({
					items: flattenArr(itemsWithFilter.data),
					currentYearMonth: { year, month },
					isLoading: false
				})
			}),

			getEditData: withLoading( async (id) => {
				const { categories, items } = this.state
				const promiseArr = []
				// 如果categories为空才去请求
				if(Object.keys(categories).length === 0) {
					promiseArr.push(axios.get('/categories'))
				}
				let editItem = null
				if(id) {
					editItem = items[id] // items 里面找不到指定id项，才去请求
					!editItem && promiseArr.push( axios.get(`/items/${id}`))
				}
				const resultArr = await Promise.all(promiseArr)
				console.log(resultArr)
				const [ fetchedCategories, fetchedEditItem ] = resultArr
				if(fetchedCategories) {
					this.setState({
						categories: flattenArr(fetchedCategories.data),
						isLoading: false
					})
				} else {
					this.setState({ isLoading : false })
				}
				if(fetchedEditItem) {
					editItem = fetchedEditItem.data
				}
				return editItem
			}),

			createItem: withLoading(async (item) => {
				const newId = ID()
				item['id'] = newId
				const parseDate = parseToYearAndMonth(item.date)
				const monthCategory = `${parseDate.year}-${parseDate.month}`
				item['monthCategory'] = monthCategory
				const date = new Date(item.date)
				item.timestamp = Math.floor(new Date(date).getTime() / 1000) // 根据时间排序
				const result = await axios.post('/items', item)
				// this.setState({
				// 	items: { ...this.state.items, [newId]: item }
				// }) 
				return result;
			}),

			updateItem: withLoading( async (item, id) => {
				console.log('updateItem', item, id)
				const parseDate = parseToYearAndMonth(item.date)
				const monthCategory = `${parseDate.year}-${parseDate.month}`
				item['monthCategory'] = monthCategory
				const date = new Date(item.date)
				item.timestamp = Math.floor(new Date(date).getTime() / 1000) // 根据时间排序
				item.id = id
				console.log('newItem', item)
				const result = await axios.put(`/items/${id}`, item)
				// this.setState({
				// 	items: {...this.state.items, [newItem.id] : newItem }
				// })
				return result;
			}),

			deleteItem: withLoading( async (item) => {
				axios.delete(`/items/${item.id}`).then( response => {
					console.log(response)
					delete this.state.items[item.id]
					this.setState({
						items: this.state.items,
						isLoading: false
					})
				})
			}),

			getSearchInfo: withLoading((pageIndex) => {
				axios.get(`/searchInfo?pageIndex=${pageIndex}`).then( response => {
					console.log('searchInfo response =', response);
					if(response.status === 200) {
						this.setState( {
							tabList: [...response.data[0].tabList]
						})
					}
				})
			})
		}
	}

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
