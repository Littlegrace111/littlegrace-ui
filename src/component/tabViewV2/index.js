import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'

// 展示型组件有状态模板
class TabViews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTabIndex: props.activeTabIndex ? props.activeTabIndex : 0 // 不传默认第一个
        }
    }

    handleLinkClick = (event, index) => {
        event.preventDefault()
        console.log('onTabChange', index)
        const { onTabChange } = this.props;
        this.setState({
            activeTabIndex: index
        })
        onTabChange && onTabChange(index)
    }

    render() {
        const { children } = this.props
        const { activeTabIndex } = this.state
        return (
            <ul className="nav nav-tabs nav-fill my-4">
            {   
                React.Children.map(children, (child, index) => {
                    return (
                        <li className="nav-item"> 
                            <a className={(activeTabIndex === index ? 'nav-link active' : 'nav-link')}
                                role="button"
                                href="#/"
                                onClick={(event) => this.handleLinkClick(event, index)}>
                                {child}
                            </a>
                        </li>
                    )
                })
            }
            </ul>
        )
    }
}

// props.children 使得组件可以传入一个component
export const Tab = ({ children }) => (
    <Fragment>{children}</Fragment>
)

export default TabViews;