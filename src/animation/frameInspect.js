// 处理 requestAnimationFrame的浏览器兼容性问题
export const raf = () => {
    return (window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
            return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
        })
};

// 处理 cancelAnimationFrame的浏览器兼容性问题
export const cRaf = () => {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(id) {
            return window.clearTimeout(id);
        }
};

/**
 * 监测页面帧率
 * requestAnimationFrame 在浏览器每一帧刷新的时候会回调，理想情况下是16.67ms回调一次，因为浏览器刷新率在60FPS
 */
export const inspectFPS = () => {
    console.log('inspectFPS');
    let frame = 0;
    let allFrameCount = 0;
    let lastTime = (new Date()).getTime();
    let lastFrameTime = (new Date()).getTime();

    const loop = () => {
        console.log('loop');
        let now = (new Date()).getTime();
        let fs = (now - lastFrameTime);
        let fps = Math.round(1000 / fs); // 某一帧的帧率

        lastFrameTime = now;
        allFrameCount++;
        if(now > 1000 + lastTime) {
            fps = Math.round((frame * 1000) / (now - lastTime));
            console.log(`${new Date()} 1s 内FPS`, fps);
            frame = 0;
            lastTime = now;
        }
        raf(loop);
    }
    
    loop();
}