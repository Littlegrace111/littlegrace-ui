import React, { lazy } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./registerServiceWorker";
import { inspectFPS } from "./animation/frameInspect";
import { supportWebp, setRem } from "./utility";

ReactDOM.render(<App />, document.getElementById("root"));
inspectFPS();
console.log("clientWidth =", document.documentElement.clientWidth);
console.log("scrollWidth =", document.documentElement.scrollWidth);
console.log("screen_width =", window.screen.width); //
// setRem(1920);
console.log("supportWebp =", supportWebp());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
