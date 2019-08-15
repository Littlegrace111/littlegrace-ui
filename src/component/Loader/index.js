import React from 'react'
import Ionicon from 'react-ionicons'

// 展示型组件无状态模板
const Loader = () => (
    <div className="text-center">
        <Ionicon
            icon="ios-refresh"
            fontSize="50px"
            color="#007bff"
            rotate={true}
        />
        <div>加载中</div>
    </div>
)

export default Loader;