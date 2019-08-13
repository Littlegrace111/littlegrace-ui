import React, { Component } from 'react'
import { isValidDate } from '../../utility'
// import PropTypes from 'prop-types'

// 展示型组件模板
class PriceForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAlert: false,
            alertMsg: ''
        }
    }

    // onTitleChange = (event) => {
    //     const title = event.target.value.trim();
    //     console.log('onTitleChange', title)
    // }

    // onPriceChange = (event) => {
    //     console.log('onPriceChange', event)
    // }

    // onDateChange = (event) => {
    //     console.log('onDateChange', event)
    // }

    onSubmitForm = (event) => {
        event.preventDefault()
        const { onFormSubmit } = this.props
        const title = this.titleInput.value.trim()
        const price = parseInt(this.priceInput.value.trim())
        const date = this.dateInput.value.trim()
        if( title && price && date ) {
            if(price < 0) {
                this.setState({
                    showAlert: true,
                    alertMsg: '价格必须大于0'
                })
            } else if(!isValidDate(date)) {
                this.setState({
                    showAlert: true,
                    alertMsg: '请填写正确的日期格式'
                })
            } else {
                this.setState({
                    showAlert: false,
                    alertMsg: ''
                })
                console.log(title, price, date)
                onFormSubmit && onFormSubmit({title, price, date})
            }
        } else {
            this.setState({
                showAlert: true,
                alertMsg: '请输入所有必选项'
            })
        }
    }

    render() {
        //const { title, price, date } = this.props.editItem
        const {showAlert, alertMsg } = this.state
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="title">标题<span color="red">*</span></label>
                    <input type="text" 
                        id="title"
                        className="form-control"  
                        placeholder="请输入标题"
                        defaultValue={this.props.editItem && this.props.editItem.title} // 这里需要用defaultValue
                        // onChange={this.onTitleChange}
                        ref={ input => this.titleInput = input }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">金额<span color="red">*</span></label>
                    <input type="number" 
                        id="price"
                        className="form-control"
                        placeholder="请输入金额"
                        defaultValue={this.props.editItem && this.props.editItem.price}
                        // onChange={this.onPriceChange}
                        ref={ input => this.priceInput = input }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">日期<span color="red">*</span></label>
                    <input type="date"
                        id="date"
                        className="form-control"
                        placeholder="请输入日期"
                        defaultValue={this.props.editItem && this.props.editItem.date}
                        // onChange={this.onDateChange}
                        ref={ input => this.dateInput = input }
                    />
                </div>
                <button type="submit" 
                    className="btn-submit btn btn-primary px-4"
                    onClick={this.onSubmitForm}>
                    提交
                </button>
                <button type="cancel" 
                    className="btn-cancel btn btn-secondary mx-4 px-4"
                    onClick={this.props.onCancelSubmit}>
                    取消
                </button>
                { showAlert &&
                    <div className="alert alert-danger mt-5">{alertMsg}</div>
                }
                
            </form>
        )
    }
}

export default PriceForm;