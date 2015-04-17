//基础类
function plane() {
		var obj = new Object();
		obj.x = 0; //左上角x轴
		obj.y = 0; //左上角y轴
		obj.height = 10; //高度
		obj.width = 10; //宽度
		obj.img = ""; //外形图片
		obj.imgbomb = "";
		obj.hp = 1; //血量
		obj.speed = 3; //移动速度
		obj.id = ""; //
		obj.type;
		obj.init = function() {
			this.id = Math.round(Math.random() * 10000000000000);
			var $mainDiv = $("#mainDiv");
			//在页面添加一个飞机 div
			var content = "<div class ='plane' id ='" + this.id + "'></div>";
			$mainDiv.append(content);

			//在3种飞机中随机选择并设置外形
			switch (Math.round(Math.random() * 100) % 10) {
				case 9:
					obj.type = '3';
					obj.height = 164;
					obj.width = 110;
					obj.speed = 1;
					obj.hp = 40;
					obj.img = "img/3.png";
					obj.imgbomb = "img/3bomb.gif";
					break;
				case 8:
				case 7:
				case 6:
					obj.type = '2';
					obj.height = 60;
					obj.width = 46;
					obj.speed = 2;
					obj.hp = 20;
					obj.img = "img/2.png";
					obj.imgbomb = "img/2bomb.gif";
					break;
				default:
					obj.type = '1';
					obj.height = 24;
					obj.width = 34;
					obj.speed = 3;
					obj.hp = 10;
					obj.img = "img/1.png";
					obj.imgbomb = "img/1bomb.gif";
			}
			obj.y = -obj.height;
			this.refresh();
		};
		obj.isDead = function() {
			//检测是否超出边界，如果超出边界当做死亡处理
			if (obj.y >= 568) return true;
			if (obj.hp <= 0) return true;
			return false;
		};
		//检测碰撞
		obj.collide = function(tag) {
			if (tag.isDead() || obj.isDead()) {
				return false;
			}
			if (tag.x <= obj.x + obj.width && tag.x >= obj.x && tag.y <= obj.y + obj.height && tag.y >= obj.y) {
				obj.hp = obj.hp - 1;
				tag.hp = tag.hp - 1;
				return true;
			}
			if (obj.x <= tag.x + tag.width && obj.x >= tag.x && obj.y <= tag.y + tag.height && obj.y >= tag.y) {
				obj.hp = obj.hp - 1;
				tag.hp = tag.hp - 1;
				return true;
			}
			return false;
		};
		//更新试图
		obj.refresh = function() {
			if (obj.id == "") {
				obj.init();
			}
			//TODO 刷新
			var $obj = $("#" + obj.id);
			$obj.css("left", obj.x + "px");
			$obj.css("top", obj.y + "px");
			$obj.css("width", obj.width);
			$obj.css("height", obj.height);
			$obj.css("background-image", "url(" + obj.img + ")");

			if (obj.isDead()) {
				obj.destroy();
			}
		};
		//移动
		obj.move = function() {
			obj.y = obj.y + obj.speed;
			obj.refresh();
		};
		//摧毁，死亡动画
		obj.destroy = function() {
			obj.speed = 0;
			//动画
			obj.img = obj.imgbomb;
			var $obj = $("#" + obj.id);
			setTimeout(function() {
				$obj.remove();
			}, 1000);
		};
		return obj;
	}
	//子弹

//敌方飞机
function enemy() {
		var obj = plane();
		obj.x = Math.round(Math.random() * 1000000) % (320 - obj.width);
		return obj;
	}
	// 子弹，也当作是planee

function bullet(human) {
		var obj = plane();
		obj.init = function() {
			this.id = Math.round(Math.random() * 10000000000000);
			var $mainDiv = $("#mainDiv");
			//在页面添加一个 div
			var content = "<div class ='bullet' id ='" + this.id + "'></div>";
			$mainDiv.append(content);

			//设置外形
			obj.type = 'bullet';
			obj.bullet = bullet();
			obj.height = 14;
			obj.width = 6;
			obj.speed = 20;
			obj.hp = 1;
			obj.img = "img/bullet.png";
			obj.imgbomb = "img/bullet.png";
			obj.x = human.x + human.width / 2 - 2;
			obj.y = human.y - 10;

			obj.refresh();
		};
		obj.isDead = function() {
			if (obj.y < -obj.height) return true;
			if (obj.hp <= 0) return true;
			return false;
		};
		obj.move = function() {
			obj.y = obj.y - obj.speed;
			obj.refresh();
		};
		obj.destroy = function() {
			var $obj = $("#" + obj.id);
			$obj.remove();
		};
		return obj;
	}
	//我方飞机

function human() {
	var obj = plane();
	obj.bullets = new Array();
	obj.init = function() {
		obj.id = +Math.round(Math.random() * 10000000000000);
		var $mainDiv = $("#mainDiv");
		//在页面添加一个我方飞机 div
		var content = "<div class ='human' id ='" + this.id + "'></div>";
		$mainDiv.append(content);

		//给我方飞机绑定鼠标移动事件
		$mainDiv.mousemove(obj.move);

		//设置外形
		obj.type = 'human';
		obj.bullet = bullet();
		obj.height = 80;
		obj.width = 66;
		obj.speed = 1;
		obj.hp = 1;
		obj.img = "img/human.gif";
		obj.imgbomb = "img/humanbomb.gif";
		obj.x = (320 - obj.width) / 2;
		obj.y = 568 - obj.height;
		obj.refresh();
	};
	obj.isDead = function() {
		//if (obj.y <= 0) return true;
		if (obj.hp <= 0) return true;
		return false;
	};
	obj.move = function(event) {
		obj.x = event.pageX - obj.height / 2;
		obj.y = event.pageY - obj.width / 2;
		obj.refresh();
	};
	return obj;
}