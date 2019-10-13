import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import { throttle } from '../../utility'
// import MdArrowRoundBack from 'react-ionicons/lib/MdArrowRoundBack'
// import MdArrowRoundForward from 'react-ionicons/lib/MdArrowRoundForward'

const BannerWrapper = styled.div`
    position: relative;
    width: ${props => props.width + 'px'};
    height: ${props => props.height + 'px'};
    border-radius: 10px;
    overflow: hidden;
    margin: 0 auto;

    img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition-timing-function: ease;
        transition-property: left;
    }
`;

const BtnWrapper = styled.div`
    position: absolute;
    ${'' /* width: 50px;
    height: 50px; */}
    padding: 10px;
    top: 50%;
    margin-top: -20px;
    background: rgba(0, 0, 0, 0.4);

    &.left-btn {
        left: 0;
        border-radius: 0 5px 5px 0;
    }

    &.right-btn {
        right: 0;
        border-radius: 5px 0px 0px 5px;
    }
`;

const PointerWrapper = styled.div `
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: linear-gradient(360deg, rgba(0, 0, 0, 0.6), rgba(0,0,0,0));
    z-index: 10;
    text-align: center;

    .pointer {
        display: inline-block;
        border: solid 1px #fff;
        border-radius: 6px;
        margin: 0 5px;
        width: 6px;
        height: 6px;
        background: rgba(0, 0, 0, 0.4);

        &.current {
            background: rgba(255, 255, 255);
        }
    }
`

const LEFT_Dir = 0;
const RIGHT_Dir = 1;

class Banner extends Component {
    static propTypes = {
        imgList: PropTypes.array.isRequired,
        width: PropTypes.number,
        height: PropTypes.number
    }

    static defaultProps = {
        // imgList: [],
        width: 625,
        height: 270
    }

    constructor(props) {
        super(props)

        this.state = {
            before: this.nextStepStyle((0 - props.width), 0),
            middle: this.nextStepStyle(0, 0),
            after: this.nextStepStyle(props.width, 0),
            currentIndex: 0,
            step: 0
        }
        this.interval = null;
        this.timer = null;
        this.startTime = Number(new Date());
        this.throttled = throttle(this.setStep.bind(this), 1000);
        // this.throttled = throttle(this.setStep, 1000);
    }

    setStep(width) {
        this.step(width);
    }

    startBannerAnimation(direction, infinite) {
        const { width } = this.props;
        switch (direction) {
            case LEFT_Dir: 
                if (infinite) {
                    this.animationInfinite(0 - width); // -625
                } else {
                    this.step(0 - width);
                }
                return;
            case RIGHT_Dir: 
                if (infinite) {
                    this.animationInfinite(width); // 625
                } else {
                    this.step(width);
                }
                return;
            default: 
                return;
        }
    }

    // 向左 -625， 向右 625
    animationInfinite(width) {
        this.interval && clearInterval(this.interval)
        this.interval = setInterval(() => {
            //throttle(() => this.step(width), 1000);
            this.throttled(width);
        }, 5000)
    }

    step(width) { // -625  625
        console.log('step, width = ' + width);
        const { before, middle, after, currentIndex } = this.state;
        const { imgList } = this.props;
        let newIndex = 0;
        if (width < 0) {
            newIndex = currentIndex + 1 > imgList.length - 1 ? 0 : currentIndex + 1;
        } else {
            newIndex = currentIndex - 1 < 0 ? (imgList.length - 1) : currentIndex - 1;
        }
        this.setState({
            before: this.nextStepStyle(before.pos, width),
            middle: this.nextStepStyle(middle.pos, width),
            after: this.nextStepStyle(after.pos, width),
            currentIndex: newIndex,
            step: width
        })
    }

    stopBannerAnimation() {
        this.interval && clearInterval(this.interval);
        this.interval = null;

        this.timer && clearTimeout(this.timer);
        this.timer = null;
    }

    componentDidMount() {
        // this.startBannerAnimation(LEFT_Dir, true);
        if (this.props.imgList.length > 1) {
            this.startBannerAnimation(RIGHT_Dir, true);
        }
    }

    componentWillUnmount() {
        this.stopBannerAnimation();
    }

    nextStepStyle(currentPos, step) {
        if (step && currentPos === step)
            return {
                pos: 0 - step,
                duration: 0
            }
        else
            return {
                pos: currentPos + step,
                duration: 1
            }
    }

    showBanner(imgList) {
        if (imgList.length === 1) {
            return (
                <img
                    style={{ left: '0px' }}
                    src={imgList[0]}
                    alt=''
                />
            )
        } else if (imgList.length > 1) {
            const { before, middle, after, currentIndex } = this.state;
            return (
                <Fragment>
                    <img
                        id='before'
                        style={{
                            transitionDuration: before.duration + 's',
                            left: before.pos + 'px'
                        }}
                        src={this.getCardImg(imgList, before.pos, currentIndex)}
                        alt=''
                    />
                    <img
                        id='middle'
                        style={{
                            transitionDuration: middle.duration + 's',
                            left: middle.pos + 'px'
                        }}
                        src={this.getCardImg(imgList, middle.pos, currentIndex)}
                        alt=''
                    />
                    <img
                        id='after'
                        style={{
                            transitionDuration: after.duration + 's',
                            left: after.pos + 'px'
                        }}
                        src={this.getCardImg(imgList, after.pos, currentIndex)}
                        alt=''
                    />
                </Fragment>
            )
        } else
            return null;
    }

    getCardImg(imgList, pos, currentIndex) {
        const { width } = this.props;
        // after 625
        if (pos === width) {
            return (currentIndex + 1) >= imgList.length ? imgList[0] : imgList[currentIndex + 1];
        }
        // middle
        if (pos === 0) {
            return imgList[currentIndex];
        }
        // before -625
        if (pos === (0 - width)) {
            return (currentIndex - 1) < 0 ? imgList[imgList.length - 1] : imgList[currentIndex - 1]
        }
    }

    handleDirectionBtnClick(direction) {
        console.log('handleDirectionBtnClick, direction = ' + direction);
        const { width } = this.props;
        if (direction === LEFT_Dir) {
            // this.step(-625);
            // this.throttle(() => this.step(0 - width), 1000);
            // const throttled = throttle(() => this.step(0 - width), 1000);
            this.throttled(0 - width);
        } else if (direction === RIGHT_Dir) {
            // this.step(625);
            // throttle(() => this.step(width), 1000);
            this.throttled(width);
        }
    }

    showSwitchBannerBtn(imgList) {
        if (imgList.length > 1) {
            return (
                <Fragment>
                    <BtnWrapper
                        className='left-btn'
                        onClick={() => this.handleDirectionBtnClick(LEFT_Dir)}>
                        <Ionicon
                            icon="md-arrow-round-back"
                            fontSize="30px" 
                            color="#fff" />
                    </BtnWrapper>
                    <BtnWrapper
                        className='right-btn'
                        onClick={() => this.handleDirectionBtnClick(RIGHT_Dir)}>
                        <Ionicon 
                            icon="md-arrow-round-forward"
                            fontSize="30px" 
                            color="#fff" />
                    </BtnWrapper>
                </Fragment>
            )
        } else {
            return null;
        }
    }

    showPointer(imgList) {
        const { currentIndex } = this.state;
        if(imgList.length > 1) {
            return (
                <PointerWrapper>
                    {imgList.map((item, index) => (
                        <span key={item} 
                            className={'pointer ' + ((index === currentIndex) ? 'current' : '')}></span>
                    ))}
                </PointerWrapper>
            )
        }
    }

    render() {
        const imgList = this.props.imgList; // 使用PropType来限制输入格式
        return (
            <BannerWrapper
                width={this.props.width}
                height={this.props.height}>
                {this.showBanner(imgList)}
                {this.showSwitchBannerBtn(imgList)}
                {this.showPointer(imgList)}
            </BannerWrapper>
        )
    }
}

// propTypes 必须放在class定义的后面
// Banner.propTypes = {
//     imgList: PropTypes.array.isRequired,
//     width: PropTypes.number,
//     height: PropTypes.number
// };

// Banner.defaultProps = {
//     imgList: [],
//     width: 625,
//     height: 270
// };

export default Banner;