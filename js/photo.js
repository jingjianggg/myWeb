window.onload=function(){
    document.ondragstart = document.onselectstart = function(){return false;};
    var oUl=document.getElementById('list');
    var aLi=oUl.getElementsByTagName('li');
    var aImg=oUl.getElementsByTagName('img');
    var oInput=document.getElementById('random');
    var mask=document.getElementById("mask");
    var toNext=document.getElementById('next');
    var toPre=document.getElementById('previous');
    var onOff=false;
    var srcNum=0;
    var iZindex=1;
    var arr=[];//存每个li的left和top
    var arrSrc=["img/photo/pa.png","img/photo/sv.png","img/photo/invoker.png",
        "img/photo/pl.png","img/photo/wl.png","img/photo/ab.png",
        "img/photo/am.png","img/photo/dk.png", "img/photo/dp.png",
        "img/photo/in.png","img/photo/lion.png","img/photo/puck.png",
        "img/photo/ga.png", "img/photo/ck.png", "img/photo/tb.png", "img/photo/wr.png"
    ];

    for(var i=0;i<aLi.length;i++){
        arr.push([aLi[i].offsetLeft,aLi[i].offsetTop]);//offsetLeft包括margin
    }
    for(var i=0;i<aLi.length;i++){
        ////通过js转绝对定位
        aLi[i].style.position="absolute";
        aLi[i].style.left=arr[i][0]+'px';
        aLi[i].style.top=arr[i][1]+'px';
        aLi[i].style.margin='0';
        // aLi[i].style.transform='rotate('+Math.round(Math.random()*50-25)+'deg)';
        aImg[i].src=arrSrc[i];
    }
    for (var i=0;i<aLi.length;i++){
        aLi[i].index=i;
        aLi[i].indexView=i;
        Drag(aLi[i]);
        aLi[i].ondblclick=function () {
            srcNum=this.indexView;
            mask.style.display='block';
            for (var j=0;j<aLi.length;j++) {
                bufferMove(aImg[j],{
                    opacity:0
                },bufferMove(toNext,{
                        opacity:100
                    },
                    bufferMove(toPre,{
                        opacity:100
                    },function () {
                        toNext.style.cursor=toPre.style.cursor="pointer";
                    })));
                aLi[j].removeEventListener('mouseenter',enter,true);
                aLi[j].removeEventListener('mouseleave',leave,true);
                aLi[j].style.transition="0s";
                aLi[j].style.transform='rotate(0deg) scale(1)';
                aLi[j].onmouseout=onmouseover=function () {
                    for (var l=0;l<aLi.length;l++){
                        // aLi[l].onmouseenter=null;
                        aLi[l].style.transform='';
                    }
                };
                aLi[j].style.background="url("+arrSrc[this.indexView]+")";
                aLi[j].style.backgroundPosition=(-j%4*200)+'px '+(-Math.floor(j/4)*100)+'px';
                aLi[j].style.border='none';
                bufferMove(aLi[j],{
                    left:aLi[0].offsetWidth*1.5+j%4*200,
                    top:aLi[0].offsetHeight*1.5+Math.floor(j/4)*100
                })
            }
        }
    }
    toNext.onclick=function () {
        var t=0;
        srcNum++;
        for (var j=0;j<aLi.length;j++) {
            aLi[j].style.zIndex='0';
        }
        mask.style.opacity='1';
        bufferMove(mask,{
            opacity:0
        });
        if(srcNum==arrSrc.length){
            srcNum=0
        };
        for (var j=0;j<aLi.length;j++) {
            aLi[j].style.background="url("+arrSrc[srcNum]+")";
            aLi[j].style.backgroundPosition=(-j%4*200)+'px '+(-Math.floor(j/4)*100)+'px';
        };
    };
    toPre.onclick=function () {
        srcNum--;
        for (var j=0;j<aLi.length;j++) {
            aLi[j].style.zIndex='0';
        }
        mask.style.opacity='1';
        bufferMove(mask,{
            opacity:0
        });
        if(srcNum==-1){
            srcNum=arrSrc.length-1;
        };
        for (var j=0;j<aLi.length;j++) {
            aLi[j].style.background="url("+arrSrc[srcNum]+")";
            aLi[j].style.backgroundPosition=(-j%4*200)+'px '+(-Math.floor(j/4)*100)+'px';
        };
    };
    oInput.onmouseenter=function(){
        this.className='active';
    };
    oInput.onmouseleave=function(){
        this.className='';
    };
    oInput.onclick=function () {
        var randomArr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];//获取随机数0-8，为li指定arr[]中的index
        randomArr.sort(function (n1,n2) {
            return Math.random()-0.5;//随机数
        });
        mask.style.display='none';
        for (var i=0;i<aLi.length;i++){
            aLi[i].addEventListener('mouseenter',enter,true);
            aLi[i].addEventListener('mouseleave',leave,true);
            aLi[i].style.transition="0s";
            aLi[i].style.border="5px solid #fff";
            bufferMove(aLi[i],{
                left:arr[randomArr[i]][0],
                top:arr[randomArr[i]][1]
            });
            bufferMove(aImg[i],{
                opacity:100
            },bufferMove(toNext,{
                opacity:0
            },bufferMove(toPre,{
                opacity:0
            },function () {
                toNext.style.cursor=toPre.style.cursor='default'
            })));
            aLi[i].index=randomArr[i];//li运动到几号位置，该index就是几号
        };
    };

    function Drag(obj) {
        var disX=0;
        var disY=0;
        obj.addEventListener('mouseenter',enter,true);
        obj.addEventListener('mouseleave',leave,true);
        obj.onmousedown=function (ev) {
            // obj.removeEventListener('mouseenter',enter,false);
            // obj.removeEventListener('mouseleave',leave,false);
            obj.style.transition="0s";
            var ev=ev||window.event;
            disX=ev.clientX-obj.offsetLeft;
            disY=ev.clientY-obj.offsetTop;
            document.onmousemove=function (ev) {
                var ev=ev||window.event;
                obj.style.left=ev.clientX-disX+'px';
                obj.style.top=ev.clientY-disY+'px';

                for (var i=0;i<aLi.length;i++) {
                    aLi[i].style.border='';
                }
                var nL=nearLi(obj);
                if(nL) {
                    nL.style.border = '2px solid red';
                }
            };
            document.onmouseup=function(){
                document.onmouseup=document.onmousemove=null;
                var nL=nearLi(obj);
                var temp=0;
                if (nL) {
                    bufferMove(nL, {
                        left: arr[obj.index][0],
                        top: arr[obj.index][1]
                    });
                    bufferMove(obj, {
                        left: arr[nL.index][0],
                        top: arr[nL.index][1]
                    });
                    nL.style.border = '';
                    temp = obj.index;//临时存index，
                    obj.index = nL.index;
                    nL.index = temp;//交换index，保证顺序
                }else{
                    bufferMove(obj, {
                        left: arr[obj.index][0],
                        top: arr[obj.index][1]
                    });
                }
            };
            return false;
        }
    }
    function enter() {
        this.style.zIndex=iZindex++;
        this.style.transition=".2s";
        this.style.transform='scale(1.2)';
    };
    function leave() {
        this.style.transform='scale(1)';
        this.style.transition="0s";
    };
    function nearLi(obj) {//碰撞的最近的li
        var value=9999;
        var index=-1;
        for (var i = 0; i < aLi.length; i++) {
            if (collision(obj, aLi[i]) && obj != aLi[i]) {
                var c=distance(obj, aLi[i])//碰撞的li
                if (c<value){
                    value=c;//找到距离最近的一个碰撞Li
                    index=i;//对应的i
                }
            }
        }
        if (index!=-1){
            return aLi[index];
        } else{
            return false;
        }
    }
    function distance(obj1,obj2) {//勾股定理
        var a=obj1.offsetLeft-obj2.offsetLeft;
        var b=obj1.offsetTop-obj2.offsetTop;
        return Math.sqrt(a*a+b*b);
    }
};
