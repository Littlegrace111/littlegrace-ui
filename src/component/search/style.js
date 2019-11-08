import styled from 'styled-components'

export const SearchWrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 0 20px;
`

export const SearchInputWrapper = styled.div`
    position: relative;
    width: 260px;
    margin: 0 auto;
    transition: width 0.2s ease-out;
    &.focused {
        width: 320px;
    }
`;

export const NavSearch = styled.input`
    width: 240px;
    height: 38px;
    padding: 0 30px 0 20px;
    box-sizing: border-box;
    border: none;
    outline: none;
    border-radius: 19px;
    margin-top: 9px;
    ${'' /* margin-left: 20px; */}
    background: #eee;
    font-size: 14px;
    color: #666;
    transition: width 0.2s ease-out;
    &::placeholder {
        color: #999;
    }
    &.focused {
        width: 300px;
    }
`;

export const IconFont = styled.div `
    position: absolute;
    right: 16px;
    top: 13px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    color: #999;
    z-index: 0;
    transition: all 0.2s ease-out;

    svg {
        position: absolute;
        top: 2px;
        left: 4px;
        line-height: 30px;
    }

    &.focused {
        background: #777;
    }
`

export const TipsWrapper = styled.div `
    position: absolute;
    left: 90px;
    ${'' /* margin-top: 9px; */}
    padding: 20px 20px 10px 20px;
    width: 250px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0,0,0, .2);
    border-radius: 4px;
    ${'' /* z-index: 101; */}

    &:before {
        content: "";
        width: 0px;
        height: 0px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
        position: absolute;
        top: -10px;
        left: 15px;
    }
`;

export const TipsTitle = styled.div `
    font-size: 14px;
    color: #969696;
    margin-bottom: 10px;
    text-align: left;

    a {
        position: relative;
        float: right;
        cursor: pointer;

        &:hover {
            color: #000;
        }

        .iconfont {
            position: absolute;
            width: 16px;
            height: 16px;
            display: inline;
            top: 3px;
            left: -16px;
            line-height: 1;
            transition: all .5s ease;
            margin-right: 2px;
        }
    }
`;

export const TipsList = styled.ul `
    text-align: left;
`;

export const TipItem = styled.li `
    display: inline-block;
    line-height: 28px;
    margin-right: 10px;
    
    a {
        padding: 2px 6px;
        font-size: 13px;
        color: #787878;
        border: 1px solid #ddd;
        border-radius: 3px;
        cursor: pointer;

        &:hover {
            color: #000;
        }
    }
`;