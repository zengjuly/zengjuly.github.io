
var wait_loaded = false;
var loaded = false;
var nIntervId;
var count = 1;
goDate = new Date("2021-4-4 23:59:59");
var offset_date;
var submitFlag = false;

const STARTING = 0;
const QIAGGOU = 1;
const YUEYUEQIANGGOU = 2;
const JIAGOUWUCHE = 3;
const JINGOUWUCHE = 4;
const JIESUAN = 5;
const SUBMIT = 6;

const WAIT_LOAD  = true;

var stage = STARTING;

var getServerDateMoudle = (function () {

    var getServerDate = function () {
        var timeDate = '';
        try {
            var xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new window.XMLHttpRequest();
            } else { // ie
                xhr = new ActiveObject("Microsoft")
            }
            xhr.open("GET", "", false)//false不可变
            xhr.send(null);
            timeDate = xhr.getResponseHeader("Date");
        }
        catch (err) {
            debugger;
        }
        return new Date(timeDate);
    };
    var init = function () {
        return getServerDate()
    };
    return {
        init: init,
    }
}());



function go() {
    // console.log("正在帮你抢购 ＊ 刷新" + count + "次");
    //console.log("host:" + window.location.hostname);
    count++;

    if (count % 100 == 0){
        console.log("等待抢购开始");
    }

    var dateNow = Date.now()

    if(WAIT_LOAD == true && wait_loaded == true && loaded == false){
        console.log("waiting for loaded signal stage:" + stage + " time:" +  dateNow);
        return;
    }

    switch (stage) {
        case STARTING:
            wait_loaded = false;
            if ((dateNow + offset_date) >= goDate) {
                // console.log("开始抢购" + Date.now());

                // 抢购
                if ($(parent.frames[0].document).find("#choose-btn-ko").length == 1) {
                    console.log("++++++++++++抢购");
                    var sku = window.location.pathname.replace(/[^0-9]/ig, "");
                    var ref = "//cart.jd.com/gate.action?pid=" + sku + "&pcount=1&ptype=1";
                    console.log("https:" + ref);
                    //5089237
                    $(parent.frames[0].document).find("#choose-btn-ko").attr("href", ref);//                 
                    parent.frames[0].document.getElementById("choose-btn-ko").click();
                    stage = QIAGGOU;
                    return;
                }

                //预约抢购
                if ($(parent.frames[0].document).find("#btn-reservation").length == 1) {
                    console.log("++++++++++++正在预约抢购");

                    parent.frames[0].document.getElementById("btn-reservation").click();
                    stage = YUEYUEQIANGGOU;
                    return;
                }

                //加入购物车 
                if ($(parent.frames[0].document).find("#InitCartUrl").length == 1) {
                    // console.log("++++++++++++加入购物车:" + parent.frames[0].document.getElementById("InitCartUrl").getAttribute("href"));
                    parent.frames[0].document.getElementById("InitCartUrl").click();
                    stage = JIAGOUWUCHE;
                    return;
                }
            }
            break;
        case QIAGGOU:
        case YUEYUEQIANGGOU:
        case JIAGOUWUCHE:
            {
                if ($(parent.frames[0].document).find("#GotoShoppingCart").length == 1) {
                    console.log("++++++++++++正在去购物车结算");
                    

                    //  解决购物篮为空的情况
                    // Mixed Content: The page at 'xxx' was loaded over HTTPS, 
                    // but requested an insecure resource 'xxx'. 
                    // This request has been blocked; the content must be served over HTTPS.
                    var head = document.head || document.getElementsByTagName('head')[0];
                    var style = document.createElement('meta');
                    style.setAttribute("http-equiv", "Content-Security-Policy");
                    style.setAttribute("content", "upgrade-insecure-requests");
                    head.appendChild(style);
                    //https://blog.csdn.net/I_am_a_buger/article/details/112852092
                    parent.frames[0].document.getElementById("GotoShoppingCart").click();
                    stage = JINGOUWUCHE;
                    wait_loaded = true;
                    loaded = false;
                }
                break;
            }
        case JINGOUWUCHE:
            {
                //去结算        
                if ($(parent.frames[0].document).find(".common-submit-btn").length == 1) {
                    console.log("++++++++++++正在去结算");

                    //只提交我抢购的商品
                    //var sku = window.location.pathname.replace(/[^0-9]/ig, "");                 

                    //$("#toggle-checkboxes_up").trigger("click");
                    //全不选择
                    //parent.frames[0].document.getElementById("toggle-checkboxes_up").click();

                    //$(parent.frames[0].document).find('input:checkbox').attr("checked",false);
                    //$(parent.frames[0].document).find("input:checkbox[value^='"+sku+"']").trigger("click");

                    //$(parent.frames[0].document).find("input:checkbox[value^='"+sku+"']").attr("checked",true);

                    parent.frames[0].document.getElementsByClassName("common-submit-btn")[0].click();
                    stage = JIESUAN;
                    wait_loaded = true;
                    loaded = false;
                }
                
                break;
            }
        case JIESUAN:
            {
                //提交订单order-submit
                if ($(parent.frames[0].document).find("#order-submit").length == 1) {
                    console.log("(++++++++++++正在提交订单");
                    //$(parent.frames[0].document).find(".payment-item item-selected online-payment")

                    //在线支付
                    parent.frames[0].document.getElementById("order-submit").click();
                    
                    stage = SUBMIT;
                    clearInterval(nIntervId)
                }
                break;

            }



    }

}

function load()
{
    console.log("loaded");
    loaded = true;
}

function rewrite(current) {
    fr4me = '<frameset cols=\'*\'>\n<frame src=\'' + current + '\' onload=\"load()\"/>';
    fr4me += '</frameset>';
    with (document) { write(fr4me); void (close()) };
}


//注入sql
rewrite(window.location.href);
var server_date = getServerDateMoudle.init()
offset_date = server_date - new Date()

try {

    console.log("设定时间成功:" + goDate);

    // alert("监控期间,请保持标签页在最前面");
    //go(); 0.25秒执行一次
    nIntervId = setInterval("go()", 100);
}
catch (e) {
    alert("时间格式不正确,请使用yyyy-MM-dd hh:mm:ss格式,精确到秒, 请重试");
}
