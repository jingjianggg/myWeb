$(function () {
    $('.menu1').hover(function () {
        $('.slide').find('span').css('display','none')
    },function () {
        $('.slide').find('span').css('display','block')
    });
    $('.slide').find('span').hover(function () {
        $(this).addClass("active");
    },function () {
        $(this).removeClass("active");
    });
    var container1Time=new Date();
    var newTime=container1Time.getTime()+2*60*60*1000;//获取2小时以后的时间
    var flashTimer=null;
    var t=new Date(newTime);
    var m=t.getMinutes();
    var s=t.getSeconds();
    var $countDown=$('.countDown');
    newTime-= m*60*1000+s*1000;//把当前小时已经发生的分、秒数减掉

    $(".container1Time").html(container1Time.getHours()+":00 场");
    flashTimer=setInterval(function () {
        var iNow=new Date();
        var t=Math.floor((newTime-iNow-m-s)/1000);
        if(t>=0) {
            $countDown.eq(0).html(toTwo(Math.floor(t % 86400 / 3600)));
            $countDown.eq(1).html(toTwo(Math.floor(t % 86400 % 3600 / 60)));
            $countDown.eq(2).html(toTwo(t % 60));
        }
        else{
            clearInterval(flashTimer);
            $countDown.eq(0).html('00');
            $countDown.eq(1).html('00');
            $countDown.eq(2).html('00');
        }
    },1000);
    function toTwo(n) {//统一变成两位数
        return n<10?"0"+n:""+n;
    }
});
window.onload=function () {
      var slideIcon=document.querySelector('.slide_icon');
      var slideIconLi=slideIcon.querySelectorAll('li');
      var slideImg=document.querySelector('.slide_img');
      var slideImgLi=slideImg.querySelectorAll('li');
      var slide=document.querySelector(".slide");
      var toNext=slide.querySelector('.toNext');
      var toPrevious=slide.querySelector('.toPrevious');
      var slideNum=0;
      var slideTimer=null;

      slideTimer=setInterval(toRun,4000);

      for (var i=0;i<slideIconLi.length;i++){
          slideIconLi[i].index=i;
          slideIconLi[i].onclick=function () {
              slideNum=this.index;
              for (var i=0;i<slideIconLi.length;i++) {
                  slideIconLi[i].className='';
                  bufferMove(slideImgLi[i],{
                      opacity:0//淡出
                  },function(){
                      this.style.display='none';
                  })
              }
              this.className='active';
              slideImgLi[this.index].style.display='block';
              bufferMove(slideImgLi[this.index],{
                  opacity:100//淡入
              })
          }
      };

      toNext.onclick=function(){
          clearInterval(slideTimer);
          slideNum++;
          slideImgChange()
      };
      toPrevious.onclick=function(){
          clearInterval(slideTimer);
          slideNum--;
          if (slideNum==-1) {
              slideNum=slideIconLi.length-1;
          }
          slideImgChange()
      };
      //绑定事件利用冒泡捕获
      slide.addEventListener('mouseover',function () {
          clearInterval(slideTimer)
      });
      slide.addEventListener('mouseout',function () {
          slideTimer=setInterval(toRun,4000);
      });


      function toRun() {
          slideNum++;
          slideImgChange()
      }
      function slideImgChange() {
          if(slideNum==slideIconLi.length){
              slideNum=0;
          }
          for (var i=0;i<slideIconLi.length;i++) {
              slideIconLi[i].className='';
              bufferMove(slideImgLi[i],{
                  opacity:0
              },function(){
                  this.style.display='none';
              })
          };
          slideIconLi[slideNum].className='active';
          slideImgLi[slideNum].style.display='block';
          bufferMove(slideImgLi[slideNum],{
              opacity:100
          });
      }
};
