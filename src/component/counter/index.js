import React, { memo, useState, useMemo } from "react";

const Child0 = () => {
	console.log("Child0: ");
	const date = new Date();
	return <div>Child0: 当前时间: {date.getTime()}</div>;
};
// memo 也是一个高阶组件，可以包裹一个函数组件， 加了Memo进行包裹，防止子组件不必要的刷新
const ChildMemo = memo(() => {
	console.log("ChildMemo");
	const date = new Date();
	return <div>ChildMemo: 当前时间：{date.getTime()}</div>;
});

const ChildMemo1 = memo(
	() => {
		console.log("ChildMemo1");
		const date = new Date();
		return <div>ChildMemo1: 当前时间：{date.getTime()}</div>;
	},
	(prev, next) => {
		// 如果只进行shallow compare的话，是不需要使用memo的第二个参数，如果需要对传入的props做精细化控制的话，可以使用。
		// 此函数里可以对传入的props的行为做精细化控制, 相当于shouldComponentUpdate
		// console.log("ChildMemo1, shallow compare", prev, next);
		return prev.count === next.count;
	}
);

const Child1 = memo(({ count, click }) => {
	console.log("child1", count.clickCurrentTime);
	return (
		<>
			<div>Child1 子组件：{count.clickCurrentTime}</div>
			<button onClick={click}>click</button>
		</>
	);
});

const Parent = () => {
	const [count, setCount] = useState(0);
	const [clickCurrentTime, setClickCurrentTime] = useState(0);
	let timeOption = { clickCurrentTime }; // 这个对象永远是一个新的对象，如果不用useMemo来限制
	return (
		<div>
			<div>count: {count}</div>
			<button onClick={() => setCount(count + 1)}>click +1</button>
			<button onClick={() => setClickCurrentTime(clickCurrentTime + 1)}>
				get current time
			</button>
			<Child0 />
			{/* React.memo 等价于 class 组件的pureComponent */}
			<ChildMemo />
			<ChildMemo1 />
			{/* Child1 的count属性，每一次渲染，永远会返回一个新的对象，即使是在clickCurrrentTime不变的情况下 */}
			<Child1 count={{ clickCurrentTime, color: "red" }} />
			<Child1
				count={useMemo(() => ({ clickCurrentTime, color: "red" }), [
					clickCurrentTime,
				])}
			/>
		</div>
	);
};

export default Parent;
