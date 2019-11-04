import React, { Component, Fragment } from 'react';
import Ionicon from 'react-ionicons';
import * as Search from './style'

class SearchBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            searchTipsMouseEnter: false,
        }
    }

    handleInputBlur = (event) => {
        console.log('handleInputBlur');
        this.setState({ focused: false });
    }

    handleInputFocus = (event) => {
        console.log('handleInputFocus');
        this.setState({ focused: true });
    }

    handleSearchTipsMouseEnter = (event) => {
        console.log('handleSearchTipsMouseEnter');
        this.setState({
            searchTipsMouseEnter: true
        })
    }

    handleSearchTipsMouseLeave = (event) => {
        console.log('handleSearchTipsMouseLeave');
        this.setState({
            searchTipsMouseEnter: false,
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
                {this.props.tabList.length > 0 && this.getSearchTipsInfo(this.state.focused, this.props.tabList)}
            </Search.SearchWrapper>
        )
    }

    getSearchTipsInfo(focused, pageList) {
        // console.log('getSearchTipsInfo, pageList =', pageList);
        // const pageList = [
        //     "我的",
        //     "精选",
        //     "标签",
        //     "标签",
        //     "标签",
        //     "标签",
        //     "标签",
        //     "标签",
        //     "标签",
        //     "标签"
        // ];
        // focused为true的时候，热门banner显示；
        // 鼠标在热门banner上的时候，banner不消失；
        if(focused || this.state.searchTipsMouseEnter) {
            return (
                <Search.TipsWrapper
                    onMouseEnter={this.handleSearchTipsMouseEnter}
                    onMouseLeave={this.handleSearchTipsMouseLeave} >
                    <Search.TipsTitle>
                        <span>热门搜索</span>
                        <a>
                            <Ionicon 
                                className="iconfont"
                                icon="md-refresh"
                                fontSize="16px" 
                                color="#999" />
                            换一批
                        </a>
                    </Search.TipsTitle>
                    <Search.TipsList>
                        {pageList.map((item, index) => {
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