let modal =  document.querySelector('.modal');

function main(difficulty) {
    let WHITE_BLACK_BALL_FILTER_ENABLED = false

    let CANVAS = canvas_example.getContext('2d');
    let CANVAS_WIDTH = canvas_example.width;
    let CANVAS_HEIGHT = canvas_example.height;
    let RADIUS_BALL_DEFAULT = 15;
    let ballsincolumn = CANVAS_HEIGHT / RADIUS_BALL_DEFAULT / 2
    let ballsinrow = CANVAS_WIDTH / RADIUS_BALL_DEFAULT / 2
    let BALL_NUMBER_DEFAULT = 15;
    let SPEED_DEFAULT = 6;
    //настройки шарика-цели: x0 , y0 и радиус
    // todo should be object
    let TARGET_OPTIONS = [CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 20]

    var balls = []

    var dt = 5;
    var sin = 0;
    var cos = 0;
    var dist = 0;
    var DX = 0;
    var DY = 0;
    var time = 0;
    var PLAYER_X = CANVAS_WIDTH;
    var PLAYER_Y = CANVAS_HEIGHT;
    var score = 0;
    var gameover_status = false
    var last_difficulty = 5;

    function create_ball_random_color(i) {
        RED = Math.trunc(256 * Math.random());
        GREEN = Math.trunc(256 * Math.random());
        BLUE = Math.trunc(256 * Math.random());

        if (WHITE_BLACK_BALL_FILTER_ENABLED) {
            var color = `rgb(${RED}, ${RED}, ${RED})`
        } else {
            var color = `rgb(${RED}, ${GREEN}, ${BLUE})`
        }

        var row = Math.trunc(i / ballsinrow) + 1
        vx_r = Math.random() * 0.5
        vy_r = Math.random() * 0.5

        balls[i] = new ball(RADIUS_BALL_DEFAULT + 2 * RADIUS_BALL_DEFAULT * i,
            RADIUS_BALL_DEFAULT + 2 * (RADIUS_BALL_DEFAULT + 10) * i,
            color,
            RADIUS_BALL_DEFAULT,
            vy_r * SPEED_DEFAULT,
            vy_r * SPEED_DEFAULT,
            2);
    }

    function score_point_check() {
        var score_dist = (PLAYER_X - TARGET_OPTIONS[0]) ** 2 + (PLAYER_Y - TARGET_OPTIONS[1]) ** 2
        if (score_dist <= TARGET_OPTIONS[2] ** 2) {

            TARGET_OPTIONS[0] = 50 + Math.random() * 0.9 * CANVAS_WIDTH
            TARGET_OPTIONS[1] = 50 + Math.random() * 0.9 * CANVAS_HEIGHT
            score++
        }
    }


    function render_canvas() {
        CANVAS.canvas.width  = window.innerWidth;
        CANVAS.canvas.height = window.innerHeight;
        CANVAS.clearRect(0, 0, CANVAS_WIDTH*2, CANVAS_HEIGHT);
        CANVAS.beginPath();
        CANVAS.fillStyle = `rgb(255, 215, 0)`;
        CANVAS.arc(TARGET_OPTIONS[0], TARGET_OPTIONS[1], TARGET_OPTIONS[2], 0, 2 * Math.PI);
        CANVAS.fill();
        CANVAS.stroke();
        for (k = 0; k < BALL_NUMBER_DEFAULT; k++) {
            balls[k].draw(CANVAS)
        }
    }

    function collision_check() {
        for (k = 0; k < BALL_NUMBER_DEFAULT; k++) {	//проверка расстояний между всеми шарами
            for (j = 0; j < BALL_NUMBER_DEFAULT; j++) {
                if (k != j) {
                    dist = Math.sqrt((balls[k].x - balls[j].x) * (balls[k].x - balls[j].x) + (balls[k].y - balls[j].y) * (balls[k].y - balls[j].y))
                    if (dist <= 2 * RADIUS_BALL_DEFAULT) {
                        collision(balls[k], balls[j])
                    }
                }
            }
            balls[k].x += balls[k].vx * dt
            balls[k].y += balls[k].vy * dt
            balls[k].away(CANVAS_WIDTH, CANVAS_HEIGHT)
        }
    }

    function collision(ball1, ball2) {
        DX = ball1.x - ball2.x;
        DY = ball1.y - ball2.y;
        sin = DX / dist;
        cos = DY / dist;

        var vn1 = ball1.vx * sin + ball1.vy * cos
        var vn2 = ball2.vx * sin + ball2.vy * cos
        var vt1 = -ball1.vx * cos + ball1.vy * sin
        var vt2 = -ball2.vx * cos + ball2.vy * sin
        vn1 += vn2;
        vn2 = vn1 - vn2;
        vn1 -= vn2;

        time_passed = (2 * RADIUS_BALL_DEFAULT - dist) / (vn1 - vn2)

        ball1.x -= ball1.vx * time_passed
        ball2.x -= ball2.vx * time_passed
        ball1.y -= ball1.vy * time_passed
        ball2.y -= ball2.vy * time_passed


        ball1.vx = vn1 * sin - vt1 * cos
        ball1.vy = vn1 * cos + vt1 * sin
        ball2.vx = vn2 * sin - vt2 * cos
        ball2.vy = vn2 * cos + vt1 * sin
    }

    function gameover_check() {
        for (j = 0; j < BALL_NUMBER_DEFAULT; j++) {
            dist2 = (PLAYER_X - balls[j].x) * (PLAYER_X - balls[j].x) + (PLAYER_Y - balls[j].y) * (PLAYER_Y - balls[j].y)
            if (dist2 <= RADIUS_BALL_DEFAULT * RADIUS_BALL_DEFAULT & gameover_status == false) {
                gameover_status = true;
                for (k = 0; k < BALL_NUMBER_DEFAULT; k++) {
                    balls[k].vy = 0
                    balls[k].vx = 0
                    GameEnd();
                   
                }
            }
        }
    }

    function control() {
        gameover_check();
        if (gameover_status == false) {
            canvas_example.onmousemove = (e) => {
                PLAYER_X = e.offsetX
                PLAYER_Y = e.offsetY
            }
            time += 0.02
            score_point_check();
            collision_check();
            render_canvas();
        }
    }

    function start_game_with_options(difficulty) {

        document.querySelector('#start-game').onclick = () => {
            time = 0;
            score = 0;
            gameover_status = false;

            let difficulty = document.querySelector('#difficulty');  
            difficulty = difficulty.options[difficulty.selectedIndex].value;
            last_difficulty = difficulty

            // TARGET_OPTIONS[2] = 20 * difficulty / 5
            SPEED_DEFAULT = difficulty * 1.2
            BALL_NUMBER_DEFAULT = 1.5 * difficulty

            for (i = 0; i < BALL_NUMBER_DEFAULT; i++) {
                create_ball_random_color(i)
            }
        }
        for (i = 0; i < BALL_NUMBER_DEFAULT; i++) {
            create_ball_random_color(i)
        }

        // запуск функций каждые n мс
        setInterval(control, 20)
    }

    start_game_with_options(difficulty);

    function GameEnd(){

        modal.style.display='flex';
        let result = score;

   
      if(Number(localStorage.getItem(userName+'2'))<Math.round(result)){
        saveScore(userName,Math.round(result),2);
      }

    modalContent.querySelector('.modal-content-text').innerHTML=`
  <p>Результат ${Math.round(result)} </p>
  `;
    }
}
