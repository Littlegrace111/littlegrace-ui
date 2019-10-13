import { ImageStatusEnumType } from './constants'

class ImageLoader {
    constructor() {
        this.count = 0;
        this.imageList = [];
        this.success = true;
        this.imageMaxLength = 30; // 预加载图片池，最多保存30张图片
    }

    /**
    * 图片预加载
    * @param {array} imageList 图片url地址的数组或者对象
    * @param {function} callback 图片预加载结果的回调函数
    * @param {timestamp} timeout 超时时间
    */
    loadImage(images, callback) {
        images.map((item, index) => {
            // console.log(item, index);
            item = {src: item}
            item.img = new Image()
            item.id = index
            this.imageList.push(item)
            this.doImgLoad(item, callback);
            return this.imageList;
        })
    }

    doImgLoad(item, callback) {
        console.log('doImgLoad');
        this.count++;
        const { img } = item;
        item.status = ImageStatusEnumType.IMG_LOADING;
        img.onload = () => {
            console.log('onload: ' + item.id +', ' + img.width + ', ' + img.height);
            if(img.width > 1 && img.height > 1) {
                this.success = this.success && true; // 只要有一张图片加载失败，则整个图片list加载失败
                item.status = ImageStatusEnumType.IMG_LOADED;
                this.imgLoadDone(img, callback);
            } else {
                img.onerror();
            }
        }
        
        img.onerror = () => {
            console.log('onerror: ' + item.id);
            this.success = false;
            item.status = ImageStatusEnumType.IMG_ERROR;
            this.imgLoadDone(img, callback);
        }
        img.src = item.src;
    }

    imgLoadDone(img, callback) {
        console.log('imgLoadDone');
        img.onload = img.onerror = null;
        this.count--;
        if (!this.count) { // 所有图片加载完成，则回调
            callback && callback(this.success, this.imageList);
        }
    }
}

export default ImageLoader;