//获取cookie
export function getCookie(name) {
 var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
 if (arr = document.cookie.match(reg))
  return (arr[2]);
 else
  return null;
}

//设置cookie
export function setCookie (c_name, value, expiredays) {
 var exdate = new Date();
 exdate.setDate(exdate.getDate() + expiredays);
 document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" :
 ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie (name) {
 var exp = new Date();
 exp.setTime(exp.getTime() - 1);
 var cval = getCookie(name);
 if (cval != null)
  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

export function formatNumberToStr(num){
	if (num.indexOf(',') != -1) {
		alert(num)
		return num
	}
	let str1 = num+'';
	let fractionalPart = ''; //小数部分
	let integerPart = '';
	if (str1.indexOf('.') != -1) {
		fractionalPart = str1.split('.')[1];
		integerPart = str1.split('.')[0];
	}else{
		integerPart = num+'';
	}

//num=num+'';//数字转字符串  
  var str="";//字符串累加  
  for(var i=integerPart.length- 1,j=1;i>=0;i--,j++){  
      if(j%3==0 && i!=0){//每隔三位加逗号，过滤正好在第一个数字的情况  
          str+=integerPart[i]+",";//加千分位逗号  
          continue;  
      }  
      str+=integerPart[i];//倒着累加数字
  }  
  return str.split('').reverse().join("") + (fractionalPart !=''? '.'+fractionalPart:'');//字符串=>数组=>反转=>字符串  

}

export function formatStrToNumber(str){
	let str_integer = ''
	let str_decimal = ''
	if (str.indexOf(".")) {
		str_integer = str.split(".")[0];
		str_decimal = '.'+str.split(".")[1];
	}else{
		str_integer = str;
		str_decimal = ''
	}
	
	let integer_arr = str_integer.split(",");
	let integerPart = '';
	for (var i = integer_arr.length - 1; i >= 0; i--) {
		integerPart = integer_arr[i] +integerPart;
	}

	return Number(integerPart +str_decimal)
}