import React, { Component } from "react";
import MouseTracker1 from "./MouseTracker1";

// export default MouseTracker1;

const defaultIconPic =
	"data:image/png;base64,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";

class Cat extends Component {
	render() {
		const { mouse } = this.props;
		return (
			<img
				src={defaultIconPic}
				style={{ position: "absolute", left: mouse.x, top: mouse.y }}
			/>
		);
	}
}

class Mouse extends Component {
	constructor(props) {
		super(props);
		this.state = { x: 0, y: 0 };
	}

	handleMouseMove = (event) => {
		this.setState({
			x: event.clientX,
			y: event.clientY,
		});
	};

	render() {
		const { render, children } = this.props;
		// console.log("this.props =", this.props);
		return (
			<div style={{ height: "100vh" }} onMouseMove={this.handleMouseMove}>
				{/* 这里可以动态渲染任何组件 */}
				{children && children(this.state)}
				{/* {render && render(this.state)} */}
			</div>
		);
	}
}

class MouseTracker extends Component {
	render() {
		return (
			<div>
				<h1>移动鼠标！</h1>
				{/* <Mouse render={(mouse) => <Cat mouse={mouse} />} /> */}
				<Mouse>{(mouse) => <Cat mouse={mouse} />}</Mouse>
				<Mouse>
					{(mouse) => (
						<p>
							当前鼠标位置是({mouse.x}, {mouse.y})
						</p>
					)}
				</Mouse>
			</div>
		);
	}
}

export default MouseTracker;
