import React, { Component, Fragment} from 'react'
import styled from 'styled-components'
import { throttle } from '../../utility'

const HeaderWrapper = styled.div `
    ${'' /* position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    padding: 50px 30px;
    z-index: 100;
    background: rgb(0,0,0, 1.0);
    color: white;
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); */}

    &.header-wrapper {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        padding: 50px 30px;
        z-index: 100;
        background: linear-gradient(rgba(0,0,0,1.0), rgba(0,0,0, 0));
        color: white;
        transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    &.header-scrolled {
        background: rgba(0,0,0, 0.7);
        padding: 15px 30px;
        ${'' /* backdrop-filter 在safari上实现毛玻璃的效果 */}
        backdrop-filter: blur(20px); 
    }

    .header-group {
        display: flex;
        max-width: 90%;
        margin: 0 auto;
        justify-content: space-between;
        align-items: center;
    }

    @media (max-width: 960px) {
        &.header-wrapper {
            padding: 15px 30px;
        }
    }

    @media (max-width: 640px) {
        .header-title {
            display: none;
        }
    }
`;

const HeaderItem = styled.a `
    font-weight: 700;
    ${'' /* background: black; */}

    img {
        width: 30px;
    }

    span {
        margin: 0px 5px;
    }

    button {
        padding: 8px 20px;
        font-size: 20px;
        background: #56CCF2;
        border: none;
        font-weight: 700;
        outline: none;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);

        &:hover {
            background: white;
            box-shadow: 0 10px 20px rgba(0,0,0, 0.25);
            transform: translateY(-3px);
        }
    }
`;

// 展示型组件有状态模板
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scrolled: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', throttle(this.handleScroll, 200, true));
    }

    // 在函数定义时bind(this)
    handleScroll = (event) => {
        console.log('handleScroll on header, pageYOffset =', window.pageYOffset);
        if(window.pageYOffset >= 50) {
            this.setState({ scrolled: true });
        } else {
            this.setState({ scrolled: false });
        }
    }

    render() {
        return (
            <HeaderWrapper className={this.state.scrolled ? 'header-wrapper header-scrolled' : 'header-wrapper'}>
                <div className="header-group">
                    <HeaderItem href='/'>
                        <img src={require('../../assets/images/logo-black.svg')}/>
                        <span className="header-title">Home</span>
                    </HeaderItem>
                    <HeaderItem href='/zhangben'>
                        <img src={require('../../assets/images/logo-framer.png')}/>
                        <span className="header-title">MoneyList</span>
                    </HeaderItem>
                    <HeaderItem href='/animation'>
                        <img src={require('../../assets/images/logo-react.png')}/>
                        <span className="header-title">Animation</span>
                    </HeaderItem>
                    <HeaderItem>
                        <img src={require('../../assets/images/logo-sketch.png')}/>
                        <span className="header-title">Courses</span>
                    </HeaderItem>
                    <HeaderItem>
                        <button>buy</button>
                    </HeaderItem>
                </div>
            </HeaderWrapper>
        )
    }
}

export default Header;