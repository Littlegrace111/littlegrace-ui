import React, { Component } from 'react'
import TabView, { Tab } from '../../component/tabViewV2'
import CategorySelect from '../../component/categorySelect'
import PriceForm from '../../component/priceForm'
import Loader from '../../component/Loader'
// import { priceList, categories } from '../../store/mockData'
import WithContext from '../WithContext'

class CreatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectCategoryId: null,
            selectTabType: 'income',
            editItem: null
        }
    }

    componentDidMount() {
        const { id } = this.props.match && this.props.match.params
        // const { categories } = this.props.data
        this.props.actions.getEditData(id).then( editItem => {
            console.log('componentDidMount', editItem)
            const { categories } = this.props.data
            if(editItem) {
                this.setState({
                    selectCategoryId: editItem.cid,
                    selectTabType: categories[editItem.cid].type,
                    editItem: { ...editItem }
                })
            }
        })
    }

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
        const { selectTabType, selectCategoryId } = this.state
        const { id } = this.props.match && this.props.match.params
        if(id) { 
            this.props.actions.updateItem({...data, type: selectTabType, cid: selectCategoryId}, id)
                .then( result => {
                    console.log(result)
                    this.props.history.push('/')
                })
        } else {
            this.props.actions.createItem({...data, type: selectTabType, cid: selectCategoryId})
                .then( result => {
                    console.log(result)
                    this.props.history.push('/')
                })
        }
    }

    tabChange = (event, index) => {
        event.preventDefault()
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
        const { categories, isLoading } = this.props.data
        const { selectTabType, selectCategoryId, editItem } = this.state

        // 根据tab筛选category
        const filterCategories = Object.keys(categories)
                                    .filter( id => categories[id].type === selectTabType )
                                    .map( id => categories[id] )
        const selectedTabIndex = CreatePage.tabList.findIndex(item => item.tabType === selectTabType)
        console.log(selectedTabIndex)
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
                { isLoading && <Loader /> }
                <CategorySelect
                    categoryList={filterCategories}
                    selectCId={selectCategoryId}
                    onSelectCategory={this.selectCategory}
                />
                <PriceForm
                    editItem={editItem}
                    onCancelSubmit={this.cancelSubmit}
                    onFormSubmit={this.formSubmit}
                />
            </div>
        )
    }
}

export default WithContext(CreatePage);