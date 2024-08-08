var isValid = function(s) {
    const n=s.length;
    if(n%2===1) return false
    const pairs=new Map([
        [')', '('],
        [']', '['],
        ['}', '{']
    ])
    //console.log(pairs)
    let str=[]
    for(let ch of s){
        if(pairs.has(ch)){
            if(!str.length||str[str.length-1]!==pairs.get(ch)){
                return false
            }
            str.pop()
            
        }else{
            str.push(ch)
        }
        
    }
    
    return !str.length
}
 
const s = "()[]{}"
console.log(isValid(s))