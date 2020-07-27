import React from "react";

const withMouse = (Component) => {
	class withMouseComponent extends React.Component {
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
			return (
				<div style={{ height: "500px" }} onMouseMove={this.handleMouseMove}>
					{/* 1. 透传高阶组件的props 2. 增加 mouse 属性 */}
					<Component {...this.props} mouse={this.state} />
				</div>
			);
		}
	}

	return withMouseComponent;
};

const Cat = (props) => {
	const { x, y } = props.mouse;
	return (
		<div style={{ height: "500px" }}>
			<h1>
				The mouse position is {x}, {y}
			</h1>
			<p>{props.name} !</p>
		</div>
	);
};

export default withMouse(Cat); // 这个函数会返回一个高阶组件
