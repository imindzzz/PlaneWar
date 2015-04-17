function game() {

	var score = 0;
	var state = 'go'
	var my = human(); // 我方飞机
	my.init();
	//子弹工厂,定时产生子弹
	var bulletFactory = setInterval(function() {
		var temp = bullet(my);
		temp.init();
		if (my.bullets.length < 50) {
			my.bullets[my.bullets.length] = temp;
		} else {
			$.each(my.bullets, function(i, n) {
				if (n.isDead()) {
					my.bullets[i].destroy();
					delete my.bullets[i];
					my.bullets[i] = temp;
					return false;
				}
			});
		}
	}, 40);


	var enemys = new Array();
	//敌方飞机工厂，定时产生敌方飞机
	var enemyFactory = setInterval(function() {
		var temp = enemy();
		temp.init();
		if (enemys.length < 15) {
			enemys[enemys.length] = temp;
		} else {
			$.each(enemys, function(i, n) {
				if (n.isDead()) {
					enemys[i].destroy();
					delete enemys[i];
					enemys[i] = temp;
					return false;
				}
			});
		}
	}, 700);

	//页面循环刷新
	var timer = setInterval(function() {
		//敌方飞机更新
		$.each(enemys, function(i, enemy) {
			enemy.move();
		});
		//子弹更新
		$.each(my.bullets, function(i, bullet) {
			bullet.move();
		});

		//碰撞检测
		//子弹和敌方飞机碰撞检测
		$.each(my.bullets, function(i, bullet) {
			$.each(enemys, function(i, enemy) {
				if (bullet.collide(enemy) == true && enemy.isDead()) {
					bullet.destroy();
					enemy.destroy();
					switch (enemy.type) {
						case '1':
							score = score + 100;
							break;
						case '2':
							score = score + 200;
							break;
						case '3':
							score = score + 400;
							break;
						default:
							score = score + 10;
					}
				}
			});
		});
		//我方飞机和敌方飞机碰撞检测
		$.each(enemys, function(i, enemy) {
			if (my.collide(enemy) == true) {
				location.reload()
			}

		});

		//更新积分榜
		$("#score").val("分数:" + score);
	}, 30);

};
$(function() {
	game();
});