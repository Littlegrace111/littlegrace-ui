import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Header from '../../component/header'
import Wave from '../../animation/wave'
import Search from '../../component/search'

const BgImg = styled.div`
    position: relative;
    width: 100%;
    height: 900px;
    background: url(https://img.alicdn.com/tfs/TB1XpR6bVT7gK0jSZFpXXaTkpXa-1280-720.png);
    background-size: cover;
    background-position: center;

    .header-group {
        margin: 0 auto;
        max-width: 500px;
        padding: 100px 50px;
        text-align: center;
    }

    h1 {
        color: white;
        font-size: 60px;
        line-height: 1.2;
        opacity: 0;
        animation: HeroAnimation;
        animation-duration: 2s;
        ${'' /* 动画添加适当的delay可以让动画看起来更加organic和orchestrated */}
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
        animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    p {
        color: rgba(255, 255, 255, 0.8);
        font-size: 30px;
        line-heigth: 1.5;
        animation: HeroAnimation 2s 0.2s forwards cubic-bezier(0.2, 0.8, 0.2, 1);
        opacity: 0;
    }

    @keyframes HeroAnimation {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    svg {
        position: absolute;
        left: 0px;
        bottom: -50px;
    }
`;


// 展示型组件有状态模板
class WelcomePage extends Component {
    static pageName = 'WelcomePage';
    constructor(props) {
        super(props);
        this.state = {index : 0};
    }

    componentDidMount() {
        console.log(WelcomePage.pageName, 'componentDidMount');
    
    }

    render() {
        return (
            <Fragment>
                <Header />
                <BgImg>
                    <div className="header-group">
                        <h1>Pain is inevitable, <br /> Suffering is optional.</h1>
                        <p>《菜根谭》里有句话：世利纷华，不近者为洁，近之而不染者，为尤洁。</p>
                        <Search />
                    </div>
                    <Wave />
                </BgImg>
            </Fragment>
        )
    }
}

export default WelcomePage;