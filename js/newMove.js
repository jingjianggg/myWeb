function getStyle(obj,attr) {return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];}
///////////////////////////缓冲运动///////////////////////////////////
function bufferMove(obj,json,fn) {//同时运行两个
    clearInterval(obj.timer);
    var iCur=0;
    var iSpeed=0;
    obj.timer=setInterval(function () {
        var iBtn=true;
        for (var attr in json){
            var iTarget=json[attr];
            if(attr=='opacity'){
                iCur=Math.round(getStyle(obj,'opacity')*100);
            }else{
                iCur=parseInt(getStyle(obj,attr));
            }
            iSpeed=(iTarget-iCur)/8;//缓冲运动，8为系数
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
            if (iCur !=iTarget){
                iBtn=false;
                if (attr=='opacity'){
                    obj.style.opacity=(iCur+iSpeed)/100;
                    obj.style.filter='alpha(opacity='+(iCur+iSpeed)+')';
                } else{
                    obj.style[attr]=iCur+iSpeed+'px';
                }
            }
        }
        if (iBtn){
            clearInterval(obj.timer);
            fn&&fn.call(obj);
        }
    },30)
}
//////////////////////弹性运动///////////////////////////////////////
function flexMove(obj,iTarget){
    clearInterval(obj.timer);
    var iSpeed=0;
    iTarget=iTarget.offsetLeft;
    obj.timer=setInterval(function(){
        iSpeed+=(iTarget-obj.offsetLeft)/6;//弹性系数
        iSpeed*=0.7;//摩擦系数；
        if (Math.abs(iSpeed)<=1&&Math.abs(iTarget-obj.offsetLeft)<=1){
            clearInterval(obj.timer);
            obj.style.left=iTarget+'px';
            iSpeed=0;
        } else{
            obj.style.left=obj.offsetLeft+iSpeed+'px';
        }
    },30);
};