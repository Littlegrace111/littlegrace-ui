/**
 * TabView 组件需求分析
 * 1. highlight当前选择的tab
 * 2. 切换tab事件
 * <TabView 
 *      activeTab="list"
 *      onTabChange={onTabChange} />
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'

class TabView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 'list'
        }
    }
    handleTabClick = (event, tabName) => {
        event.preventDefault();
        this.setState({currentTab: tabName});
        this.props.onTabChange(tabName);
    }

    isTabActive(tabName) {
        if(tabName === this.state.currentTab) {
            return true;
        } else 
            return false;
    }

    render() {
        // const { activeTab, onTabChange } = this.props;
        return (
            <ul className="nav nav-tabs nav-fill my-4">
                <li className="nav-item">
                    <a className={this.isTabActive('list')? 'nav-link active' : 'nav-link'}
                        href="/"
                        onClick={(event) => this.handleTabClick(event, 'list')} >
                        <Ionicon
                            icon="md-list-box"
                            fontSize="30px"
                            color={this.isTabActive('list')? '#495057' : '#007bff'}
                        />
                        列表模式
                    </a>
                </li>
                <li className="nav-item">
                    <a className={this.isTabActive('chart')? 'nav-link active' : 'nav-link'}
                        href="/"
                        onClick={(event) => this.handleTabClick(event, 'chart')} >
                        <Ionicon
                            icon="md-pie"
                            fontSize="30px"
                            color={this.isTabActive('chart')? '#495057' : '#007bff'}
                        />
                        图标模式
                    </a>
                </li>
            </ul>
        )
    }
}

TabView.propTypes = {
    activeTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func
}

TabView.defaultProps = {
    activeTab: 'list'
}

export default TabView;