/*function getRect(obj) {
    return obj.getBoundingClientRect();
}
function collision(obj1,obj2) {
    var obj1Rect=getRect(obj1);
    var obj2Rect=getRect(obj2);
    //获取top.left
    var obj1Left=obj1Rect.left;
    var obj1Right=obj1Rect.right;
    var obj1Top=obj1Rect.top;
    var obj1Bottom=obj1Rect.bottom;

    var obj2Left=obj2Rect.left;
    var obj2Right=obj2Rect.right;
    var obj2Top=obj2Rect.top;
    var obj2Bottom=obj2Rect.bottom;
    //碰撞返回true,否则返回false
    if(
        obj1Right<obj2Left||obj1Left>obj2Right||obj1Bottom<obj2Top||obj1Top>obj2Bottom
    ){
        return false;
    }else{
        return true;
    }
}*/
function collision(obj1,obj2){
  var L1=obj1.offsetLeft;
  var R1=obj1.offsetLeft+obj1.offsetWidth;
  var T1=obj1.offsetTop;
  var B1=obj1.offsetTop+obj1.offsetHeight;

  var L2=obj2.offsetLeft;
  var R2=obj2.offsetLeft+obj2.offsetWidth;
  var T2=obj2.offsetTop;
  var B2=obj2.offsetTop+obj2.offsetHeight;

  if (R1<L2||L1>R2||B1<T2||T1>B2){
      return false;
  }
  else{
      return true;
  };
};
