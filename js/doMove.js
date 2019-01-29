function doMove(obj,attr,dir,target,endFn){
    dir=parseInt(getStyle(obj,attr))<target?dir:-dir;//判断正负,前进后退
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var speed=parseInt(getStyle(obj,attr))+dir;
        console.log(speed);
        if(dir>0&&speed>target||dir<0&&speed<target){
            speed=target;
        }/*if(dir<0&&speed<target){
                    speed=target;
                }*///简写合并
        obj.style[attr]=speed+'px';
        if(speed==target){
            clearInterval(obj.timer);
            /*if(endFn){
                endFn();
            }*///判断是否有回调函数，简写如下
            endFn&&endFn();
        }
    },14);
};
function getStyle(obj,attr) {return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];}
