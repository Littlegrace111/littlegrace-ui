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

### 20190811-20190812 工作
1. 重构tabview (done)
2. tabview 单元测试 (done)
3. 改造Home页tabs组件 (done)
4. monthPicker 组件的单元测试 (done)
5. 完善Home页面 根据日期filter的功能 (done)
6. 添加Home页面单元测试 
7. 完善CategorySelect组件 (done)

### 20190813 
1. flatten State (done)
2. 状态提升 (done)
3. 高阶组件


