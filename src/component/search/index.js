import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import * as Search from './style';
import axios from 'axios';
import Loader from '../loader';

class SearchBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            searchTipsMouseEnter: false,
            tabList: [], // 热门搜索
            pageIndex: 0,
            totalPage: 0,
            errorMsg: '',
            isLoading: false,
            searchHistory: [] // 搜索历史
        };
    }

    componentDidMount() {

    }

    async getSearchInfo(pageIndex){
        console.log('getSearchInfo, pageIndex =', pageIndex);
        try {
            let response = await axios.get(`/searchInfo?pageIndex=${pageIndex+1}`);
            console.log('getSearchInfo, response =', response);
            if(response.status === 200) {
                return response.data[0];
            } else {
                const errorInfo = {
                    code: response.status,
                    errorMsg: response.statusText
                }
                throw errorInfo;
            }
        } catch(err) {
            throw err;
        }
    }

    handleInputBlur = (event) => {
        this.setState({ focused: false });
    }

    handleInputFocus = (event) => {
        const { tabList, pageIndex } = this.state;
        this.setState({ focused: true });
        if(tabList.length === 0) {
            this.setState({ isLoading: true });
            this.getSearchInfo(pageIndex).then( result => {
                this.setState({
                    tabList: result.tabList,
                    totalPage: result.totalPage,
                    pageIndex: result.pageIndex - 1,
                    isLoading: false
                });
            }).catch(err => {
                console.log(err);
                if(err.errorMsg) {
                    this.setState({
                        errorMsg: err.errorMsg,
                        isLoading: false
                    })
                }
            })
        }
    }

    handleSearchTipsMouseEnter = (event) => {
        this.setState({
            searchTipsMouseEnter: true
        })
    }

    handleSearchTipsMouseLeave = (event) => {
        this.setState({
            searchTipsMouseEnter: false,
        })
    }

    changePageList = (spinCoin) => {
        // console.log('changePageList, spinCoin =', spinCoin);
        this.setState({
            focused: true
        });
        let originAngle = spinCoin.style.transform;
        if (originAngle) {
            originAngle = parseInt(originAngle.replace(/[^0-9]/ig, ''));
        } else {
            originAngle = 0;
        }
        spinCoin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
        const { pageIndex, totalPage } = this.state;
        let index = (pageIndex + 1)%totalPage;

        this.setState({ isLoading: true });
        this.getSearchInfo(index).then( result => {
            this.setState({
                tabList: result.tabList,
                totalPage: result.totalPage,
                pageIndex: result.pageIndex-1,
                isLoading: false
            });
        }).catch(err => {
            console.log(err);
            if(err.errorMsg) {
                this.setState({
                    errorMsg: err.errorMsg,
                    isLoading: false
                })
            }
        })
    }

    render() {
        return (
            <Search.SearchWrapper>
                <Search.SearchInputWrapper className={this.state.focused ? 'focused' : ''}>
                    <Search.NavSearch
                        placeholder='搜索'
                        className={this.state.focused ? 'focused' : ''}
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputBlur}>
                    </Search.NavSearch>
                    <Search.IconFont className={this.state.focused ? 'focused' : ''}>
                        <Ionicon
                            icon="md-search"
                            fontSize="26px" 
                            color={this.state.focused ? '#fff' : '#999'} />
                    </Search.IconFont>
                </Search.SearchInputWrapper>
                {this.getSearchTipsInfo()}
            </Search.SearchWrapper>
        )
    }

    // input框被focused 或者 鼠标悬浮在面板上 显示
    // focused为true的时候，热门banner显示；
    // 鼠标在热门banner上的时候，banner不消失；
    getSearchTipsInfo() {
        const { focused, searchTipsMouseEnter, tabList, isLoading } = this.state;
        if(focused || searchTipsMouseEnter) {
            return (
                <Search.TipsWrapper
                    onMouseEnter={this.handleSearchTipsMouseEnter}
                    onMouseLeave={this.handleSearchTipsMouseLeave} >
                    <Search.TipsTitle>
                        <span>热门搜索</span>
                        <a onClick={() => this.changePageList(this.spinCoin)}>
                            {/* <Ionicon 
                                className="iconfont"
                                icon="md-refresh"
                                fontSize="16px" 
                                color="#999" 
                                ref={this.spinCoinRef} /> */}
                            <img src={require('../../assets/images/spin.png')} 
                                className="iconfont"
                                ref={(icon) => { this.spinCoin = icon; }} />
                            换一批
                        </a>
                    </Search.TipsTitle>
                    {isLoading && <Loader />}
                    <Search.TipsList>
                        {tabList.map((item, index) => {
                            return (<Search.TipItem key={index}><a>{item}</a></Search.TipItem>);
                        })}
                    </Search.TipsList>
                </Search.TipsWrapper>
            );
        } else {
            return null;
        }
    }
}

export default SearchBanner;