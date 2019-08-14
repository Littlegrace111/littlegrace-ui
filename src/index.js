import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
// import axios from 'axios'

// axios.get('/items').then((response) => {
//     console.log(response)
// })

// const newItem = {
//     "title": "buy stuff for room",
//     "price": 100,
//     "date": "2018-08-15",
//     "id": "_kly1333",
//     "cid": "1",
//     "timestamp": 1534291200000
// }

// axios.post('/items', newItem).then((response) => {
//     console.log(response)
// }).catch((e) => {
//     console.log(e)
// })

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
