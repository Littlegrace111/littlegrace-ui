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
    1.1 PriceForm编写 (done)
    1.2 单元测试(done)
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
3. 改造Home页tabs组件
4. monthPicker 组件的单元测试
5. 添加Home页面单元测试
5. 完善create页面的CategorySelect组件

