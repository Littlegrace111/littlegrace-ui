import React from 'react'
import { AppContext } from '../App'

/**
 * HOC 高阶组件
 * 高阶组件是一个函数
 * @param {UI} Component 
 */
const WithContext = (Component) => {
    // 返回一个functional的组件
    return (props) => (
        <AppContext.Consumer>
            {({ state, actions }) => {
                return <Component {...props} 
                            data={ state } 
                            actions={ actions } />
            }}
        </AppContext.Consumer>
    )
}

export default WithContext