source = [{
    id: 1,
    pid: 0,
    name: 'body'
  }, {
    id: 2,
    pid: 1,
    name: 'title'
  }, {
    id: 3,
    pid: 2,
    name: 'div'
  }]

function jsonToTree(arr){
    let result=[]
    if(!Array.isArray(arr)) return result
    let map={}
    arr.forEach(item=>{
        map[item.id]=item
    })
    arr.forEach(item=>{
        let parent=map[item.pid]
        if(parent){
            (parent.children||(parent.children=[])).push(map[item.id])
        }else{
            result.push(item)
        }
    })
    return result
}
const tree=jsonToTree(source)
console.log(JSON.stringify(tree))