import React, { Component, Fragment } from 'react'
import PropType from 'prop-types'
import Ionicon from 'react-ionicons'

class CategorySelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectCategroyId: props.selectCategory && props.selectCategory.id
        }
    }

    selectCategroy = (selectCategroy) => {
        // console.log(selectCategroy)
        this.setState({
            selectCategroyId: selectCategroy.id
        })
        this.props.onSelectCategory(selectCategroy)
    }

    render() {
        const { categoryList } = this.props
        const { selectCategroyId } = this.state

        return (
            <div className="row align-items-center">
                {
                    categoryList.map(item => {
                        const backgroundColor = (item.id === selectCategroyId) ? '#007bff' : 'grey'
                        return (
                            <div className={`col-2 ${(item.id === selectCategroyId ? 'category-item active' : 'category-item')} `}
                                key={item.id}
                                role="button"
                                style={{ textAlign: 'center' }}
                                onClick={() => { this.selectCategroy(item) }}>
                                <Ionicon
                                    icon={item.iconName}
                                    fontSize="50px"
                                    className="rounded-circle"
                                    color="white"
                                    style={{ backgroundColor: backgroundColor, padding: '5px' }}
                                />
                                <div>{item.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default CategorySelect