import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import asyncComponent from './asyncComponent';
// import HomePage from '../page/home';
// import CreatePage from '../page/create';
// import AnimationPage from '../page/animation';
import WelcomePage from '../page/welcome';

const AsyncHomePage = asyncComponent(() => import('../page/home'));
const AsyncCreatePage = asyncComponent(() => import('../page/create'));
const AsyncAnimationPage = asyncComponent(() => import('../page/animation'));

export default ({ childProps }) => (
    <BrowserRouter>
        <Route path='/' exact component={WelcomePage} ></Route>
        <Route path='/zhangben' component={AsyncHomePage} ></Route>
        <Route path='/create' component={AsyncCreatePage} ></Route>
        <Route path='/edit/:id' component={AsyncCreatePage} ></Route>
        <Route path='/animation' component={AsyncAnimationPage} ></Route>
	</BrowserRouter>
);