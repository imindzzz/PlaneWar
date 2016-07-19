var Utils = {
  //是否重叠
  generateId:function(){
    return Math.floor(Math.random() * 10000000000000+Date.now()).toString(36);
  },
  //时候相撞
  collide:function(a,b){
    if (a.isDead() || b.isDead()) {
      return false;
    }
    if (a.x <= b.x + b.w && a.x >= b.x && a.y <= b.y + b.h && a.y >= b.y) {
      return true;
    }
    if (b.x <= a.x + a.w && b.x >= a.x && b.y <= a.y + a.h && b.y >= a.y) {
      return true;
    }
    return false;
  }
};
