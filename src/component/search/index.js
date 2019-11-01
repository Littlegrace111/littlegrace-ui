import React, { Component, Fragment } from 'react';
import * as Search from './style'

class SearchBanner extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Search.SearchWrapper>
                <Search.SearchInputWrapper>
                    <Search.NavSearch
                        placeholder='搜索'
                        className='focused'>
                    </Search.NavSearch>
                </Search.SearchInputWrapper>
                {/* {this.getSearchTipsInfo(props.focused)} */}
            </Search.SearchWrapper>
        )
    }
}

export default SearchBanner;