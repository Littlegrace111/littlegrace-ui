/**
 * 并行加载多张图片，直到全部加载完，收到回调函数
 * @param {array} imageUrlList 
 */
export const loadImageAll = (imageUrlList = []) => {
    if(imageUrlList.length === 0) {
        throw new Error('img url list is empty');
    }
    return Promise.all(imageUrlList.map( (url) => {
        return new Promise((resovle, reject) => {
            const img = new Image();
            img.onload = () => {
                console.log('onload: ' + img.width + ', ' + img.height);
                if(img.width > 1 && img.height > 1) {
                    resovle(img);
                } else {
                    img.onerror('img is invalid');
                }
            }
            img.onerror = (err) => {
                console.log('img error', err);
                reject(new Error(err));
            }
            img.src = url;
        })
    })) 
}

/**
 * 并行加载多张图片，只要有一张加载出来，收到回调
 * @param {array} imageUrlList 
 */
export const loadImageRace = (imageUrlList = []) => {
    if(imageUrlList.length === 0) {
        throw new Error('img url list is empty');
    }
    return Promise.Race(imageUrlList.map( (url) => {
        return new Promise((resovle, reject) => {
            const img = new Image();
            img.onload = () => {
                console.log('onload: ' + img.width + ', ' + img.height);
                if(img.width > 1 && img.height > 1) {
                    resovle(img);
                } else {
                    img.onerror('img is invalid');
                }
            }
            img.onerror = (err) => {
                console.log('img error', err);
                reject(new Error(err));
            }
            img.src = url;
        })
    })) 
}