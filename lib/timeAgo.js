/***************************************************/

var settings = {
	now				: 	"지금",
	seconds			: 	"%d 초 전",
	minute 			: 	"일 분 전",
	minutes			: 	"%d 분 전",
	hour 			: 	"한 시간 전",
	hours			: 	"%d 시간 전",
	day 			: 	"하루 전",
	days 			: 	"%d 일 전",
	month 			: 	"한 달 전",
	months 			: 	"%d 개월 전",
	year 			: 	"a 년 전",
	years 			: 	"%d 년 전"
};

/***************************************************/

var inWords = function(inpDate, timeYn){
	// Get time distance from now (in milliseconds)
	var timeDist 	= 	new Date().getTime() - inpDate.getTime();

	// Get time components
	var seconds 	= 	Math.abs(timeDist) 	/ 	1000;
	var minutes 	= 	seconds 			/ 	60;
	var hours 		= 	minutes 			/ 	60;
	var days 		= 	hours 				/ 	24;
	var years 		= 	days 				/ 	365;


	// Get string from number
	function getStrFromNum(string, number){
		return string.replace(/%d/i, number);
	}
	function getLicalTime(string){
		return timeYn ? string.getFullYear()+'.'+( string.getMonth() + 1 )+'.'+string.getDate() + ' ' + string.getHours()+":"+string.getHours()+":"+string.getSeconds()
		: string.getFullYear()+'.'+( string.getMonth() + 1 )+'.'+string.getDate();
	}

	// return words
	var words = 
		seconds 	< 	30 		&& 	getStrFromNum(settings.now, 	0					) 	||
		seconds 	< 	60 		&& 	getStrFromNum(settings.seconds, Math.round(seconds)	) 	||
		seconds 	< 	120 	&& 	getStrFromNum(settings.minute, 	1					) 	||
		minutes 	< 	60 		&& 	getStrFromNum(settings.minutes, Math.round(minutes)	) 	||
		minutes 	< 	120 	&& 	getStrFromNum(settings.hour, 	1					) 	||
		hours 		< 	24 		&& 	getStrFromNum(settings.hours, 	Math.round(hours)	) 	||
		hours 		< 	48 		&& 	getStrFromNum(settings.day, 	1					) 	||
		days 		< 	30 		&& 	getStrFromNum(settings.days, 	Math.round(days)	) 	||
		getLicalTime(inpDate);

	return words;
};


/***************************************************/


var getAgoString = function(input, timeYn){
	if(input instanceof Date){
		return inWords(input, timeYn);
	}
	else if(typeof input === "number"){
		return inWords(new Date(input), timeYn);
	}
	else if(typeof input === "string" && new Date(input).toString() != 'Invalid Date'){
		return inWords(new Date(input), timeYn);
	}
	else{
		return input; // could not convert
	}
};

/***************************************************/

module.exports = exports = getAgoString;
