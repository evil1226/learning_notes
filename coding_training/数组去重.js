oldArr=[1, '1', '1', 2, true, 'true', false, false, null, null, {}, {},{name:'123'}, 'abc', 'abc', undefined, undefined, NaN, NaN]
//方法一
function deduplicate(arr){
    const res=[]
    const obj={}
    for(let i=0;i<arr.length;i++){
        const key=typeof arr[i]==='object'&&arr[i]!==null?JSON.stringify(arr[i]):arr[i]
        if(!obj[key]){
            res.push(arr[i])
            obj[key]=1
        }
    }
    return res
}
console.log(deduplicate(oldArr))