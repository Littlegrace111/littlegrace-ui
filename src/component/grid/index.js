import React, { Component } from 'react';
import * as GridStyle from './style';

// 展示型组件有状态模板
class Grid extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <GridStyle.Wrapper>
                <h2>这是一个Grid组件的标题</h2>
                <GridStyle.Group className="grid-group">
                    <Card 
                        title="item的标题"
                        text="item的内容"
                        image={require('../../assets/images/wallpaper.jpg')} />
                    <Card 
                        title="item的标题"
                        text="item的内容"
                        image={require('../../assets/images/wallpaper2.jpg')} />
                    <Card 
                        title="item的标题"
                        text="item的内容"
                        image={require('../../assets/images/wallpaper3.jpg')} />
                    <Card 
                        title="item的标题"
                        text="item的内容"
                        image={require('../../assets/images/wallpaper4.jpg')} />
                    <Card 
                        title="item的标题"
                        text="item的内容"
                        image={require('../../assets/images/wallpaper.jpg')} />
                    <Card 
                        title="item的标题"
                        text="item的内容"
                        image={require('../../assets/images/wallpaper2.jpg')} />
                    <Card 
                        title="item的标题"
                        text="item的内容"
                        image={require('../../assets/images/wallpaper3.jpg')} />
                    <Card 
                        title="item的标题"
                        text="item的内容"
                        image={require('../../assets/images/wallpaper4.jpg')} />
                </GridStyle.Group>
            </GridStyle.Wrapper>
        )
    }
}

const Card = props => (
    <GridStyle.Card>
        <img src={props.image} />
        <h3>{props.title}</h3>
        <p>{props.text}</p>
    </GridStyle.Card>
)

export default Grid;