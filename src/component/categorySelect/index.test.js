import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import CategorySelect from './'
import { categories } from '../../store/mockData'
import Ionicon from 'react-ionicons'

/**
 * 采用TDD的开发方式：
 * 1. 进行需求分析
 * 1.1 传入对应的categorys展示对应条目的categorys,每个条目包含一个图标和名称
 * 1.2 传入默认category，对应的条目被高亮
 * 1.3 点击某个条目，对应条目高亮，其他条目高亮移除，触发对应的回调函数
 * 2. 编写单元测试用
 * 3. 编写组件，一步一步fix单元测试
 */

const props = {
    categoryList: categories,
    onSelectCategory: jest.fn()
}

const props_with_select = {
    categoryList: categories,
    selectCategory: categories[0],
    onSelectCategory: jest.fn(),
}
describe('test CategorySelect Component', () => {
    //传入对应的categorys展示对应条目的categorys,每个条目包含一个图标和名称
    it('renders with categories should render the correct items', () => {
        const wrapper = mount(<CategorySelect {...props} />)
        expect(wrapper.find('.category-item').length).toEqual(categories.length)
        expect(wrapper.find('.category-item.active').length).toEqual(0)

        const firstIcon = wrapper.find('.category-item').first().find(Ionicon)
        expect(firstIcon.length).toEqual(1)
        expect(firstIcon.props().icon).toEqual(categories[0].iconName)
    })

    //传入默认category，对应的条目被高亮
    it('render selectCategory in categoryList, the item should highlight', () => {
        const wrapper = mount(<CategorySelect {...props_with_select}/>)
        // const component = renderer.create(<CategorySelect {...props_with_select}/>);
        // let tree = component.toJSON();
        // expect(tree).toMatchSnapshot();
        // 第一个item高亮
        expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(true)
    })

    it('click the item should add active class and trigger the callback', () => {
        const wrapper = mount(<CategorySelect {...props_with_select}/>)
        wrapper.find('.category-item').at(1).simulate('click') //, { preventDefault: () => {} }

        expect(wrapper.find('.category-item').at(1).hasClass('active')).toEqual(true) // 目标item是否高亮
        expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(false) // 之前item是否高亮
        expect(props_with_select.onSelectCategory).toHaveBeenCalledWith(categories[1])
    })

})