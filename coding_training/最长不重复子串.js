//给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串的长度。
var lengthOfLongestSubstring = function(s) {
    let set=new Set()
    const n=s.length;
    let rk=-1,ans=0;
    for(let i=0;i<n;i++){
        if(i!=0){
            set.delete(s.charAt(i-1))
        }
        while(rk+1<n&&!set.has(s.charAt(rk+1))){
            set.add(s.charAt(rk+1))
            rk++
        }
        ans=Math.max(ans,rk-i+1)
    }
    return ans
};
let s = "abcabcbb"
console.log(lengthOfLongestSubstring(s))