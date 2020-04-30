/**
 * 月份选择组件需求分析
 * 1. 按钮展示当前选择的年和月
 * 2. 点击按钮弹出下拉框，再次点击收回下拉框
 * 3. 可以接收年份和月份输入，抛出已选择好的年份月份
 * 4.
 * <MonthPicker
 *      year={2018}
 *      month={8}
 *      onChange={onChange} />
 *
 * 5. 第二个版本，改造成react hooks的版本
 */

import React, { useState, useEffect, useRef } from "react";
import { padLeft, rangeArr, generateYearArr } from "../../utility";
import PropTypes from "prop-types";

// hooks 是一些可以放你在函数组件里钩入React state及生命周期等特性的函数。
// hooks 不能在class组件中使用
const MonthPicker = ({ year, month, onChange }) => {
	const [toggle, setToggle] = useState(false);
	const [selectedYear, setSelectedYear] = useState(year);
	const [count, setCount] = useState(0);
	const countRef = useRef(null);
	let domRef = useRef(null);

	const toggleDropDown = (event) => {
		event.preventDefault();
		setToggle(!toggle);
	};

	const isItemActive = (selected, target) => {
		if (selected === target) {
			return "dropdown-item active";
		} else return "dropdown-item";
	};

	const onYearSelectChange = (event, selected) => {
		event.preventDefault();
		setSelectedYear(selected);
	};

	const onMonthSelectChange = (event, selected) => {
		event.preventDefault();
		onChange && onChange(selectedYear, selected); // 这是为什么不能用selectedMonth
		setToggle(!toggle);
	};

	// useEffect(() => {
	// 	countRef.current = count;
	// }, [count]);

	// useEffect(() => {
	// 	const Timer = setInterval(() => {
	// 		console.log(count, countRef.current);
	// 		setCount(countRef.current + 1);
	// 	}, 3000);

	// 	return () => {
	// 		clearInterval(Timer);
	// 	};
	// }, []);

	// 副作用：数据异步获取，订阅，或者手动修改过DOM;
	// useEffect: 跟class组件中的componentDidMount componentDidUpdate, componentWillUnmount这三个函数具有相同的功能，不过被合并成一个api了。
	// useEffect：默认情况下，React会在每次渲染后调用副作用函数，包括第一次渲染的时候。相当于 componentDidMount 和 componentDidUpdate。
	// useEffect 不能在条件语句里面调用 if/else
	useEffect(() => {
		const handleClick = (event) => {
			// console.log("handleClick event: ", event.target);
			// console.log("domRef: ", domRef);
			if (domRef && domRef.current.contains(event.target)) return;

			setToggle(false);
		};
		document.addEventListener("click", handleClick, false);

		return () => {
			document.removeEventListener("click", handleClick, false); // 对副作用进行清理，可能会造成内存泄漏
		};
	}, []); // useEffect后面可以跟一个optional的参数，如果是一个空数组，则只在componentDidMount的时候回调一次，传入useState里监听的值，可以在值每次变化的时候就回调。

	// 函数组件内部可以使用ref属性，只要它指向一个Dom元素或class组件
	return (
		<div className="dropdown" ref={domRef}>
			<h4>选择月份</h4>
			<button
				className="btn btn-secondary dropdown-toggle"
				type="button"
				onClick={toggleDropDown}
			>
				{`${selectedYear}年 ${padLeft(month)}月`}
			</button>
			{toggle && (
				<div className="dropdown-menu px-3" style={{ display: "block" }}>
					<div className="row flex-nowrap">
						<div className="col border-right years-range">
							{generateYearArr().map((yearNumber) => {
								return (
									<a
										className={isItemActive(selectedYear, yearNumber)}
										href="#/"
										key={yearNumber}
										onClick={(event) => {
											onYearSelectChange(event, yearNumber);
										}}
									>
										{`${yearNumber}年`}
									</a>
								);
							})}
						</div>
						<div className="col months-range">
							{rangeArr(0, 1, 12).map((monthNumber) => {
								return (
									<a
										className={isItemActive(month, monthNumber)}
										href="#/"
										key={monthNumber}
										onClick={(event) => {
											onMonthSelectChange(event, monthNumber);
										}}
									>
										{`${padLeft(monthNumber)}月`}
									</a>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

MonthPicker.propTypes = {
	year: PropTypes.number.isRequired,
	month: PropTypes.number.isRequired,
	onChange: PropTypes.func,
};

MonthPicker.defaultProps = {
	year: 2018,
	month: 1,
};

export default MonthPicker;
