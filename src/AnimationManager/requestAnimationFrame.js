// 处理 requestAnimationFrame的浏览器兼容性问题
export const requestAnimationFrame = () => (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    ((callback) => {
        return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
    })
);

// 处理 cancelAnimationFrame的浏览器兼容性问题
export const cancelAnimationFrame = () => (
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozRequestAnimationFrame ||
    ((id) => {
        return window.clearTimeout(id);
    })
);