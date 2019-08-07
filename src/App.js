import React, { Component, Fragment } from 'react'
import Banner from './component/gallery'
import SpriteAnimationView from './component/spriteView'
import ListView from './component/listview'
import { listData } from './component/listview//mockData'
import TabView from './component/tabview'
import MonthPicker from './component/monthSelectView'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
	addBannerComponent() {
		const imgList = [
			'https://img.alicdn.com/tfs/TB1XpR6bVT7gK0jSZFpXXaTkpXa-1280-720.png',
			'https://img.alicdn.com/tfs/TB1f3x.b7L0gK0jSZFAXXcA9pXa-2560-1440.png',
			'https://img.alicdn.com/tfs/TB1ZeSibW61gK0jSZFlXXXDKFXa-4096-2304.jpg',
		];

		return (
			<Fragment>
				<div className="title">画廊组件</div>
				<Banner
					width={800}
					height={500}
					imgList={imgList}
				/>
			</Fragment>
		)
	}

	addXiaoYunComponent() {
		const imageArray = [
			'https://img.alicdn.com/tfs/TB1FJY9b7T2gK0jSZPcXXcKkpXa-1465-309.png',//asr
			'https://img.alicdn.com/tfs/TB1p0H7b.H1gK0jSZSyXXXtlpXa-1465-168.png',//thinking
			'https://img.alicdn.com/tfs/TB1l0r7b.H1gK0jSZSyXXXtlpXa-1465-822.png',//start
			'https://img.alicdn.com/tfs/TB1FPj8bYr1gK0jSZR0XXbP8XXa-1465-383.png',//tts
		];

		return (
			<Fragment>
				<div>Web动画</div>
				<SpriteAnimationView
					frameWidth={72}
					frameHeight={72}
					frameDuration={30}
					frameImgList={imageArray}
				/>
				{/* <button>暂停</button>
				<button>播放</button> */}
			</Fragment>
		)
	}

	addXiaoYunAsisAnimComponent() {
		const thinkImg = ['https://img.alicdn.com/tfs/TB1p0H7b.H1gK0jSZSyXXXtlpXa-1465-168.png'];
		const ttsImg = ['https://img.alicdn.com/tfs/TB1FPj8bYr1gK0jSZR0XXbP8XXa-1465-383.png'];
		const asrImg = ['https://img.alicdn.com/tfs/TB1FJY9b7T2gK0jSZPcXXcKkpXa-1465-309.png'];
		const startImg = ['https://img.alicdn.com/tfs/TB1l0r7b.H1gK0jSZSyXXXtlpXa-1465-822.png'];
		const style = {
			display: 'flex',
			margin: '0 auto'
		}
		const itemStyle = {
			margin: '20px'
		}
		return (
			<div style={style}>
				<div style={itemStyle}>
					<div>小云开始动画</div>
					<SpriteAnimationView
						frameWidth={72}
						frameHeight={72}
						frameDuration={30}
						frameImgList={startImg}
					/>
				</div>
				<div style={itemStyle}>
					<div>小云思考动画</div>
					<SpriteAnimationView
						frameWidth={72}
						frameHeight={72}
						frameDuration={30}
						frameImgList={thinkImg}
					/>
				</div>
				<div style={itemStyle}>
					<div>小云ASR动画</div>
					<SpriteAnimationView
						frameWidth={72}
						frameHeight={72}
						frameDuration={30}
						frameImgList={asrImg}
					/>
				</div>
				<div style={itemStyle}>
					<div>小云TTS动画</div>
					<SpriteAnimationView
						frameWidth={72}
						frameHeight={72}
						frameDuration={30}
						frameImgList={ttsImg}
					/>
				</div>
			</div>
		)
	}

	addXiaoKuBaoAnimComponent() {
		const imageArray = [
			'https://img.alicdn.com/tfs/TB1uzExbO_1gK0jSZFqXXcpaXXa-969-160.png'
		]
		return (
			<Fragment>
				<div>Web动画</div>
				<SpriteAnimationView
					frameWidth={138}
					frameHeight={160}
					frameDuration={100}
					frameImgList={imageArray}
				/>
				{/* <button>暂停</button>
				<button>播放</button> */}
			</Fragment>
		)
	}

	onTabChange = (currentTabName) => {
		console.log(currentTabName);
	}

	render() {
		return (
			<div className="App">
				{/* {this.addBannerComponent()} */}
				<div className='animation-wrapper'>
					{/* {this.addXiaoKuBaoAnimComponent()} */}
					{/* {this.addXiaoYunComponent()} */}
					{/* {this.addXiaoYunAsisAnimComponent()} */}
				</div>
				<div className="listview-wrapper">
					<MonthPicker 
						year={2018}
						month={8}
						onChange={(year, month) => { console.log(year, month) }}
					/>
					<TabView 
						activeTab={'list'}
						onTabChange={(currentTabName) => {console.log(currentTabName)}}
					/>
					<ListView
						itemList={listData}
						onModifyItem={(item) => console.log(item)}
						onDeleteItem={(item) => console.log(item)}
					/>
					
				</div>

			</div>
		)
	}
}

export default App;
