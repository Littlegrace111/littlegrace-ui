import React from "react";

// class Factory extends React.Component {
// 	constructor() {
// 		super(props);
// 		this.state = {
// 			/** state 即多个组件的公共逻辑的数据*/
// 		};
// 	}

// 	render() {
// 		return <div>{this.props.render(this.state)}</div>;
// 	}
// }

class Mouse extends React.Component {
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
				{/* 将当前state 作为props，传递给render */}
				{/* <Component {...this.props} mouse={this.state} /> */}
				{this.props.render(this.state)}
			</div>
		);
	}
}

const CatWithMouse2 = ({ name }) => (
	<div style={{ height: "500px" }}>
		<Mouse
			render={({ x, y }) => (
				<>
					<h1>
						The mouse position is ({x}, {y})
					</h1>
					<p>{name}</p>
				</>
			)}
		/>
	</div>
);

export default CatWithMouse2;
