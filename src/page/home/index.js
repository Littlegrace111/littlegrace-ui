import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
import ListView from '../../component/listview'
// import TabView from '../../component/tabview'
import TabView, { Tab } from '../../component/tabViewV2'
import MonthPicker from '../../component/monthPicker'
import PriceCount from '../../component/priceCount'
import CreateBtn from '../../component/createBtn'
import { parseToYearAndMonth } from '../../utility'
import { priceList, categoryList } from '../../store/mockData'
import { padLeft } from '../../utility'
import { AppContext } from '../../App'

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
            priceList: priceList,
            currentYearMonth: parseToYearAndMonth(),
            currentTabIndex: 0
        }

        this.baseLine = priceList.length; // 防止createItem id 冲突
    }

    tabChange = (tabIndex) => {
        console.log(tabIndex);
        this.setState({
            currentTabIndex: tabIndex
        })
    }

    createItem = () => {
        console.log('createItem');
        const testData = {
            "title": "新添加的条目",
            "price": 100,
            "date": "2018-08-10",
            "cid": "3"
        }
        const { priceList } = this.state;
        this.baseLine ++
        testData.id = this.baseLine;
        this.setState({
            priceList: [...priceList, testData]
        })
    }

    modifyItem = (modifyItem) => {
        console.log('modifyItem', modifyItem)
        // 函数式编程返回一个新数组
        const modifyPriceList = this.state.priceList.map( item => {
            if(item.id === modifyItem.id) {
                return {...item, title: '我更新了'}
            } else {
                return item
            }
        })
        this.setState({
            priceList: modifyPriceList
        })
    }

    deleteItem = (deleteItem) => {
        console.log('deleteItem', deleteItem)
        const filterPriceList = this.state.priceList.filter( item => item.id !== deleteItem.id)
        console.log(filterPriceList)
        this.setState({
            priceList: filterPriceList
        })
    }

    onChangeDate = (year, month) => {
        console.log('onChangeDate', year, month)
        this.setState({
            currentYearMonth: { year, month }
        })
        // const currentDate = year + '-' + padLeft(month) 
        // const priceListWithSelectedDate = priceList.filter(item => item.date.indexOf(currentDate) !== -1)
        // console.log(priceListWithSelectedDate)
    }

    render() {
        // priceList 里面保存category的外键cid, 减少数据的冗余，实现数据重用
        const { priceList, currentTabIndex, currentYearMonth } = this.state
        // 根据当前日期过滤priceList
        const currentDate = currentYearMonth.year + '-' + padLeft(currentYearMonth.month) 
        const targetPriceList = priceList.filter(item => item.date.indexOf(currentDate) !== -1)
        console.log(targetPriceList)
        // 重新组合priceList和category
        targetPriceList.forEach( item => {
            item.category = categoryList[item.cid]
        })
        // const priceListWithCategory = priceList.map((item) => {
        //     // map 不会改变原数组，函数式编程，会返回一个新数组
        //     const newItem = {...item};
        //     newItem.category = categoryList[item.cid]
        //     // item.category = categoryList[item.cid] // 此操作已经改变了原数组
        //     return newItem
        // })

        // 收入和支出可以通过priceList计算得到，不需要另外设计到state里面，保证state最小合集
        console.log(targetPriceList)
        let totalInCome = 0, totalOutCome = 0;
        targetPriceList.forEach(item => {
            // forEach 会改变原数组，适合只读操作
            console.log(item.category)
            if(item.category.type === 'income') {
                totalInCome += item.price
            } else {
                totalOutCome += item.price
            }
        })

        return (
            <AppContext.Consumer>
                {({ state }) => {
                    console.log(state)
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
                                {/* <TabView
                                    activeTab={currentTab}
                                    onTabChange={(currentTabName) => { this.tabChange(currentTabName) }}
                                /> */}
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
                                        itemList={targetPriceList}
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
                }}
            </AppContext.Consumer>
        )
    }
}

export default HomePage;
