import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ImageLoader } from '../../AnimationManager'
import { AnimationStatusEnumType } from '../../AnimationManager/constants'

const Logo = styled.div`
    width: ${(props) => props.width + 'px'};
    height: ${(props) => props.height + 'px'};
    background: url(${(props) => props.imgPic});
    margin: 0 auto;

    &.sprite-animation {
        animation: star 1000ms steps(6, end) 0ms infinite normal;
    }

    @keyframes star {
        from {background-position: 0;}
        to {background-position: -831px;}
    }
`

export default class SpriteAnimation extends Component {
    static propTypes = {
        frameWidth: PropTypes.number.isRequired,
        frameHeight: PropTypes.number.isRequired,
        // frameCount: PropTypes.number.isRequired,
        frameImgList: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            xPos: 0,
            yPos: 0,
            currentImage: ''
        }

        this.frameHeight = props.frameHeight;
        this.frameWidth = props.frameWidth;
        this.frameDuration = props.frameDuration;// 每一帧持续的时间

        this.animationHandler = 0;
        this.animationQueue = [];
        this.animationIndex = 0;
        this.animationState = AnimationStatusEnumType.STATE_UNINITED;
        this.imageLoader = new ImageLoader();

        this.initSpriteAnimation();
    }

    initSpriteAnimation() {
        const { frameImgList } = this.props;
        if(!frameImgList || frameImgList.length === 0) {
            throw new RangeError('frameImgList is empty');
        }
        this.imageLoader.loadImage(frameImgList, (result, data) => {
            console.log('loadImage: ' + result);
            if (result) {
                this.handleImageData(data);
            } else {
                // 图片预加载不成功做降级处理，贴本地图片
            }
            // console.log(data);
            this.startAnimation();
        })
    }

    handleImageData(imageList) {
        imageList.forEach((item) => {
            const imageWidth = item.img.width,
                imageHeight = item.img.height;
            const columns = Math.floor(imageWidth / this.frameWidth);
            const rows = Math.floor(imageHeight / this.frameHeight);
            item.columns = columns;
            item.rows = rows;
            item.frameCount = columns * rows;
            item.frameDuration = this.frameDuration;
            this.animationQueue.push(item);
        });
    }

    startAnimation() {
        this.animationState = AnimationStatusEnumType.STATE_INITED;
        this.changeImage(this.animationQueue[this.animationIndex]);
        this.playAnimation();
    }

    playAnimation() {
        console.log('playAnimation')
        this.animationState = AnimationStatusEnumType.STATE_STARTED;
        let startTime = +new Date();
        const me = this;
        step();
        function step() {
            // console.log('step');
            const currentTime = +new Date();
            me.animationHandler = window.requestAnimationFrame(step);
            if (currentTime - startTime >= me.frameDuration) {
                me.changePosition(); // 每一帧的操作
                startTime = currentTime;
            }
        }
    }

    stopAnimation() {
        this.animationState = AnimationStatusEnumType.STATE_PAUSED;
        window.cancelAnimationFrame(this.animationHandler);
    }

    componentDidMount() {
        console.log('componentDidMount');
        // this.startAnimation();
    }

    componentWillUnmount() {
        this.destroy();
    }

    destroy() {
        if(this.animationState === AnimationStatusEnumType.STATE_STARTED) {
            this.stopAnimation();
        }
        this.animationHandler = 0;
        this.animationQueue = null;
        this.animationIndex = 0;
        this.animationState = AnimationStatusEnumType.STATE_UNINITED;
    }

    changeImage(animationItem) {
        this.setState({ currentImage: animationItem.src });
    }

    changePosition() {
        // console.log('changePosition');
        const { columns, rows } = this.animationQueue[this.animationIndex];
        const { xPos, yPos } = this.state;

        if (yPos < (columns - 1)) {
            this.setState({
                xPos: xPos,
                yPos: yPos + 1,
            })
        } else if (xPos < (rows - 1)) {
            this.setState({
                xPos: xPos + 1,
                yPos: yPos
            })
        } else { // 进入下一组动画
            if (this.animationIndex + 1 >= this.animationQueue.length) {
                this.animationIndex = 0;
            } else {
                this.animationIndex++;
            }
            this.changeImage(this.animationQueue[this.animationIndex]);
            this.setState({
                xPos: 0,
                yPos: 0
            })
        }
    }

    // 这种形式写法：在初始化时就bind(this)了，等同于在构造函数里bind this
    handleSpriteViewClick = (event) => {
        // console.log(this);
        // console.log('handleSpriteViewClick', this.animationState);
        if(this.animationState === AnimationStatusEnumType.STATE_STARTED) {
            this.stopAnimation();
        } else if(this.animationState === AnimationStatusEnumType.STATE_PAUSED) {
            this.playAnimation();
        }
    }

    render() {
        const { xPos, yPos, currentImage } = this.state;
        const { frameWidth, frameHeight } = this.props;

        return (
            <Logo
                className='haha cccc'
                width={frameWidth}
                height={frameHeight}
                imgPic={currentImage}
                style={{ backgroundPosition: (-1 * yPos * frameWidth) + 'px ' + (-1 * xPos * frameHeight) + 'px' }}
                onClick={this.handleSpriteViewClick}
            />
        )
    }
}

