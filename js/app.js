// (function(){
//   var score = 0;
//
//   //敌方
//   var enemys = [];
//   //敌方创建
//   setInterval(function(){
//     var enemy;
//     var x = Math.round(Math.random() * 100000) % $('.app').width();
//     switch (Math.round(Math.random() * 100) % 10) {
//       case 9:
//         enemy = new Enemy(x,3);
//         break;
//       case 8:
//       case 7:
//       case 6:
//         enemy = new Enemy(x,2);
//         break;
//       default:
//         enemy = new Enemy(x,1);
//     };
//     enemys.push(enemy);
//     $('.app').append(enemy.$instance);
//   },1000);
//   //敌方移动
//   setInterval(function(){
//     enemys = enemys.filter(function(enemy){
//       enemy.move();
//       if(enemy.y >= $('.app').height() || enemy.isDead()){
//         enemy.destroy();
//         return false;
//       }
//       return true;
//     });
//   },30);
//
//   //我方创建
//   var human = new Human($('.app').width()/2-33,$('.app').height()-80);
//   $('.app').append(human.$instance);
//   //我方移动
//   $(document).on('mousemove',function(event){
//     this.move(event.pageX-this.h/2,event.pageY-this.w/2);
//   }.bind(human));
//
//   //子弹创建
//   setInterval(function(){
//     var bullet = new Bullet(human);
//     human.bullets.push(bullet);
//     $('.app').append(bullet.$instance);
//   },50);
//   //子弹移动
//   setInterval(function(){
//     human.bullets = human.bullets.filter(function(bullet){
//       bullet.move();
//       if(bullet.y <= 0 || bullet.isDead()){
//         bullet.destroy();
//         return false;
//       }
//       return true;
//     });
//   },10);
//
//
//   //子弹与敌方飞机碰撞检测
//   setInterval(function () {
//     human.bullets.forEach(function(bullet){
//       enemys.forEach(function(enemy){
//         // console.log(Utils.collide(bullet,enemy));
//         // debugger;
//         if(Utils.collide(bullet,enemy)){
//           enemy.hp--;
//           bullet.hp--;
//           if(enemy.isDead()){
//             score += enemy.type * 100;
//             $('.score').html('得分:'+score);
//           }
//         }
//       });
//     },300);
//
//     //TODO 我方与敌方飞机碰撞检测
//   });
//
//
// })();
