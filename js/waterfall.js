// 模拟后台回传的数据
var dataStr = '{"src":["i1.jpg","i2.jpg","i3.jpg","i4.jpg","i5.jpg","i6.jpg","i7.jpg","i8.jpg","i9.jpg","i10.jpg","i11.jpg","i12.jpg","i13.jpg","i14.jpg","i15.jpg"]}';
// JSON化解析后台传来的数据
var dataObj = JSON.parse(dataStr);
// 获取页面元素
var outDiv = document.querySelector(".outer");
// 先把图片加载页面上（向页面中添加15条新数据）
function addImg_inDiv (){
	for(var i=0; i<dataObj.src.length; i++){
		var inDiv = document.createElement("div");
		inDiv.innerHTML = '<img src="img/'+dataObj.src[i]+'" >';
		inDiv.className = "inner";
		outDiv.appendChild(inDiv);
	}
};
// 构建瀑布流
// 页面加载完毕后（脚本，代码，样式，图片加载并渲染完毕）
function create_waterFall (){
	var inDivs = document.querySelectorAll(".inner");
	var num = Math.floor(document.documentElement.clientWidth / inDivs[0].offsetWidth);
	outDiv.style.width = num*inDivs[0].offsetWidth + "px";
	var heightArr = [];
	for(var j=0; j<inDivs.length; j++){
		if(j<num){
			heightArr.push(inDivs[j].offsetHeight);
		}else{
			inDivs[j].style.position = "absolute";
			// 找到最小高度
			var minHeight = Math.min.apply(null, heightArr);
			var minIndex = heightArr.indexOf(minHeight);
			var leftDistance = inDivs[minIndex].offsetLeft;
			// 开定位
			inDivs[j].style.top = minHeight + "px";
			inDivs[j].style.left = leftDistance + "px";
			heightArr[minIndex] += inDivs[j].offsetHeight;
		}
	}
};
// 判断需不需要添加新数据函数
function ifNeedAppendData (){
	var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
	var viewportHeight = document.documentElement.clientHeight;
	var inDivs = document.querySelectorAll(".inner");
	var lastOne_top = inDivs[inDivs.length-1].offsetTop;
	// 如果滚动距离 + 屏幕高度 > 最后一张图片的offsetTop高度
	// 就意味着最后一张图片已经出现在了屏幕中，需要加载更多的图片了
	if(scrollHeight + viewportHeight > lastOne_top){
		return true;
	}
};
// -------------------------------------------
// 页面初始化
addImg_inDiv();
window.onload = function (){
	create_waterFall();
};
// 滚动事件，每一次滚动都要判断需不需要添加新数据
document.onscroll = function (){
	// 如果需要添加数据
	if(ifNeedAppendData()){
		// 再添加15条新数据
		addImg_inDiv();
		// 重新构建页面瀑布流
		create_waterFall();
	}
};