import React, { Component } from 'react'
import TabView, { Tab } from '../../component/tabViewV2'
import CategorySelect from '../../component/categorySelect'
import PriceForm from '../../component/priceForm'
import { priceList, categories } from '../../store/mockData'
import App, { AppContext } from '../../App'

class CreatePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <AppContext.Consumer>
                {({ state }) => {
                    console.log(state)
                    return (
                        <div className="Page">
                            <TabView>
                                <Tab>收入</Tab>
                                <Tab>支出</Tab>
                            </TabView>
                            <CategorySelect
                                categoryList={categories}
                                selectCategory={categories[0]}
                                onSelectCategory={(item) => console.log(item)}
                            />
                            <PriceForm
                                editItem={priceList[0]}
                            />
                        </div>
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export default CreatePage;