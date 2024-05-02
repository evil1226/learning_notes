<template>
	<div id='countDownBtn'>
		<button @click="clickBtn" :disabled="isShowed" class="submit-button">{{inputValue}}</button>
	</div>
</template>
<style>
.submit-button {  
  /* 默认样式或未禁用时的样式 */  
  background-color: blue;  
  color: white; /* 文本颜色为白色，以便在蓝色背景上可见 */  
  border: none; /* 去除边框 */  
  padding: 10px 20px; /* 内边距 */  
  cursor: pointer; /* 鼠标悬停时显示小手图标 */  
}  
  
.submit-button[disabled] {  
  /* 禁用时的样式 */  
  background-color: gray; /* 例如，禁用时显示为灰色 */  
  cursor: not-allowed; /* 鼠标悬停时显示禁止图标 */  
}  
</style>
<script>
	export default{
		el:'#countDownBtn',
		data(){
			return{
			    isShowed:false,
			    inputValue:'点击提交',
			    count:10,
			    timer:null,
			};
		},
		methods:{
			clickBtn(){
				this.isShowed=true;
				this.inputValue='点击提交'+this.count+'s';
				this.timer=setInterval(()=>{
				    if(this.count>0){
				        this.count--;
				        this.inputValue='点击提交'+this.count+'s';
				    }else{
				        clearInterval(this.timer)
				        this.isShowed=false;
				        this.inputValue='点击提交';
				        this.count=10;
				    }
				},1000)
			}
		}
	}
</script>