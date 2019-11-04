import React, { Component, Fragment } from 'react';
import Ionicon from 'react-ionicons';
import * as Search from './style'

class SearchBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false
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
                            color={this.state.focused ? '#fff' : '#999'}/>
                    </Search.IconFont>
                </Search.SearchInputWrapper>
            </Search.SearchWrapper>
        )
    }
}

export default SearchBanner;