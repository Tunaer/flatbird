
window.onload = function () {

    // let the bird fly
    // move the background repeatably
    // set the rules for touching the top and bottom of the window
    // create pipes for the bird to fly through
    var game = document.getElementById('game');
    var birdEle = document.getElementById('bird');
    var scores = document.getElementById('scores');
    var scoreBoard = document.getElementById('scoreBoard');
    var btn = document.getElementById('btn');
    var finalScore = document.getElementById('finalScore');


    var sky = {
        x: 0
    }
    // 鸟
    var bird = {
        speedX: 5,
        speedY: 0,
        x: birdEle.offsetLeft,
        y: birdEle.offsetTop,
        score: 0,
    }
    // 判断是否结束
    var running = true;
    setInterval(function () {
        if (running) {
            // 移动背景 => 导致视觉效果上是鸟在飞
						// 利用定时器改变背景的x => 使得背景的x左移
            sky.x -= 5;
            game.style.backgroundPositionX = sky.x + 'px';

            bird.speedY += 1;
            bird.y += bird.speedY;

            // 实现小鸟的上下运动
            if (bird.y < 0) {
                running = false;
                bird.y = 0;
            }
            if (bird.y + birdEle.offsetHeight > 600) {
                running = false;
                bird.y = 600 - birdEle.offsetHeight;
                console.log(bird.y)
            }
            birdEle.style.top = bird.y + 'px';
        }

    }, 40)

    document.onclick = function () {
        bird.speedY = -10;
    }
		// 空格
		document.onkeydown = function() {
			if(event.keyCode == 32){
				bird.speedY = -10;
			}
		}

    function createPipe(position) {

        var pipe = {};
        pipe.notCounted = true;
        pipe.x = position;
        pipe.uHeight = parseInt(Math.random() * 100) + 200;
        pipe.bHeight = 600 - pipe.uHeight - 200;
        pipe.bTop = pipe.uHeight + 200;


        var uPipe = document.createElement('div');
        var bPipe = document.createElement('div');
        uPipe.style.width = '52px';
        bPipe.style.width = '52px';
        uPipe.style.height = pipe.uHeight + 'px';
        bPipe.style.height = pipe.bHeight + 'px';
        uPipe.style.background = 'url("./images/pipe2.png") no-repeat center bottom';
        bPipe.style.background = 'url("images/pipe1.png") no-repeat center top';
        uPipe.style.position = 'absolute';
        bPipe.style.position = 'absolute';
        uPipe.style.top = 0;
        bPipe.style.top = pipe.bTop + 'px';
        bPipe.style.left = pipe.x + 'px';
        uPipe.style.left = pipe.x + 'px';
        game.appendChild(uPipe);
        game.appendChild(bPipe);

        // 管道移动

        setInterval(function () {
            if (running) {
                pipe.x -= 2;
                uPipe.style.left = pipe.x + 'px';
                bPipe.style.left = pipe.x + 'px';
                if (pipe.x < 48 && pipe.notCounted) {
                    bird.score += 1;
                    scores.innerText = bird.score;
                    pipe.notCounted = false;
                }
                if (pipe.x < -52) {
                    pipe.x = 947;
                    pipe.notCounted = true;
                }
                var uCheck = bird.x + 34 > pipe.x && bird.x < pipe.x + 52 && bird.y < pipe.uHeight;
                var bCheck = bird.x + 34 > pipe.x && bird.x < pipe.x + 52 && bird.y > pipe.uHeight + 200;
                if (uCheck || bCheck) {
                    running = false;
                }
            } else {
                // 展示最后得分
                scores.style.display = 'none';
                scoreBoard.style.display = 'block';
                finalScore.style.display = 'block';
                finalScore.innerText = 'score:' + bird.score;
                finalScore.style.display = 'block';
                btn.style.display = 'block';
            }
        }, 30)
    }

    btn.onclick = function () {
        document.location.reload(false);
    }
    // createPipe(200);
    createPipe(300);
    createPipe(500);
    createPipe(700);
    createPipe(900);
    createPipe(1100);
}