import React, { Component } from 'react'
import ListView from '../../component/listview'
import TabView from '../../component/tabview'
import MonthPicker from '../../component/monthPicker'
import PriceCount from '../../component/priceCount'
import CreateBtn from '../../component/createBtn'
import { parseToYearAndMonth } from '../../utility'
import { priceList, categoryList } from '../../store/mockData'

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
            currentTab: 'list'
        }

        this.baseLine = priceList.length; // 防止createItem id 冲突
    }

    tabChange = (currentTabName) => {
        console.log(currentTabName);
        this.setState({
            currentTab: currentTabName
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
        
    }

    render() {
        // priceList 里面保存category的外键cid, 减少数据的冗余，实现数据重用
        const { priceList, currentTab, currentYearMonth } = this.state
        // 重新组合priceList和category
        const priceListWithCategory = priceList.map((item) => {
            // map 不会改变原数组，函数式编程，会返回一个新数组
            const newItem = {...item};
            newItem.category = categoryList[item.cid]
            // item.category = categoryList[item.cid] // 此操作已经改变了原数组
            return newItem
        })
        // 收入和支出可以通过priceList计算得到，不需要另外设计到state里面，保证state最小合集
        let totalInCome = 0, totalOutCome = 0;
        priceListWithCategory.forEach(item => {
            // forEach 会改变原数组，适合只读操作
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
                        activeTab={currentTab}
                        onTabChange={(currentTabName) => { this.tabChange(currentTabName) }}
                    />
                    { currentTab === 'list' &&
                        <ListView
                            itemList={priceListWithCategory}
                            onModifyItem={(item) => this.modifyItem(item)}
                            onDeleteItem={(item) => this.deleteItem(item)}
                        />
                    }
                    { currentTab === 'chart' &&
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

export default HomePage;
