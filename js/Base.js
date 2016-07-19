function Base(x,y,h,w,img,imgbomb,speed,hp){
  this.id = Utils.generateId();
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  this.speed = speed;
  this.hp = hp;
  this.img = img;
  this.imgbomb = imgbomb;
  this.$instance = null;

  //初始化
  this.init = function() {
    var $instance = $("<div class ='base' id ='" + this.id + "'></div>");
    $instance.css({
      width:this.w+'px',
      height:this.h+'px',
      top:this.y + 'px',
      left:this.x + 'px',
      backgroundImage:"url(" + this.img + ")"
    });
    this.$instance = $instance;
  };
  //判断死亡
  this.isDead = function(){
    if (this.hp <= 0) return true;
    return false;
  }
  //更新视图
  this.refresh = function() {
    if (!this.$instance) {
      this.init();
    }
    this.$instance.css({
      left:this.x + 'px',
      top:this.y + 'px'
    });

    // if (this.isDead()) {
    //   this.destroy();
    // }
  };

  //移动
  this.move = function() {
    this.y += this.speed;
    this.refresh();
  };
  //销毁
  this.destroy = function() {
    this.speed = 0;
    this.$instance.css({
      backgroundImage:"url(" + this.imgbomb + ")"
    })
    setTimeout(function() {
      this.$instance.remove();
    }.bind(this), 1000);
  };
}
