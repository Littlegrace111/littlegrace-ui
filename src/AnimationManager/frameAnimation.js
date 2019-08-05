class frameAnimation {
    constructor() {
        this.columns = 0; 
        this.row = 0;
        this.image = null;
        this.duration = 0;
        this.frameCount = 0;
        this.timer = null;
    }

    setFrameAnimation(img, frameWidth, frameHeight, frameCount, frameDuration) {
        const imageWidth = img.width,
            imageHeight = img.height;
        console.log(imageWidth + ' ' + imageHeight);

        this.columns = Math.floor(imageWidth / frameWidth);
        this.rows = Math.floor(imageHeight / frameHeight);

        const totalCount = this.columns * this.rows;
        if (totalCount < frameCount) {
            throw new RangeError("frame count is larger than the number of frames that can play.");
        } else {
            this.frameCount = frameCount;
        }
        
        // this.frameDuration = frameDuration * this.frameCount;

        console.log(this.columns + ' ' + this.rows);
        // console.log(this.frameDuration);
        // this.startAnimation();
    }

    startAnimation(step) {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout()
    }

}