import React from 'react';
import ReactDOM from 'react-dom';
import TabView, { Tab } from '../../component/tabViewV2'
import { shallow, mount } from 'enzyme'

/**
 * TabView组件：需求点
 * 1. 根据传入的tab数量动态渲染
 * 2. 可以指定activeTab，不指定则默认第一个
 * 3. 点击Tab切换activeTab
 * <TabView 
    activeTabIndex={}  
    onTabChange={(selectedTabIndex) => {}/>
 *
 */
const props = {
    activeTabIndex: 0,
    onTabChange: jest.fn()
}

describe('test TabView and Tab Component', () => {
    const wrapper = shallow(
      <TabView {...props}>
        <Tab>1</Tab>
        <Tab>2</Tab>
        <Tab>3</Tab>
      </TabView>
    )

    it('should render two tab component, first one should be active', () => {
        expect(wrapper.find(Tab).length).toEqual(3)
        expect(wrapper.find('.nav-link').length).toEqual(3)
        // expect(wrapper.state().activeTabIndex).toEqual(0)
        expect(wrapper.find('.nav-link').first().hasClass('active')).toEqual(true)
    })

    it('click the 2nd Tab should change the active status and trigger the right function', () => {
        wrapper.find('.nav-link').last().simulate('click', { preventDefault: () => {}})
        // expect(wrapper.find('.nav-link').first().hasClass('active')).toEqual(false)
        // expect(wrapper.find('.nav-link').last().hasClass('active')).toEqual(true)
        // expect(wrapper.state().activeTabIndex).toEqual(2)
        expect(props.onTabChange).toHaveBeenCalledWith(2)
    })
})