import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Header from '../../component/header'
import Wave from '../../animation/wave'

const BgImg = styled.div `
    position: relative;
    width: 100%;
    height: 900px;
    background: url(https://img.alicdn.com/tfs/TB1XpR6bVT7gK0jSZFpXXaTkpXa-1280-720.png);
    background-size: cover;
    background-position: center;

    svg {
        position: absolute;
        left: 0px;
        bottom: -50px;
    }
`;


// 展示型组件有状态模板
class WelcomePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <Header />
                <BgImg>
                    {/* <img src='https://img.alicdn.com/tfs/TB1XpR6bVT7gK0jSZFpXXaTkpXa-1280-720.png'/> */}
                    <Wave />
                </BgImg>
            </Fragment>
        )
    }
}

export default WelcomePage;