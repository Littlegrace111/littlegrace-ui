import React from 'react';
import ReactDOM from 'react-dom';
import PriceForm from './'
import { shallow, mount } from 'enzyme'
import {priceList} from '../../store/mockData'

/**
 * 表单提交组件功能点：
 * 1. 创建模式：editItem为空
 * 2. 修改模式：必须传入editItem
 * 3. 点击提交，先验证输入内容，如果不符合特定类型，显示提示
 * 3.1 验证是否为空
 * 3.2 验证价格是否大于0
 * 
 */
const props = {
  onFormSubmit: jest.fn(),
  onCancelSubmit: jest.fn()
}

const props_with_edit = {
  editItem: priceList[0],
  onFormSubmit: jest.fn(),
  onCancelSubmit: jest.fn()
}

describe('test PriceForm Component with on item', () => {
  const wrapper = mount(<PriceForm {...props} />)
  const formInstance = wrapper.find(PriceForm).instance()
  const wrapper_with_item = mount(<PriceForm {...props_with_edit} />)

  // 产生一个表单，三个input框
  it('render PriceForm should generate three inputs and one form element', () => {
    expect(wrapper.find('input').length).toEqual(3)
    expect(wrapper.find('form').length).toEqual(1)
  })
  // 创建模式：input框里没有值
  it('render PriceForm with on data should render three inputs and on value', () => {
    expect(wrapper.find('#title').instance().value).toEqual('')
    expect(wrapper.find('#price').instance().value).toEqual('')
    expect(wrapper.find('#date').instance().value).toEqual('')
  })
  // 提交空的内容会有错误提示, submit回调不会触发
  it('submit form with empty input should show alert message', () => {
    wrapper.find('.btn-submit').simulate('click')
    expect(formInstance.state.showAlert).toEqual(true)
    expect(wrapper.find('.alert').length).toEqual(1)
    expect(props.onFormSubmit).not.toHaveBeenCalled()
  })
  //提交不符合规则的价格，会提示错误
  it('submit form with invalid price should show alert message', () => {
    wrapper.find('#title').instance().value = 'test'
    wrapper.find('#price').instance().value = -20
    wrapper.find('.btn-submit').simulate('click')
    expect(formInstance.state.showAlert).toEqual(true)
    expect(wrapper.find('.alert').length).toEqual(1)
    expect(props.onFormSubmit).not.toHaveBeenCalled()
  })
  //提交不符合规则的日期，会提示错误
  it('submit form with invalid date should show alert message', () => {
    wrapper.find('#title').instance().value = 'test'
    wrapper.find('#price').instance().value = 20
    wrapper.find('#date').instance().value = 20
    wrapper.find('.btn-submit').simulate('click')
    expect(formInstance.state.showAlert).toEqual(true)
    expect(wrapper.find('.alert').length).toEqual(1)
    expect(props.onFormSubmit).not.toHaveBeenCalled()
  })
  //提交正确的内容，会触发submit回调，拿到正确的数据
  it('submit form with valid data should call with the right object', () => {
    wrapper.find('#title').instance().value = 'test'
    wrapper.find('#price').instance().value = 20
    wrapper.find('#date').instance().value = '2018-01-01'
    const targetItem = {title: 'test', price: 20, date: '2018-01-01'}
    
    wrapper.find('.btn-submit').simulate('click')
    expect(props.onFormSubmit).toHaveBeenCalledWith(targetItem)
    expect(formInstance.state.showAlert).toEqual(false)
  })
  //点击取消按钮，会触发onCancel
  it('click the cancel button should call the right callback', () => {
    wrapper.find('.btn-cancel').simulate('click')
    expect(props.onCancelSubmit).toHaveBeenCalled()
  })
  //
  it('test PriceForm with item data', () => {
    expect(wrapper_with_item.find('#title').instance().value).toEqual(priceList[0].title)
    expect(wrapper_with_item.find('#price').instance().value*1).toEqual(priceList[0].price)
    expect(wrapper_with_item.find('#date').instance().value).toEqual(priceList[0].date)
  })
})