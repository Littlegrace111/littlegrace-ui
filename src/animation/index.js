import ImageLoader from './imageLoader'

export { ImageLoader };

const imageLoader = (url) => {
    return new Promise((resovle, reject) => {
        console.log('imageLoader', url);
        const img = new Image();
        img.onload = () => {
            console.log(url, 'onload');
            if(img.width > 1 && img.height > 1) {
                resovle();
            } else {
                img.onerror();
            }
        }

        img.onerror = () => {
            reject(new Error('load img error'));
        }

        img.src = url;
    });
}

export const loadAllImages = (imageUrlList) => {
    console.log('loadAllImage');
    Promise.all(imageUrlList.map( url => {
        return imageLoader(url);
    })).then((...args) => {
        console.log('then', args);
    }).catch((...error) => {
        
    });
}