## Home页面
1. 账本条目展示组件：<PriceList />
2. tabView组件（组件设计）
``` jsx
<TabView 
    activeTab={targetTab}
    onTabChange={(currentTab) => {}} />
```
3. monthPicker
4. priceCount
5. createBtn
6. HomePage

## Create页面
1. 表单提交组件PriceForm
    - PriceForm编写 (done)  
    - 单元测试(done)  
2. 重构TabView 组件 :是的tab组件更加灵活，可扩展
```jsx
<TabView 
    tabList={}
    activeTabIndex={}  // 可不传，默认第一个
    onSelectTab={(selectedTabIndex) => {}/>
```
> 使用React.children 重构可扩展tabview组件

## 20190811-20190812
1. 重构tabview (done)
2. tabview 单元测试 (done)
3. 改造Home页tabs组件 (done)
4. monthPicker 组件的单元测试 (done)
5. 完善Home页面 根据日期filter的功能 (done)
6. 添加Home页面单元测试 
7. 完善CategorySelect组件 (done)

## 20190813 
1. flatten State (done)
2. 状态提升 (done)
3. 高阶组件 (done)
4. 改造Home (done)
5. 改造Create 
    - 考虑没有选择category的错误处理

## 20190814
1. 前后端分离
2. mock server
3. 设计后端接口
    - /items - GET, POST
    - /items/{id} - GET, PUT, DELETE
    - /items?monthCategory=2018-08&_sort=timestamp - GET (查询 query)
    - /categories - GET, POST
4. 采用json-server mock 后端数据
5. create-react-app 提供proxy来支持dev模式下的跨域
6. 提升selectYearAndMonth (done)
7. getIntialData (done)
8. create, modify, delete (done)
9. async await 改造 Promise 异步流程 （done)
10. add Loading (高阶函数 -> 高阶组件的本质) (done)

## 20190815
1. 优化异步流程的调用，减少不必要的请求（目的：节省带宽，减少请求次数）(done)
2. 容器型组件HomePage和CreatePage的单元测试
    - 测试页面的初始行为
    - 测试新建模式下的行为
    - 测试编辑模式下的行为
    遇到问题

### 测试三层模型
1. 根组件App.js
    - 通过模拟异步请求，测试异步请求，是否正确改变应用状态。
2. 容器型组件 Home 和 Create (容器型组件一般使用进行状态管理)
    - 验证不同的状态下的展示是否符合期望
    - 测试展示型组件的组合，是否正确显示
    - 测试传入的方法有没有正确触发
    - 测试传入的数据是否正确显示
3. 展示型组件 （Component文件夹里的）
    - 传入不同组合的props，是否达到期望的变化
    - 测试组件本身的属性和状态，是否正确显示和变化
    - 测试传入的方法是否正确触发

## 20190816
1. 添加主入口测试
2. 添加recharts库(done)
3. 生产环境build，本地部署 (done)
    > 结合json-server和express创建一个web server

## 20190818
1. throttle 函数(done)
2. dedoubce 函数

## 20191013
1. 把图片预加载器改成promise的写法；
2. debounce和throttle改成业务工具函数；

## 20191021
1. 对viewport视口进行理解；
    设置viewport的width=device-width或者写死成viewport=1920；
2. 对组件样式采用rem来设置；
3. dpr: devicePixelRatio = 物理像素 / 逻辑像素；
4. 响应式布局：媒体查询;
5. 以iphone6 为例，物理像素 w_750 * h_1334, screen.width 获取的逻辑像素是375, screen.height 获取的逻辑像素是667；


## 20191022
1. html的width为 document.documentElemnt.scrollWidth;
2. 