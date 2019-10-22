import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { throttle } from '../../utility'

const BackToTopBtn = styled.div`
    position: fixed;
    right: 30px;
    bottom: 30px;
    width: 50px;
    height: 50px;
    ${'' /* border: solid 2px #dcdcdc; */}
    border-radius: 25px;
    background: blue;
    padding: 20px 0;
    box-sizing: border-box;
`

class ScrollToTop extends Component {
    constructor(props) {
        super(props)
        this.state = { show: false}
        this.handleScroll = this.handleScroll.bind(this);
    }
 
    componentDidMount() {
        // window.addEventListener('scroll', this.handleScroll); 
        // 对scroll事件做节流，会导致位置算得不准？？？要采用trailing = true的模式
        window.addEventListener('scroll', throttle(this.handleScroll, 200, true)); // 对scroll事件做节流
    }

    handleScroll() {
        console.log('handleScroll');
        const scrollHeight = document.documentElement.scrollHeight;
        const offsetY = scrollHeight - window.innerHeight - 20;
        console.log('window.innerHeight =', window.innerHeight);
        console.log('window.scrollY =', window.scrollY);
        console.log('scrollHeight =', scrollHeight);
        console.log('offsetY =', offsetY);
        
        if(window.scrollY >= offsetY) {
            this.setState({show: true});
        } else {
            this.setState({show:false});
        }
    }

    render() {
        const { show } = this.state;
        if(show) {
            return (
                <BackToTopBtn>
    
                </BackToTopBtn>
            )
        } else {
            return null;
        }
        
    }
}

export default ScrollToTop;