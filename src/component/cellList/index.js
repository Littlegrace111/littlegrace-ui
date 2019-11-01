import React, { Component, Fragment} from 'react';
import * as CellStyle from './style';

// 展示型组件有状态模板
class CellList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <CellStyle.CellListWrapper>
                <h2>采用grid布局实现ListView响应式布局</h2>
                <CellStyle.CellListGroup>
                    <Cell 
                        title="这是Cell组件的标题"
                        image={require('../../assets/images/avatar.jpeg')} />
                    <Cell 
                        title="这是Cell组件的标题"
                        image={require('../../assets/images/avatar.jpeg')} />
                    <Cell 
                        title="这是Cell组件的标题"
                        image={require('../../assets/images/avatar.jpeg')} />
                    <Cell 
                        title="这是Cell组件的标题"
                        image={require('../../assets/images/avatar.jpeg')} />
                    <Cell 
                        title="这是Cell组件的标题"
                        image={require('../../assets/images/avatar.jpeg')} />
                    <Cell 
                        title="这是Cell组件的标题"
                        image={require('../../assets/images/avatar.jpeg')} />
                    <Cell 
                        title="这是Cell组件的标题"
                        image={require('../../assets/images/avatar.jpeg')} />
                    <Cell 
                        title="这是Cell组件的标题"
                        image={require('../../assets/images/avatar.jpeg')} />
                </CellStyle.CellListGroup>
            </CellStyle.CellListWrapper>
        )
    }
}

const Cell = props => (
    <CellStyle.CellGroup>
        <CellStyle.CellImage image={props.image}></CellStyle.CellImage>
        <CellStyle.CellTitle>{props.title}</CellStyle.CellTitle>
    </CellStyle.CellGroup>
) 

export default CellList;