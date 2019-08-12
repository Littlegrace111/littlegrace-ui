import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'
import MonthPicker from '.';

/**
 * 日期选择器的需求点
 * 1. 按钮展示当前选择的年和月
 * 2. 点击按钮弹出下拉框，再次点击收回下拉框
 * 3. 可以接收年份和月份输入，抛出已选择好的年份月份
 * 4. 年份生成：从当前年份往前推10年 (组件不检测年份是否合法)
 * 
 */
const props = {
    year: 2018,
    month: 8,
    onChange: jest.fn()
}

describe('test MonthPicker Component', () => {
    // const wrapper = mount(<MonthPicker {...props} />)
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<MonthPicker {...props} />)
    })

    it('should render the component to match the snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('render the correct year and month, show correct dropdown status', () => {
        const text = wrapper.find('.dropdown-toggle').first().text()
        expect(text).toEqual('2018年 08月')
        expect(wrapper.find('.dropdown-menu').length).toEqual(0)
        // console.log(wrapper.state())
        expect(wrapper.state('isToggle')).toEqual(false)
        expect(wrapper.state('selectedYear')).toEqual(props.year)
    })

    // 点击button，弹出dropdown menu, 选中的年和月必须active
    it('after click the button, dropdown should show, year list and month list should have the correct items', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        expect(wrapper.state('isToggle')).toEqual(true)
        expect(wrapper.find('.dropdown-menu').length).toEqual(1)
        expect(wrapper.find('.years-range .dropdown-item').length).toEqual(10)
        expect(wrapper.find('.months-range .dropdown-item').length).toEqual(12)
        expect(wrapper.find('.years-range .dropdown-item.active').text()).toEqual('2018年')
        expect(wrapper.find('.months-range .dropdown-item.active').text()).toEqual('08月')
    })

    // 点击button，选择末尾的年和月，返回选择的年和月，收回dropdown menu
    it('click the year&month item, should trigger the right status change', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        wrapper.find('.years-range .dropdown-item').last().simulate('click')
        expect(wrapper.find('.years-range .dropdown-item').last().hasClass('active')).toEqual(true)
        expect(wrapper.state('selectedYear')).toEqual(2019)
        wrapper.find('.months-range .dropdown-item').first().simulate('click')
        // expect(wrapper.find('.months-range .dropdown-item').first().hasClass('active')).toEqual(true)
        expect(wrapper.state('isToggle')).toEqual(false)
        expect(props.onChange).toHaveBeenCalledWith(2019, 1)
    })

    //点击monthPicker组件以外的地方，需要收回dropdown menu
    it('after dropdown menu is shown, click the document should close the menu', () => {
        let eventMap = {}
        document.addEventListener = jest.fn((event, cb) => {
            eventMap[event] = cb
        })
        const wrapper = mount(<MonthPicker {...props}/>)
        wrapper.find('.dropdown-toggle').simulate('click')
        expect(wrapper.state('isToggle')).toEqual(true)
        expect(wrapper.find('.dropdown-menu').length).toEqual(1)
        console.log(eventMap)
        eventMap.click({ target: ReactDOM.findDOMNode(wrapper.instance()) })
        expect(wrapper.state('isToggle')).toEqual(true)
        eventMap.click({ target: document})
        expect(wrapper.state('isToggle')).toEqual(false)
    })
})