import React, { Component } from 'react'
import TabView, { Tab } from '../../component/tabViewV2'
import CategorySelect from '../../component/categorySelect'
import PriceForm from '../../component/priceForm'
import Loader from '../../component/loader';
// import store from '../../store'
// import { getEditData, updateItem, createItem } from '../../store/actionCreator'
import { actionCreator } from '../../store'
import { connect } from 'react-redux'

class CreatePage extends Component {
    constructor(props) {
        super(props);
        const { id } = this.props.match && this.props.match.params;
        this.state = {
            id,
            selectCategoryId: null,
            selectTabType: 'income'
        }
    }

    componentDidMount() {
        const { categories, items } = this.props;
        if(Object.keys(categories).length === 0) {
            this.props.getCategories();
        }
        const { id } = this.state;
        if(id) {
            if(items[id]) {
                this.props.setEditItem(items[id]);
            } else {
                this.props.getEditData(id);
            }
        }
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

    formSubmit = (data) => {
        console.log('formSubmit', data)
        const { selectTabType, selectCategoryId } = this.state
        const { id } = this.state;
        if(id) { 
            this.props.updateItem({...data, type: selectTabType, cid: selectCategoryId}, id);
        } else {
            this.props.createItem({...data, type: selectTabType, cid: selectCategoryId});
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
        const { categories, isLoading, editItem } = this.props;
        let selectTabType, selectCategoryId;
        if(editItem) {
            selectTabType = editItem.type;
            selectCategoryId = editItem.cid;
        } else {
            selectTabType = this.state.selectTabType;
            selectCategoryId = this.state.selectCategoryId;
        }

        // 根据tab筛选category
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

// export default CreatePage;
const mapStateToProps = (state) => ({
    items: state.items,
    categories: state.categories,
    editItem: state.editItem,
    isLoading: state.isLoading
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getEditData(id) {
            dispatch(actionCreator.getEditData(id));
        },
        setEditItem(item) {
            dispatch(actionCreator.setEditItem(item))
        },
        getCategories() {
            dispatch(actionCreator.getCategories())
        },
        cancelSubmit() {
            ownProps.history.push('/zhangben')
        },
        updateItem(item, id) {
            dispatch(actionCreator.updateItem(item, id))
            ownProps.history.push('/zhangben');
        },
        createItem(item) {
            dispatch(actionCreator.createItem(item))
            ownProps.history.push('/zhangben');
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);