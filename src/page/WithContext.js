import React from 'react'
import { AppContext } from '../App'
/**
 * HOC 高阶组件
 * 高阶组件是一个函数
 * @param {UI} Component 
 */
const withContext = (Component) => {
    // 返回一个functional的组件
    return (props) => (
        <AppContext.Consumer>
            {({ state }) => {
                return <Component {...props} data={ state } />
            }}
        </AppContext.Consumer>
    )
}

export default withContext