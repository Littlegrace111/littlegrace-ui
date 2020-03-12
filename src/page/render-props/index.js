import React from "react";

// Render props 模式：在props上挂载一个方法，这个方法必须返回一个react元素
class SharedComponent extends React.Component {
	state = {
		name: "grace"
	};

	render() {
		return <div>{this.props.render(this.state)}</div>;
	}
}

const SayHello = () => (
	// 在props上挂载一个方法，这个方法必须返回一个react元素
	<SharedComponent render={state => <span>hello!, {...state}</span>} />
);
