import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import ListView from '../../component/listview'
// import TabView from '../../component/tabview'
import TabView, { Tab } from '../../component/tabViewV2'
import MonthPicker from '../../component/monthPicker'
import PriceCount from '../../component/priceCount'
import CreateBtn from '../../component/createBtn'
import { parseToYearAndMonth } from '../../utility'
// import { priceList, categoryList } from '../../store/mockData'
import { padLeft } from '../../utility'
import WithContext from '../WithContext'

/**
 * State最小设计原则：DRY don't repeat yourself
 * 1. 价格列表
 * 2. 当前年月
 * 3. 钱数支出收入总和 (可以通过价格列表计算得到)
 * 4. 价格条目的分类信息和月份信息
 * 5. 当前视图信息(列表模式还是图标模式)
 */

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // priceList: priceList,
            currentYearMonth: parseToYearAndMonth(),
            currentTabIndex: 0
        }
        // this.combineItemsAndCategories()
        // this.baseLine = priceList.length; // 防止createItem id 冲突
    }

    combineItemsAndCategories() {
        // 组合items和category
        const { items, categories } = this.props.data
        this.itemsWithCategory = Object.keys(items).map( id => {
            items[id].category = categories[items[id].cid]
            return items[id]
        })
    }

    tabChange = (tabIndex) => {
        console.log(tabIndex);
        this.setState({
            currentTabIndex: tabIndex
        })
    }

    createItem = () => {
        console.log('createItem');
        this.props.history.push('/create')
    }

    modifyItem = (modifyItem) => {
        // console.log('modifyItem', modifyItem)
        // 函数式编程返回一个新数组
        // const modifyPriceList = this.state.priceList.map( item => {
        //     if(item.id === modifyItem.id) {
        //         return {...item, title: '我更新了'}
        //     } else {
        //         return item
        //     }
        // })
        // this.setState({
        //     priceList: modifyPriceList
        // })
        this.props.history.push(`/edit/${modifyItem.id}`)
    }

    deleteItem = (deleteItem) => {
        console.log('deleteItem', deleteItem)
        // const filterPriceList = this.state.priceList.filter( item => item.id !== deleteItem.id)
        // console.log(filterPriceList)
        // this.setState({
        //     priceList: filterPriceList
        // })
    }

    onChangeDate = (year, month) => {
        console.log('onChangeDate', year, month)
        this.setState({
            currentYearMonth: { year, month }
        })
    }

    render() {
        const { items, categories } = this.props.data
        const { currentTabIndex, currentYearMonth } = this.state
        
        let itemsWithCategory = Object.keys(items).map( id => {
            const newItem = {
                ...items[id],
                category: categories[items[id].cid]
            }
            // items[id].category = categories[items[id].cid] // react immutable 思想，
            return newItem
        })
        // 根据当前日期过滤items
        const currentDate = currentYearMonth.year + '-' + padLeft(currentYearMonth.month) 
        itemsWithCategory = itemsWithCategory.filter(item => item.date.indexOf(currentDate) !== -1)
        
        let totalInCome = 0, totalOutCome = 0;
        itemsWithCategory.forEach(item => {
            if(item.category.type === 'income') {
                totalInCome += item.price
            } else {
                totalOutCome += item.price
            }
        })

        return (
            <div className="Page">
                <div className="home-header d-flex
                                justify-content-between
                                align-items-center">
                    <MonthPicker
                        year={currentYearMonth.year}
                        month={currentYearMonth.month}
                        onChange={this.onChangeDate}
                    />
                    <PriceCount
                        inCome={totalInCome}
                        outCome={totalOutCome}
                    />
                </div>
                <div className="listview-wrapper">
                    <TabView
                        onTabChange={(selectedTabIndex) => { this.tabChange(selectedTabIndex) }}>
                        <Tab>
                            <Ionicon
                                icon="md-list-box"
                                fontSize="30px"
                                color={currentTabIndex === 0 ? '#495057' : '#007bff'} />
                            <span>列表模式</span>
                        </Tab>
                        <Tab>
                            <Ionicon
                                icon="md-pie"
                                fontSize="30px"
                                color={currentTabIndex === 1 ? '#495057' : '#007bff'} />
                            <span>图标模式</span>
                        </Tab>
                    </TabView>
                    { currentTabIndex === 0 &&
                        <ListView
                            itemList={itemsWithCategory}
                            onModifyItem={(item) => this.modifyItem(item)}
                            onDeleteItem={(item) => this.deleteItem(item)}
                        />
                    }
                    { currentTabIndex === 1 &&
                        <h4>这是图表</h4>
                    }
                    <CreateBtn 
                        onCreateItem={this.createItem}
                    />
                </div>
            </div>
        )
    }
}

export default WithContext(HomePage);
