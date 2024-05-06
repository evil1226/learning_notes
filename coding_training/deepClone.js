function deepClone(obj){
    if(typeof obj !=="object"||obj===null) return obj
    const newObj=Array.isArray(obj)?[]:{}
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key]=typeof obj[key] ==='object'?deepClone(obj[key]):obj[key]
        }
    }
    return newObj
}
let obj={
    name:'张三',
    age:18,
    message:{
        height:180,
        weight:150
    }
}
let obj2=deepClone(obj)
obj.message.height=190
console.log(obj2)