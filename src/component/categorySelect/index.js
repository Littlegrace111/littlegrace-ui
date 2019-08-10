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
            <div className="row">
            {
                categoryList.map( item => (
                    <div className={`col ${(item.id === selectCategroyId ? 'category-item active' : 'category-item')} `}
                        key={item.id}
                        onClick={() => {this.selectCategroy(item)}}>
                        <Ionicon
                            icon={item.iconName}
                            fontSize="40px"
                            className="rounded-circle "
                        />
                        <div>{item.name}</div>
                    </div>
                ))
            }   
            </div>
        )
    }
}

export default CategorySelect