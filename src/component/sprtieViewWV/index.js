import React, { Fragment} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SpriteWrapper = styled.div `
    width: ${(props) => props.frameWidth};
    height: ${(props) => props.frameHeight};
    overflow: hidden;
`
const SpriteView = styled.div `
    width: ${(props) => props.frameWidth * props.frameCount};
    height: ${(props) => props.frameHeight};
    will-change: transform;
    background: url(${(props) => props.PicUrl}) no-repeat center;
    animation: frameAnimation 333ms steps(20) both infinite;

    @keyframes frameAnimation {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(${(props) => props.frameWidth * props.frameCount}, 0, 0); }
    }
`
// 展示型组件无状态模板
const Template = (props) => (
    <Fragment>
        <SpriteWrapper>
            <SpriteView></SpriteView>
        </SpriteWrapper>
    </Fragment>
)

export default Template;