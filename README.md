## 技术栈
react + redux + react-router + immutable

## 工程化模块化
webpack + es6/7/8

## React-Router
1. react-router 提供Link标签，是a标签的封装，并阻止了a标签的默认行为，并用pushState进行hash值的转变；
2. 基于路由实现逻辑页面的运行时异步加载；
3. `npm install --save source-map-explorer` 分析Bundle包大小；
Code Spliting and React Router v4;
采用 asyncComponent 异步加载页面，基于react-router 进行code spliting; (基于webpack v4)；

# React 组件间通信方式

## 父子组件通信
父组件向子组件传递数据：通过props属性来传递，子组件通过this.props来读取；
子组件向父组件传递数据：通过间接调用父组件的方法来传递， this.props.XXX();

## 使用React提供的context
Context是React提供的一种组件树”全局“通信方式。

### React.createContext
每个Context对象包含一个Provider的React组件，允许consumer组件来订阅context的改变。
```js
const AppContext = React.createContext();
```

### Context的Provider与Consumer
Context的Provider接受一个value属性来传递参数。当value的属性发生变化时，所有作为Provider后代的consumer组件都会被重新渲染。
并且不受`shouldComponentUpdate`方法的约束。
```js
<AppContext.Provider value={{
    state: this.state,
    actions: this.actions}}>
    <div className="App">
        <AsyncRoute />
    </div>
</AppContext.Provider>
```

### 高阶组件重构Consumer
```js
const WithContext = (Component) => {
    // 返回一个functional的组件
    return (props) => (
        <AppContext.Consumer>
            {({ state, actions }) => {
                return <Component {...props} 
                            data={ state } 
                            actions={ actions } />
            }}
        </AppContext.Consumer>
    )
}
```

类组件的复用有一定的成本，需要使用高阶函数对他进行一定的封装；

render props 高度定制化的方式；

通过hooks引进一些副作用；

## React 设计模式
- 无状态组件 / 表现型组件
- 有状态组件 / 容器型组件
- render模式组件 
- 高阶组件
  
### render 模式
render props 是一种在不重复代码的情况下共享组件功能的设计模式。

### HOC 模式
Higher-order components 

例如 react-redux的connect方法，react-router中的withRouter都采用了HOC模式

[render props 和 HOC](https://www.jianshu.com/p/ff6b3008820a)

react-hooks不会对代码有破坏性的改动
