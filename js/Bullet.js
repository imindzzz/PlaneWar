function Bullet(human) {
  Base.call(this,human.x + human.w / 2 - 2,human.y - 10,14,6,'img/bullet.png','img/bullet.png',5,1);
  this.move = function(){
    this.y -= this.speed;
    this.refresh();
  };
  this.destroy = function(){
    this.$instance.remove();
  }
  this.init();
  this.$instance.addClass('bullet');
}
