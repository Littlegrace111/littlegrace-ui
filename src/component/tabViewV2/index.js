import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'

// 展示型组件无状态模板
const TabViews = ({ children, activeTabIndex, onTabChange }) => {
    return (
        <ul className="nav nav-tabs nav-fill my-4">
            {
                React.Children.map(children, (child, index) => {
                    return (
                        <li className="nav-item">
                            <a className={(activeTabIndex === index ? 'nav-link active' : 'nav-link')}
                                role="button"
                                href="#/"
                                onClick={(event) => { event.preventDefault(); onTabChange && onTabChange(index)} }>
                                {child}
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

// props.children 使得组件可以传入一个component
export const Tab = ({ children }) => (
    <Fragment>{children}</Fragment>
)

export default TabViews;