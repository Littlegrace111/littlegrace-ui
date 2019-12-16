import React, { Component } from 'react'
import TabView, { Tab } from '../../component/tabViewV2'
import CategorySelect from '../../component/categorySelect'
import PriceForm from '../../component/priceForm'
import Loader from '../../component/loader';
import store from '../../store'
import { getEditData, updateItem, createItem } from '../../store/actionCreator'

class CreatePage extends Component {
    constructor(props) {
        super(props);
        const { id } = this.props.match && this.props.match.params;
        this.state = {
            id: id,
            selectCategoryId: null,
            selectTabType: 'income',
            editItem: null
        }
        this.globalData = store.getState();
    }

    componentDidMount() {
        // const { id } = this.props.match && this.props.match.params
        // const { categories } = this.props.data
        // this.props.actions.getEditData(id).then( editItem => {
        //     console.log('componentDidMount', editItem)
        //     const { categories } = this.props.data
        //     if(editItem) {
        //         this.setState({
        //             selectCategoryId: editItem.cid,
        //             selectTabType: categories[editItem.cid].type,
        //             editItem: { ...editItem }
        //         })
        //     }
        // })
        this.unsubscribe = store.subscribe(() => {
            this.globalData = store.getState();
        })
        getEditData(this.globalData, this.state.id)(store.dispatch).then( editItem => {
            console.log('getEditData =', editItem);
            const { categories } = this.globalData;
            if(editItem) {
                this.setState({
                    selectCategoryId: editItem.cid,
                    selectTabType: categories[editItem.cid].type,
                    editItem: { ...editItem }
                })
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
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
        const { id } = this.state;
        if(id) { 
            updateItem({...data, type: selectTabType, cid: selectCategoryId}, id)
                .then( result => {
                    console.log('updateItem =', result)
                    this.props.history.push('/zhangben');
                });
        } else {
            createItem({...data, type: selectTabType, cid: selectCategoryId})
                .then( result => {
                    console.log('createItem =', result)
                    this.props.history.push('/zhangben');
                });
        }
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
        // const { categories, isLoading } = this.props.data
        const { categories, isLoading } = this.globalData;
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

export default CreatePage;