var request = require('request'); 
var fs = require('fs');
var str = "<style>body{background-color:rgb(239,193,109);font-family:Tempus Sans ITC;} h2{ color:rgb(240,60,69)} .content {width: 800px;margin:0 auto 30px; background: #fc0; padding: 7px; border: 1px solid #ccc;}</style>"

request('https://api.meetup.com/2/open_events?&sign=true&photo-host=public&lat=51.53101&country=gb&topic=ios,IT,unix, linux, windows&city=London&lon=-0.082917&category=34&time=,1w&key=427785b3ec73715587310613d4c17', function (err,res,body) {
	var r = (JSON.parse(body))["results"]; 
	for (var i in r) {
		str += "<div class='content'><h2 align='center'>Occasion: " + (r[i])['name'] + "</h2>";
		str += "<div align='center'>Group: " + ((r[i])['group'])['name'] + "</div>";
    		if ('venue' in r[i]){
        		str +="<div align='center'>Address: " + ((r[i])['venue'])['address_1'] + "</div>";
		}
		var time = new Date((r[i])['time']);
		if (time.getDate() < 10){
			var day = '0'+ time.getDate();
		} 
		else day = time.getDate();  
		var month = time.getMonth()+1;
		var year = time.getFullYear();
		var hours = time.getHours();
		if (time.getMinutes() < 10){
			var minutes = '0' + time.getMinutes();
		}
		else minutes = time.getMinutes();
		str += "<h3 align='center'>Time: " + day + "-" + month + "-" + year + " " + hours + ":" + minutes +"</h3>";
    		str += "<div align='center'>Description: " + (r[i])['description'] + "</div></div>";
	}
	fs.writeFile("meetup.html", str, function (err){
		if (err) console.log(err);
	});
});