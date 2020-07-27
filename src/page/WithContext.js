import React from 'react'
import { AppContext } from '../App'

/**
 * Render Props
 * @param {UI} Component 
 */
const WithContext = (Component) => {
    // 返回一个functional的组件
    return (props) => (
        <AppContext.Consumer>
            {
                ({ state, actions }) => {
                    return <Component {...props} 
                                data={ state } 
                                actions={ actions } />
                }
            }
        </AppContext.Consumer>
    )
}

export default WithContext