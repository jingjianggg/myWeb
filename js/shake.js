function shake(obj,attr,endFn){
    var arr=[];
    var pos=parseInt(getStyle(obj,attr));//
    var num=0;
    for(var i=10;i>0;i-=2){
        arr.push(i,-i);
    }
    arr.push(0);
    clearInterval(obj.shake);//相当于timer
    obj.shake=setInterval(function(){
        obj.style[attr]=pos+arr[num]+'px';
        num++;
        if(num===arr.length){
            clearInterval(obj.shake);
            endFn&&endFn();
        }
    },50)
};
function getStyle(obj,attr) {return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];}
