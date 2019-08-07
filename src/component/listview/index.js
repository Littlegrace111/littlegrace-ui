// listview 列表展示型组件
// 每次最多展示10条数据
// 删除和修改按钮

import React from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'

// functional component 适合展示型组件
const ListView = ({itemList, onDeleteItem, onModifyItem}) => {
    // console.log(itemList);
    if(itemList && itemList.length) {
        return (
            <ul className="list-group">
            {   
                itemList.map((item) => {
                    return (
                        <li className="list-group-item 
                            d-flex justify-content-between 
                            align-items-center"
                            key={item.id}>
                            <span className="col-1">
                                <Ionicon icon={item.category.iconName} 
                                    fontSize='30px'
                                />
                            </span>
                            <span className="col-4">
                                {item.title}
                            </span>
                            <span className="col-2">
                                {(item.category.type === 'income')? '+' : '-'}
                                {item.price}元
                            </span>
                            <span className="col-2">{item.date}</span>
                            <a className="col-1 btn"
                                href='/'
                                onClick={() => {onModifyItem(item)}}>
                                <Ionicon 
                                    icon="md-add-circle"
                                    fontSize="30px"
                                    color="green"
                                />
                            </a>
                            <a className="col-1 btn"
                                href='/'
                                onClick={() => {onDeleteItem(item)}}>
                                <Ionicon 
                                    icon="md-close-circle"
                                    fontSize="30px"
                                    color="red"
                                />
                            </a>
                        </li>
                    );
                })
            } 
            </ul>
        )
    } else 
        return null;
    
}

ListView.propTypes = {
    itemList: PropTypes.array.isRequired,
    onModifyItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired
}

ListView.defaultProps = {
    onModifyItem: () => {},
    onDeleteItem: () => {}
}

export default ListView;