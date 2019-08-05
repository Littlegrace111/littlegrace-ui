import { ImageLoader } from './imageLoader'
import { AnimationStatusEnumType } from '../../AnimationManager/constants'


class Animation {
    constructor() {
        this.animationHandler = 0;
        this.animationQueue = [];
        this.animationIndex = 0;
        this.animationState = AnimationStatusEnumType.STATE_UNINITED;
        this.imageLoader = new ImageLoader();
    }

    initAniamtion(frameParam, callback) {
        this.frameWidth = frameParam.frameWidth;
        this.frameHeight = frameParam.frameHeight;
        this.frameInterval = frameParam.frameInterval;
        // this.animationQueue = frameParam.frameImgList;

        this.imageLoader.loadImage(frameParam.frameImgList, (result, data) => {
            console.log('loadImage: ', result);
            if (result) {
                this.handleImageData(data);
                callback && callback(true);
            } else {
                callback && callback(false);
            }
        })
    }

    handleImageData(imageList) {
        imageList.forEach((item) => {
            const imageWidth = item.img.width,
                imageHeight = item.img.height;
            const columns = Math.floor(imageWidth / this.frameWidth);
            const rows = Math.floor(imageHeight / this.frameHeight);
            item.columns = columns;
            item.rows = rows;
            item.frameCount = columns * rows;
            item.frameDuration = this.frameDuration;
            this.animationQueue.push(item);
        });
    }

    startAnimation() {

    }

    changeImage(src, callback) {
        
    }

    enterFrame() {

    }

    playAnimation() {

    }

    stopAnimation() {

    }

    destroy() {

    }

}

export default Animation;