## Promise
### Promise基础
Promise是JavaScript中用于处理异步操作的一个关键概念。它代表了一个尚未完成但预期在将来完成的操作。使用Promise，可以避免所谓的“回调地狱”，即多层嵌套的回调函数，从而使代码更加清晰和易于维护。

Promise是一个对象，用来表示一个异步操作的最终完成（或失败）及其结果值，它能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来，使得异步方法可以像同步方法那样有返回值，异步方法不会立即返回最终的值，而是会返回一个 promise，以便在未来某个时候把值交给使用者
```js
let promise = new Promise(function(resolve, reject) {
  // 异步操作代码
  setTimeout(() => {
    resolve("操作成功");
  }, 1000);
});

promise.then((value) => {
  console.log(value); // 输出：操作成功
});
```
### Promise状态
一个Promise有三种可能的状态：

1. **pending（待定）** ：初始状态，既不是成功，也不是失败。
2. **fulfilled（已实现）** ：意味着操作成功完成。
3. **rejected（已拒绝）** ：意味着操作失败。

`Executor`是在创建`Promise`时需要传入的一个回调函数，这个回调函数会被立即执行，并且传入两个参数，通常我们会在`Executor`中确定我们的`Promise`状态，通过`resolve`，可以兑现（`fulfilled`）`Promise`的状态，我们也可以称之为已决议，通过`reject`，可以拒绝（`rejected`）`Promise`的状态。

一旦状态被确定下来，`Promise`的状态会被锁死，该`Promise`的状态是不可更改的,在我们调用`resolve`的时候，如果`resolve`传入的值本身不是一个`Promise`(`resolve`传参的区别后续会讲到)，那么会将该`Promise`的状态变成 兑现（`fulfilled`），在之后我们去调用`reject`时，已经不会有任何的响应了

### Promise的使用
**执行resolve或reject之后发生了什么**

当我们调用`resolve`回调函数时，会执行`Promise`对象的`then`方法传入的回调函数；当我们调用`reject`回调函数时，会执行`promise`对象的`catch`方法传入的回调函数。
`then`方法和`catch`方法是`Promise`原型上的一个方法：`then`方法会返回一个`Promise`，最多可以接收两个参数，分别是`Promise`成功和失败情况的回调函数；`catch`方法也返回一个`Promise`，当我们的`Promise`被拒绝时(`reject`)调用`catch`里的回调函数。

**resolve回调函数参数的处理**

- 情况一：如果`resolve`传入一个普通的值或者对象，那么这个值会作为`then`回调的参数
- 情况二：如果`resolve`中传入的是另外一个`Promise`，那么这个新`Promise`会决定原`Promise`的状态,并且新`Promise`的`resolve`或`reject`的参数也会传给原来的`promise`
- 情况三：`resolve`传入的是一个对象，并且该对象有实现`then`方法，那么会执行这个`then`方法，并且根据`then`方法的结果来决定`Promise`的状态

**Promise的.then和.catch方法的调度**

`then`是可以被多次调用的，每次调用我们都可以传入对应的`fulfilled`回调，当`Promise`的状态变成`fulfilled`的时候，这些回调函数都会被执行。

`catch`也是可以被多次调用的，每次调用我们都可以传入对应的`rejected`回调；当`Promise`的状态变成`rejected`的时候，这些回调函数都会被执行。

**then和catch方法的返回值**
1. then返回值

    then方法本身是有返回值的，他的返回值是一个Promise，所以我们可以对其进行链式调用。

    当`then`方法中的回调函数在执行的时候，返回的`promise`处于`pending`状态，当返回一个结果时，会处于`fullfilled`状态，并且将结果作为`resolve`的参数，因此链式调用的`then`方法里的回调函数的参数是上一个`then`方法的返回值

    - 情况一：返回一个普通的值`a`。将这个值`a`作为`resolve`的参数，因此在后面的.then方法里的回调函数获取到的参数就是`a`
    - 返回一个`Promise`。如果返回了一个`PromiseA`，那么`then`返回的`PromiseB`的状态会由`PromiseA`的状态决定，并且将`PromiseA`的状态的回调函数的参数作为`PromiseB`的状态的回调函数的参数
    - 情况三：返回一个`thenable`对象，如果`then`方法里面的回调函数返回了一个带有`then`方法的对象，那么`then`方法返回的`PromiseA`的状态是由`then`方法里的结果决定的

2. catch返回值

    catch也会返回一个Promise，因此也是支持链式调用的，且catch后面可以调用then或者catch方法。

    链式调用中的.catch方法的执行时机，是由上一个promise是否抛出异常决定的，如果上一个Promise照常返回一个值，执行的是链式调用中的then方法

**Promise的finally**

finally是ES9中新增的一个特性，无论promise变成fullfilled状态还是rejected状态，都会执行finally里面的回调，而且finally不接收任何参数

### promise的类方法
**Promise.all**

`Promise.all`的作用是将多个`Promise`包裹在一起形成一个新的`Promise`，并且这个新的`Promise`的状态是由包裹的`Promise`的状态共同决定的：

当所有的`Promise`的状态变成`fullfilled`，新的`Promise`的状态变为`fullfilled`，并将所有`promise`的返回值组成一个数组
当有一个`Promise`的状态变成`reject`,新的`Promise`的状态会变成`reject`，并且会将第一个`reject`的`Promise`的返回值作为参数

**Promise.resolve**

`Promise.resolve(res)`  方法返回一个以给定值解析后的 `Promise`对象，有时候我们已经有一个现成的值希望将其转换成`Promise`可以使用该类方法。

`resolve`方法中的参数如果是一个 `promise`，那么将返回这个 `promise`；如果是 `thenable`（即带有 then方法），返回的 `promise` 会“跟随”这个 `thenable`的对象，采用它的最终状态；否则返回的 `promise `将以此值完成。

**Promise.reject**

`reject`方法类似于`resolve`方法，只是会将`Promise`对象的状态设置为`reject`状态。

`Promise.reject`传入的参数无论是什么形态，都会直接作为`reject`状态的参数传递到`catch`的

**Promise.race**

如果有一个`Promise`有了结果，我们就希望决定最终新`Promise`的状态，那么可以使用`race`方法。

**Promise.any**

`any`方法是ES12中新增的方法，和`race`方法是类似的,不同的是`any`方法会等到一个`fulfilled`状态，才会决定新`Promise`的状态，如果所有的Promise都是`reject`的，那么也会等到所有的`Promise`都变成`rejected`状态。

如果所有的`Promise`都是`reject`的，那么会报一个`AggregateError`的错误。

**Promise.allSettled**

`all`方法有一个缺陷：当有其中一个`Promise`变成`reject`状态时，新`Promise`就会立即变成对应的`reject`状态。那么对于`resolved`的，以及依然处于`pending`状态的`Promise`，我们是获取不到对应的结果的。

在ES11（ES2020）中，添加了新的API `Promise.allSettled`，该方法会在所有的`Promise`都有结果（`settled`），无论是`fulfilled`，还是`rejected`时，才会有最终的状态。

`allSettled`的结果是一个数组，数组中存放着每一个`Promise`的结果，并且是对应一个对象的；这个对象中包含`status`状态，以及对应的`value`值。
