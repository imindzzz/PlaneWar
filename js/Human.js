function Human(x,y) {
  Base.call(this,x,y,80,66,'img/human.gif','img/humanbomb.gif',1,1);
  this.bullets  = [];
  this.move = function(x,y){
    this.x = x;
    this.y = y;
    this.refresh();
  };
  this.init();
  this.$instance.addClass('human');
}
