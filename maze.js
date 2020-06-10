function game(){
    var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };
    var canvas = document.createElement("canvas");
    var width = 560;
    var height = 720;
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = "1px solid";
    var context = canvas.getContext('2d');
    var keysDown = {};

    var bomb = new Bomb(200,200);
    var maze = new Maze();
    var player = new Player(240,240);

    var render = function () {
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, width, height);
        
        //Place Render Code Call Here
        maze.render();
        bomb.render();
        player.render();
    };

    var update = function () {
        //updates item location, for animated items
        player.update();
        bomb.update();
        //computer.update(ball);
        //ball.update(player.paddle, computer.paddle);
    };

    var step = function () {
        update();
        render();
        animate(step);
    };

    function Maze(){

    }

    Maze.prototype.render = function(){
        
        context.fillStyle="#030303";
        context.fillRect(40 , 40, 40, 40);
        context.fillStyle="#030303";
        context.fillRect(40 , 480, 40, 40);
        context.fillStyle="#030303";
        context.fillRect(480 , 40, 40, 40);
        context.fillStyle="#030303";
        context.fillRect(480, 480, 40, 40);

        context.fillStyle="#228B22";
        context.fillRect(80 , 40, 400, 40);
        context.fillStyle="#228B22";
        context.fillRect(80 , 480, 400, 40);
        context.fillStyle="#228B22";
        context.fillRect(40 , 80, 40, 400);
        context.fillStyle="#228B22";
        context.fillRect(480 , 80, 40, 400);


        for (i = 40; i<=520; i+=40){
            context.moveTo(40,i);
            context.lineTo(520,i);
            context.stroke();
        }

        //Draw Columns
        for (i = 40; i<=520; i+=40){
            context.moveTo(i,40);
            context.lineTo(i,520);
            context.stroke();
        }
    }


    function Bomb(x,y){
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;

        function getLocationX(){
            return this.x;
        }
        function getLocationY(){
            return this.y;
        }
    }

    Bomb.prototype.render = function(){
        context.fillStyle ="#FF0000";
        context.fillRect(this.x, this.y, this.width, this.height);


    }

    Bomb.prototype.update = function(){

    }


    function Character(x, y){
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.tokens = 5;
    }

    Character.prototype.render = function(){
        context.fillStyle="#00CCCC";
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    Character.prototype.move = function (x, y) {        
        this.x += x;
        this.y += y;
        this.x_speed = x;
        this.y_speed = y;
        
        if(this.x - bomb.getLocationX == 0){
            if(this.y - bomb.getLocationY == 0){
                this.tokens -= 1;
                alert("hit")
            }
        }

        //alert(bomb.getLocationX);

        if(this.x < 40){
            this.x = 40;
            this.x_speed = 0;
        }
        else if(this.x + this.width > 520){
            this.x = 520 - this.width;
            this.x_speed = 0;
        }

        if (this.y < 40) {
            this.y = 40;
            this.y_speed = 0;
        } else if (this.y + this.height > 520) {
            this.y = 520 - this.height;
            this.y_speed = 0;
        }
         
    };

    function Player() {
        this.character = new Character(240, 240);
    }

    Player.prototype.render = function () {
        this.character.render();
    };

    Player.prototype.update = function () {
        for (var key in keysDown) {
            var value = Number(key);
            if (value == 65) //a
            {
                this.character.move(-40, 0);
            }
            else if (value == 68)//d 
            {
                this.character.move(40, 0);
            }
            else if (value == 87) //w
            {
                this.character.move(0, -40);
            } 
            else if (value == 83) //s
            {
                this.character.move(0,40);
            } 
            else {
                this.character.move(0,0);
            }
        }
    };



    document.body.appendChild(canvas);
    animate(step);

    window.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true;
    });
    
    window.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];
    });
    
}