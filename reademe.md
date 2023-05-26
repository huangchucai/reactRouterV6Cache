## 基于React-Router v6的组件缓存
目前react18的`Offscreen`还没有发布, 在使用`react-router-dom`最新的v6版本的时候，由于单页面应用的特性，每次路由切换都会重新渲染组件，
这样会导致一些组件的状态丢失，比如表单的输入，滚动条的位置、一些动画等等。这个时候就需要一个组件缓存的方案，来解决这个问题。


在`react-router-dom`的v5版本中，我们之前都是缓存页面层级，但是由于v6版本路由的变化，我们需要缓存组件，而不是页面层级。

## 使用
提供三个`api`操作
- `KeepaliveScope`：最外层容器，用于提供一些组件缓存的操作
- `Keepalive`：缓存组件，用于包裹需要缓存的组件，接受一个缓存的唯一`id(cacheId)`
- `useCacheDestory`: 摧毁组件缓存的`hook`

### 基本使用代码
组件的内容
```javascript
function App() {
  return (
      <BrowserRouter>
        <KeepaliveScope>
          <Routes>
            <Route
                element={
                  <KeepaliveItem cacheId="Home">
                    <Home/>
                  </KeepaliveItem>
                }
                path="/"
            />
            <Route element={<Test/>} path="/test"/>
            <Route element={<Text/>} path="/text"/>
          </Routes>
        </KeepaliveScope>
      </BrowserRouter>
  );
}
```
组件销毁的使用
```javascript
function Test() {
  const destory = useCacheDestory();
  return (
      <div>
        <button onClick={() => destory("Home")}>clean form cache</button>
      </div>
  );
}
```

## 原理介绍
