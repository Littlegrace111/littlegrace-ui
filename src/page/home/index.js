import React, { Component } from 'react'
import ListView from '../../component/listview'
import TabView from '../../component/tabview'
import MonthPicker from '../../component/monthSelectView'
import PriceCount from '../../component/priceCount'
import { parseToYearAndMonth } from '../../utility'
import { priceList, categoryList } from './mockData'

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
    }

    onTabChange = (currentTabName) => {
        console.log(currentTabName);
    }

    render() {
        // priceList 里面保存category的外键cid, 减少数据的冗余，实现数据重用
        const { priceList, currentTab, currentYearMonth } = this.state
        // 重新组合priceList和category
        const priceListWithCategory = priceList.map((item) => {
            // map 不会改变原数组，函数式编程，会返回一个新数组
            item.category = categoryList[item.cid] // 此操作已经改变了原数组
            return item
        })
        // 收入和支出可以通过priceList计算得到，不需要另外设计到state里面，保证state最小合集
        let totalInCome = 0, totalOutCome = 0;
        priceList.forEach(item => {
            // forEach 会改变原数组，适合只读操作
            if(item.category.type === 'income') {
                totalInCome += item.price
            } else {
                totalOutCome += item.price
            }
        })

        return (
            <div className="HomePage">
                <div className="home-header d-flex 
                    justify-content-between
                    align-items-center">
                    <MonthPicker
                        year={currentYearMonth.year}
                        month={currentYearMonth.month}
                        onChange={(year, month) => { console.log(year, month) }}
                    />
                    <PriceCount
                        inCome={totalInCome}
                        outCome={totalOutCome}
                    />
                </div>
                <div className="listview-wrapper">
                    <TabView
                        activeTab={currentTab}
                        onTabChange={(currentTabName) => { console.log(currentTabName) }}
                    />
                    <ListView
                        itemList={priceListWithCategory}
                        onModifyItem={(item) => console.log(item)}
                        onDeleteItem={(item) => console.log(item)}
                    />
                </div>
            </div>
        )
    }
}

export default HomePage;
