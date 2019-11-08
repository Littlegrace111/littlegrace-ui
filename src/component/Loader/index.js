import React from 'react';
import Ionicon from 'react-ionicons';
import styled from 'styled-components';

const LoaderStyle = styled.div `

`

// 展示型组件无状态模板
const Loader = () => (
    <div>
        <Ionicon
            icon="ios-refresh"
            fontSize="50px"
            color="#007bff"
            rotate={true}
        />
    </div>
)

export default Loader;