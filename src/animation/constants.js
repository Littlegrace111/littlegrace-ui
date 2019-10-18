const ImageStatusEnumType = {
    IMG_LOADING: 'loading',
    IMG_LOADED: 'loaded',
    IMG_ERROR: 'error'
}

const AnimationStatusEnumType = {
    STATE_UNINITED: 0, // 未初始化
    STATE_INITED: 3, // 初始化：图片预加载完成，节点图片设置完成
    STATE_STARTED: 1, // 开始播放动画
    STATE_PAUSED: 2
}

export { ImageStatusEnumType, AnimationStatusEnumType };