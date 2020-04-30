import React, { memo, useState } from "react";

const Child0 = () => {
	const date = new Date();
	return <div>Child0: 当前时间: {date.getTime()}</div>;
};
// memo 也是一个高阶组件，可以包裹一个函数组件， 加了Memo进行包裹，防止子组件不必要的刷新
const Child1 = memo((props) => {
	console.log("Child1: ", props);
	const date = new Date();
	return <div>Child1: 当前时间：{date.getTime()}</div>;
});

const Child2 = memo(
	() => {
		const date = new Date();
		return <div>Child2: 当前时间：{date.getTime()}</div>;
	},
	(prev, next) => {
		// 如果只进行shallow compare的话，是不需要使用memo的第二个参数，如果需要对传入的props做精细化控制的话，可以使用。
		// 此函数里可以对传入的props的行为做精细化控制, 相当于shouldComponentUpdate
		console.log("Child2", prev, next);
		// return true;
	}
);

const Parent = () => {
	const [count, setCount] = useState(0);
	return (
		<div>
			<div>count: {count}</div>
			<button onClick={() => setCount(count + 1)}>click +1</button>
			<button onClick={() => setCount(count)}>click</button>
			{/* Child1 这个组件没有传入props  */}
			<Child0 />
			<Child1 count={count} />
			<Child2 count={count} />
		</div>
	);
};

export default Parent;
