import React, { Component } from "react";

// 其他组件共享MouseTracker这个组件，拿到鼠标的坐标
class MouseTracker1 extends Component {
	constructor(props) {
		super(props);
		this.state = { x: 0, y: 0 };
	}

	handleMouseMove = (event) => {
		this.setState({ x: event.clientX, y: event.clientY });
	};

	render() {
		return (
			<div style={{ height: "100vh" }} onMouseMove={this.handleMouseMove}>
				<h1>移动鼠标！</h1>
				<p>
					当前鼠标位置是({this.state.x}, {this.state.y})
				</p>
			</div>
		);
	}
}

export default MouseTracker1;
