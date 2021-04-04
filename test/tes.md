

var nIntervId;
var count = 1;
var goDate;
function go() {
    console.log("正在帮你抢购 ＊ 刷新" + count + "次");
    //console.log("host:" + window.location.hostname);
        // var demo =  document.getElementById("banner-miaosha")
        // var demo = document.getElementsByClassName("activity-banner  J-seckill seckill-yg")
        //var demo = document.querySelector('#banner-miaosha');
        // var demo =$("#banner-miaosha").html();

        var demo = document.querySelector("div.activity-banner.J-seckill.seckill-yg");
        console.log("倒计时lenth： " + demo )

    count++;   
    
}

function rewrite(current) {
    
}
 
 
//注入sql
rewrite(window.location.href);
 
//这里需要注意的是，prompt有两个参数，前面是提示的话，后面是当对话框出来后，在对话框里的默认值
// var d = prompt("请输入抢购开始时间", "2021-4-4 23:59:59");
//如果返回的有内容
// if (d) 
{
    try {
        goDate = new Date(d);
        console.log("设定时间成功:" + goDate);
 
       // alert("监控期间,请保持标签页在最前面");
        //go(); 0.25秒执行一次
        // nIntervId = setInterval("go()", 250);
        go();
    }
    catch (e) {
        // alert("时间格式不正确,请使用yyyy-MM-dd hh:mm:ss格式,精确到秒, 请重试")
    }
}

