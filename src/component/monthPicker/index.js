/**
 * 月份选择组件需求分析
 * 1. 按钮展示当前选择的年和月
 * 2. 点击按钮弹出下拉框，再次点击收回下拉框
 * 3. 可以接收年份和月份输入，抛出已选择好的年份月份
 * 4. 
 * <MonthPicker 
 *      year={2018}
 *      month={8} 
 *      onChange={onChange} />
 */

import React, { Component } from 'react'
import { padLeft, rangeArr } from '../../utility'
import PropTypes from 'prop-types'

class MonthPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isToggle: false,
            selectedYear: props.year,
            selectedMonth: props.month,
        }
    }

    toggleDropDown = (event) => {
        event.preventDefault()
        this.setState({
            isToggle: !this.state.isToggle
        })
    }

    isItemActive(selected, target) {
        if(selected === target) {
            return 'dropdown-item active'
        } else 
            return 'dropdown-item'
    }

    onYearSelectChange = (event, selected) => {
        // console.log(event);
        this.setState({
            selectedYear: selected
        })
    }

    onMonthSelectChange = (event, selected) => {
        console.log(event);
        this.setState({
            selectedMonth: selected, // setState 是异步的
            isToggle: !this.state.isToggle,
        })
        const { onChange } = this.props
        const { selectedYear } = this.state
        if(onChange) {
            // console.log(this.state)
            // console.log(selectedYear, selected) 
            onChange(selectedYear, selected) // 这是为什么不能用selectedMonth
        }
    }

    // 怎么实现点击MonthPicker组件以外的地方使得select面板消失
    componentDidMount() {
        document.addEventListener('click', this.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false)
    }

    handleClick = (event) => {
        console.log('event.target = ', event.target)
        console.log(this.domNode);
        if(this.domNode.contains(event.target))
            return
        
        this.setState({
            isToggle: false
        })
    }
    

    render() {
        const { year, month } = this.props
        const { selectedYear, selectedMonth, isToggle } = this.state
        return (
            <div className="dropdown" ref={(ref) => {this.domNode = ref}}>
                <h4>选择月份</h4>
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    onClick={this.toggleDropDown}>
                    {`${selectedYear}年 ${padLeft(month)} 月`}
                </button>
                {isToggle &&
                    <div className="dropdown-menu px-3" style={{display: 'block'}}> 
                        <div className="row flex-nowrap">
                            <div className="col border-right">
                                {rangeArr(year, -8, 9).map( (yearNumber) => {
                                    return (
                                        <a className={this.isItemActive(selectedYear, yearNumber)}
                                            href="#/"
                                            key={yearNumber} 
                                            onClick={ () => {this.onYearSelectChange(yearNumber)} } >
                                            {`${yearNumber} 年`}
                                        </a>
                                    )
                                })}
                            </div>
                            <div className="col">
                                {rangeArr(0, 1, 12).map( (monthNumber) => {
                                    return (
                                        <a className={this.isItemActive(selectedMonth, monthNumber)}
                                            href="#/"
                                            key={monthNumber} 
                                            onClick={ (event) => {this.onMonthSelectChange(event, monthNumber)} }>
                                            {`${padLeft(monthNumber)}月`}
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

MonthPicker.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onChange: PropTypes.func
}

MonthPicker.defaultProps = {
    year: 2018,
    month: 1
}

export default MonthPicker;