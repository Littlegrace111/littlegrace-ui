export const httpRequest = (url, method='get', params = {}) => {
    //在此处对param进行进一步处理
    const opt = {
        url: url,
        type: method.toUpperCase(),
        data: params,
        success: function() {},
        error: function() {}
    }
    // opt = Object.assign(opt, options);
    if(!opt.url){
        throw new Error('url is empty');
    }
        
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = function() { // readystate === 4 true onload call
            if(xhr.status === 200 || xhr.status === 304) { // live stream resouce 206
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText);
            }
        }
        xhr.onerror = function() {
            reject();
        }
        xhr.timeout = function() {
            reject();
        }
    })
}

export const getCategories = (uuid) => {
    // 返回一个新的promise
    return httpRequest(`/getCategories?uuid=${uuid}`).then(JSON.parse);
}
