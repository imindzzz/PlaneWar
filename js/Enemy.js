function Enemy(x,type){
  switch (type) {
    case 3:
      Base.call(this,x,-164,164,110,'img/3.png','img/3bomb.gif',1,40);
      break;
    case 2:
      Base.call(this,x,-60,60,46,'img/2.png','img/2bomb.gif',2,20);
      break;
    case 1:
      Base.call(this,x,-24,24,34,'img/1.png','img/1bomb.gif',3,10);
      break;
    default:

  }
  this.type = type;
  this.init();
  this.$instance.addClass('enemy');
}
