class MyPromise{
    constructor(executor){
        this.initValue();
        this.initBind();
        try{
            executor(this.resolve,this.reject)
        }catch(err){
            this.reject(err)
        }
        
    }
    initValue(){
        this.promiseResult=null;
        this.promiseState='pending';
        this.onFulfilledCallbacks=[];
        this.onRejectedCallbacks=[];
    }
    initBind(){
        this.resolve=this.resolve.bind(this)
        this.reject=this.reject.bind(this)
    }
    resolve(value){
        if(this.promiseState==='pending'){
            this.promiseState='fulfilled'
            this.promiseResult=value
            // 执行保存的成功回调
            while(this.onFulfilledCallbacks.length){
                this.onFulfilledCallbacks.shift()(this.promiseResult)
            }
        }
    }
    reject(reason){
        if(this.promiseState==='pending'){
            this.promiseState='rejected';
            this.promiseResult=reason;
            // 执行保存的失败回调
            while(this.onRejectedCallbacks.length){
                this.onRejectedCallbacks.shift()(this.promiseResult)
            }
        }
    }
    then(onFulfilled,onRejected){
        // 接收两个回调 onFulfilled, onRejected

        // 参数校验，确保一定是函数
        onFulfilled=typeof onFulfilled==='function'?onFulfilled:val=>val;
        onRejected=typeof onRejected==='function'?onRejected:reason=>{throw reason}
        
        var thenPromise=new MyPromise((resolve,reject)=>{
            const resolvePromise=cb=>{
                setTimeout(()=>{
                    try{
                        const x=cb(this.promiseResult)
                        if(x===thenPromise){
                            throw new Error("不能返回自身")
                        }
                        if(x instanceof MyPromise){
                            // 如果返回值是Promise
                            // 如果返回值是promise对象，返回值为成功，新promise就是成功
                            // 如果返回值是promise对象，返回值为失败，新promise就是失败
                            // 谁知道返回的promise是失败成功？只有then知道
                            x.then(resolve,reject)
                        }else{
                            resolve(x)
                        }
                    }catch(err){
                        reject(err)
                        throw new Error(err)
                    }
                })
            }
            if(this.promiseState==='fulfilled'){
                // 如果当前为成功状态，执行第一个回调
                resolvePromise(onFulfilled)
            }else if(this.promiseState==='rejected'){
                 // 如果当前为失败状态，执行第二个回调
                resolvePromise(onRejected)
            }else if(this.promiseState==='pending'){
                 // 如果状态为待定状态，暂时保存两个回调
                 this.onFulfilledCallbacks.push(resolvePromise.bind(this,onFulfilled))
                 this.onRejectedCallbacks.push(resolvePromise.bind(this,onRejected))
            }
        })
        
        return thenPromise
    }
    static all(promises){
        const result=[]
        let count=0;
        return new MyPromise((resolve,reject)=>{
            const addData=(index,value)=>{
                result[index]=value
                count++
                if(count===promises.length) resolve(result)
            }
            promises.forEach((promise,index)=>{
                if(promise instanceof MyPromise){
                    promise.then(res=>{
                        addData(index,res)
                    },err=>{
                        reject(err)
                    })
                }else{
                    addData(index,promise)
                }
            })
        })
    }

    static race(promises){
        return new MyPromise((resolve,reject)=>{
            promises.forEach(promise=>{
                if(promise instanceof MyPromise){
                    promise.then(res=>{
                        resolve(res)
                    },err=>{
                        reject(err)
                    })
                }else{
                    resolve(promise)
                }
            })
        })
    }
}

// Promise.all 测试用例
const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'Promise 1');
  });
  
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 200, 'Promise 2');
  });
  
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(reject, 300, 'Promise 3');
  });
  
  Promise.all([promise1, promise2, promise3])
    .then(values => {
      console.log('Promise.all 所有 Promise 都已完成:', values);
    })
    .catch(error => {
      console.error('Promise.all 中有 Promise 失败:', error);
    });
  
  
  // Promise.race 测试用例
  const promise4 = new Promise((resolve, reject) => {
    setTimeout(reject, 400, 'Promise 4');
  });
  
  const promise5 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'Promise 5');
  });
  
  const promise6 = new Promise((resolve, reject) => {
    setTimeout(resolve, 600, 'Promise 6');
  });
  
  Promise.race([promise4, promise5, promise6])
    .then(value => {
      console.log('Promise.race 中有 Promise 完成:', value);
    })
    .catch(error => {
      console.error('Promise.race 中有 Promise 失败:', error);
    });
  
