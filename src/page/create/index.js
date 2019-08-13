import React, { Component } from 'react'
import TabView, { Tab } from '../../component/tabViewV2'
import CategorySelect from '../../component/categorySelect'
import PriceForm from '../../component/priceForm'
// import { priceList, categories } from '../../store/mockData'
import WithContext from '../WithContext'

class CreatePage extends Component {
    constructor(props) {
        super(props)
        const { id } = this.props.match && this.props.match.params
        const { items, categories } = this.props.data
        this.state = {
            selectCategoryId: (id && items[id])? items[id].cid : null,
            selectTabType: (id && items[id])? categories[items[id].cid].type : 'income',
            editMode: (id && items[id])? true : false
        }
    }

    // getCId() {
    //     const { id } = this.props.match && this.props.match.params
    //     return id ? this.props.data.items[id].cid : null
    // }

    // getTabType(cid) {
    //     return cid ? this.props.data.categories[cid].type : 'income'
    // }

    static tabList = [
        {
            tabName: '收入',
            tabType: 'income',
        },
        {
            tabName: '支出',
            tabType: 'outcome'
        }
    ]

    cancelSubmit = () => {
        this.props.history.push('/')
    }

    formSubmit = (data) => {
        console.log('formSubmit', data)
        const { selectTabType, selectCategoryId, editMode } = this.state
        if(editMode) {
            const { id } = this.props.match && this.props.match.params
            this.props.actions.updateItem({...data, type: selectTabType, cid: selectCategoryId}, id)
        } else {
            this.props.actions.createItem({...data, type: selectTabType, cid: selectCategoryId})
        }
        this.props.history.push('/')
    }

    tabChange = (index) => {
        console.log('tabChange', index)
        this.setState({
            selectTabType: CreatePage.tabList[index].tabType
        })
    }

    selectCategory = (cid) => {
        console.log('selectCategory', cid)
        this.setState({
            selectCategoryId: cid
        })
    }

    render() {
        const { id } = this.props.match && this.props.match.params
        const { items, categories } = this.props.data
        const { selectTabType, selectCategoryId, editMode } = this.state
        const filterCategories = Object.keys(categories)
                                    .filter( id => categories[id].type === selectTabType )
                                    .map( id => categories[id] )
        const selectedTabIndex = CreatePage.tabList.findIndex(item => item.tabType === selectTabType)
        return (
            <div className="Page">
                <TabView 
                    activeTabIndex={selectedTabIndex}
                    onTabChange={this.tabChange} >
                   {
                       CreatePage.tabList.map( (item, index) => {
                           return <Tab key={index}>{item.tabName}</Tab>
                       })
                    }
                </TabView>
                <CategorySelect
                    categoryList={filterCategories}
                    selectCId={selectCategoryId}
                    onSelectCategory={this.selectCategory}
                />
                <PriceForm
                    editItem={editMode ? items[id] : null}
                    onCancelSubmit={this.cancelSubmit}
                    onFormSubmit={this.formSubmit}
                />
            </div>
        )
    }
}

export default WithContext(CreatePage);