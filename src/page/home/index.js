import React, { Component, Fragment } from 'react'
// 以下是引入的组件
import Ionicon from 'react-ionicons'
import ListView from '../../component/listview'
// import TabView from '../../component/tabview'
import TabView, { Tab } from '../../component/tabViewV2'
import MonthPicker from '../../component/monthPicker'
import PriceCount from '../../component/priceCount'
import CreateBtn from '../../component/createBtn'
import Loader from '../../component/loader'
import PieChart from '../../component/charts'
import ScrollToTop from '../../component/scrollToTop'
import store from '../../store'
import { getInitialData, selectNewMonth } from '../../store/actionCreator'

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
            currentTabIndex: 0,
            ...store.getState()
        }
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        })
        getInitialData(this.state.currentYearMonth)(store.dispatch);
    }

    componentWillUnmount() {
        this.unsubscribe();
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
        this.props.history.push(`/edit/${modifyItem.id}`)
    }

    deleteItem = (deleteItem) => {
        this.props.actions.deleteItem(deleteItem)
    }

    onChangeDate = (year, month) => {
        console.log('onChangeDate', year, month);
        // this.props.actions.selectNewMonth(year, month);
        selectNewMonth(year, month)(store.dispatch); // 函数柯里化
    }

    calculateItems(items, type = 'outcome') {
        const CategoryMap = {}
        items.filter( item => item.category.type === type).forEach( item => {
            if(CategoryMap[item.cid]) { //if have 
                CategoryMap[item.cid].value += (item.price * 1)
                CategoryMap[item.cid].items.push(item.id)
            } else {
                CategoryMap[item.cid] = {
                    name: item.category.name,
                    value: item.price * 1,
                    items: [item.id]
                }
            }
        })
        console.log(CategoryMap)
        return Object.keys(CategoryMap).map( id => ({...CategoryMap[id], id}))
    }

    render() {
        // const { items, categories, currentYearMonth, isLoading } = this.props.data
        const { items, categories, currentYearMonth, isLoading } = this.state;
        const { currentTabIndex } = this.state;
        
        const itemsWithCategory = Object.keys(items).map( id => {
            const newItem = {
                ...items[id],
                category: categories[items[id].cid]
            }
            return newItem
        })
        console.log(this.calculateItems(itemsWithCategory))
        // 根据当前日期过滤items
        // const currentDate = currentYearMonth.year + '-' + padLeft(currentYearMonth.month) 
        // itemsWithCategory = itemsWithCategory.filter(item => item.date.indexOf(currentDate) !== -1)
        
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
                        activeTabIndex={currentTabIndex}
                        onTabChange={this.tabChange}>
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
                    { isLoading && <Loader /> }
                    { currentTabIndex === 0 &&
                        <ListView
                            itemList={itemsWithCategory}
                            onModifyItem={(item) => this.modifyItem(item)}
                            onDeleteItem={(item) => this.deleteItem(item)}
                        />
                    }
                    { currentTabIndex === 1 &&
                        <Fragment>
                            <div className="row text-center">
                                <div className="col">
                                    <h5>这是收入</h5>
                                    <PieChart data={this.calculateItems(itemsWithCategory, 'income')}/>
                                </div>
                                <div className="col">
                                    <h5>这是支出</h5>
                                    <PieChart data={this.calculateItems(itemsWithCategory, 'outcome')}/>
                                </div>
                            </div>
                        </Fragment>    
                    }
                    <CreateBtn 
                        onCreateItem={this.createItem}
                    />
                </div>
                <ScrollToTop />
            </div>
        )
    }
}

// export default WithContext(HomePage);
export default HomePage;
