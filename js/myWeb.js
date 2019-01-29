window.onload=function () {
    var box=document.querySelectorAll('.box-3d-content');
    var L=box.offsetLeft;
    var R=box.offsetLeft+box.offsetWidth;
    var T=box.offsetTop;
    var B=box.offsetTop+box.offsetHeight;
    var numX=previewImgNum=0;
    var title=document.querySelector('.title');
    var previewImg=document.getElementById('preview_img');
    var previewImgLi=previewImg.getElementsByTagName('li');
    for (var i=0;i<box.length;i++){
        box[i].index=i;
        toRotate(box[i]);
        box[i].onmouseover=function () {
            var _this=this;
            clearInterval(previewImg.timer);
            clearInterval(this.timer);
            previewImgNum=this.index;
            for (var i=0;i<box.length;i++) {
                bufferMove(previewImgLi[i],{
                    opacity:0//淡出
                })
            }
            this.style.transform='';
            bufferMove(previewImgLi[this.index],{
                opacity:100//淡入
            },bufferMove(title,{
                opacity:100
            }))

        };
        box[i].onmouseout=function () {
            previewImg.timer= setInterval(function () {
                toRun();
            },2000);
            bufferMove(title,{
                opacity:0
            });
            toRotate(this);
        }
    };
    previewImg.onmouseover=function(){
        clearInterval(previewImg.timer);
    };
    previewImg.onmouseout=function(){
        previewImg.timer= setInterval(function () {
            toRun();
        },2000);
    };
    previewImg.timer=setInterval(function () {
        toRun()
    },2000);
    function toRun() {
        if (previewImgNum==box.length) {
            previewImgNum=0;
        };
        for (var i=0;i<box.length;i++) {
            bufferMove(previewImgLi[i],{
                opacity:0//淡出
            })
        }
        bufferMove(previewImgLi[previewImgNum],{
            opacity:100//淡入
        });
        previewImgNum++;
    }
    function toRotate(obj) {
        obj.num=Math.round(Math.random()*100);
        obj.timer=setInterval(function () {
            obj .style.transform="rotateX("+obj.num+'deg'+") rotateY("+obj.num+'deg'+")";
            obj.num+=Math.round(Math.random()*3);
        },20)
    };

};