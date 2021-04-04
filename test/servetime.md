/**
 * Created by console on 2019-07-25.
 */
/**
 * init :直接获取服务器时间
 * @type {{init}}
 */
var  getServerDateMoudle=(function() {
 
    var  getServerDate=function () {
        var timeDate='';
        try
        {
            var xhr = null;
            if(window.XMLHttpRequest){
                xhr = new window.XMLHttpRequest();
            }else{ // ie
                xhr = new ActiveObject("Microsoft")
            }
            xhr.open("GET","",false)//false不可变
            xhr.send(null);
            console.log(xhr.responseText)
            timeDate = xhr.getResponseHeader("Date");
            console.log("服务器时间timeDate:" + timeDate);
        }
        catch(err)
        {
            debugger;
        }
        return new Date(timeDate);
    };
    var init=function(){
        return getServerDate()
    };
    return {
        init:init,
    }
}());

var server_date = getServerDateMoudle.init() 
var offset_dateT = server_date - new Date()

console.log("服务器时间:" + server_date);
console.log("服务器 - 本地 时间:" + offset_dateT);
console.log("调整后的本地时间:" + (new Date() + offset_dateT));

