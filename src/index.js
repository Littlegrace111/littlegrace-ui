import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ImageLoader from './AnimationManager/imageLoader'

// const imageArray = [
//     'https://img.alicdn.com/tfs/TB1FJY9b7T2gK0jSZPcXXcKkpXa-1465-309.png',
//     'https://img.alicdn.com/tfs/TB1p0H7b.H1gK0jSZSyXXXtlpXa-1465-168.png',
//     'https://img.alicdn.com/tfs/TB1l0r7b.H1gK0jSZSyXXXtlpXa-1465-822.png',
//     'https://img.alicdn.com/tfs/TB1FPj8bYr1gK0jSZR0XXbP8XXa-1465-383.png',
//     // 'https://img.alicdn.com/tfs/TB1FPSZR0XXbP8XXa-1465-383.png'
// ]

// new ImageLoader().loadImage(imageArray, (result, data) => {
//     console.log('loadImage', result, data);
//     // console.log(result);
//     // console.log(data);
// });



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
