## React组件和jsx
### 组件化开发
基本组件需要具备：

**组件html模板+数据和方法**

### React组件分类
函数组件——新版本vue3组合式api，组件首字母一定要大写
```js
function Hello(){
    return <div>hello</div>
}
```
class组件——老版本vue2选项api
```js 
class Hello extends React.components {
    constructor(props){
        super(props);
    }
    render(){
        return <div>hello class</div>
    }
}
```

### jsx的特点
可以和js混用，react中利用babel做了对js的编译，所以可以在js中写jsx

写法接近js，不同点在于，可以更方便低写html在js里，写在js里的html最后会被编译成一个js对象，我们也可以用react自带createElement创建这个对象。

jsx本质上只是一种写法，一个方法或一个组件加上尖括号都可以当作html元素使用，最后都会编译转化为react-element对象，不借助jsx也可以直接用react.createElement对象方法创建react-element对象。

只是一种创建react-element对象的快捷方法。

### jsx里面渲染不同内容的区别
- 字符串、数字：直接渲染
- 对象：只能渲染element对象
- 数组：把数组的每一项单独渲染
- 表达式：运行表达式
- 方法：无法渲染。会报错
- 布尔值：无内容渲染，无报错
- undefined、null：无内容渲染，无报错

