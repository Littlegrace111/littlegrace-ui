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
import store, { actionCreator } from '../../store'
// import { getInitialData, selectNewMonth } from '../../store/actionCreator'
import { connect } from 'react-redux'

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
            currentTabIndex: 0
        }
    }

    componentDidMount() {
        const { currentYearMonth } = this.props;
        this.props.getInitialData(currentYearMonth);
    }

    tabChange = (tabIndex) => {
        console.log(tabIndex);
        this.setState({
            currentTabIndex: tabIndex
        })
    }

    // createItem = () => {
    //     console.log('createItem');
    //     this.props.history.push('/create')
    // }

    // modifyItem = (modifyItem) => {
    //     this.props.history.push(`/edit/${modifyItem.id}`)
    // }

    // deleteItem = (deleteItem) => {
    //     actionCreator.deleteItem(deleteItem)(store.dispatch)
    // }

    // onChangeDate = (year, month) => {
    //     console.log('onChangeDate', year, month);
    //     actionCreator.selectNewMonth(year, month)(store.dispatch); // 函数柯里化
    // }

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
        console.log('home render')
        // const { items, categories, currentYearMonth, isLoading } = this.props.data
        const { items, categories, currentYearMonth, isLoading } = this.props;
        const { currentTabIndex } = this.state;
        
        const itemsWithCategory = Object.keys(items).map( id => {
            const newItem = {
                ...items[id],
                category: categories[items[id].cid]
            }
            return newItem
        })
      
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
                        onChange={this.props.onChangeDate}
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
                            onModifyItem={(item) => this.props.modifyItem(item)}
                            onDeleteItem={(item) => this.props.deleteItem(item)}
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
                        onCreateItem={this.props.createItem}
                    />
                </div>
                {/* <ScrollToTop /> */}
            </div>
        )
    }
}

// export default WithContext(HomePage);

// 定义mapStateToProps: 组件将会监听Redux Store的变化；
// 只要Redux Store 发生变化，mapStateToProps函数就会被调用；
// mapStateToProps 必须返回一个纯对象，这个对象会注入到组件的Props里；
const mapStateToProps = (state) => ({
    items: state.items,
    categories: state.categories,
    currentYearMonth: state.currentYearMonth,
    isLoading: state.isLoading
})

// dispatch注入到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        modifyItem(item) {
            ownProps.history.push(`/edit/${item.id}`)
        },
        deleteItem(item) {
            dispatch(actionCreator.deleteItem(item))
        },
        createItem() {
            ownProps.history.push('/create')
        },
        getInitialData(currentYearMonth) {
            dispatch(actionCreator.getInitialData(currentYearMonth));
        },
        onChangeDate(year, month) {
            dispatch(actionCreator.selectNewMonth(year, month))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
