var canvas = document.getElementById('tetris');
var context = canvas.getContext('2d');


context.scale(20, 20);
var matrix = [
   [0,0,0],
   [1,1,1],
   [0,1,0]
];

 function playerMove(dir){
 	player.pos.x += dir;
 	if(collide(arena , player)){
 		player.pos.x -= dir;
 	}
 }

function draw(){
	context.fillStyle = '#000';
    context.fillRect(0,0,canvas.width,canvas.height);

    drawMatrix(arena , {x : 0, y : 0});
	drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix ,offset){
	matrix.forEach(function(row,y){
	     row.forEach(function(value,x){
	          if(value !== 0){
	          	 context.fillStyle = "red";
	          	 context.fillRect(x +offset.x, 
	          	 	              y + offset.y,
	          	 	              1, 1);
	          }
	     })
	})
}

 var dropCounter = 0;
 var dropInterval = 1000;

 var lastTime = 0;

 function collide(arena , player){
 	var [m,o] = [player.matrix, player.pos];
 	for(var y = 0;y< m.length ; ++y){
 		for(var x =0; x < m[y].length ; x++){
 			if(m[y][x] !== 0 &&
 			   (arena[y + o.y] && arena[y +o.y][x + o.x]) !== 0){
                  return true;
 			}
 		}
 	}
 	return false;
 }

function merge(arena , player){
    player.matrix.forEach(function(row,y){
         row.forEach(function(value ,x){
                if(value !== 0){
                    arena[y + player.pos.y][x + player.pos.x] = value;
                }
         })
    })
}

 var arena = createMatrix(12 , 20);

 function createMatrix(w, h){
     var matrix = [];
     while(h--){
     	matrix.push(new Array(12).fill(0))
     }
     return matrix;
 }

 function playerDrop(){
 	player.pos.y++;
 	if(collide(arena , player)){
 		player.pos.y--;
 		merge(arena, player);
 		player.pos.y = 0;
 	}
    dropCounter = 0;
 }

function update(time = 0){
	var deltaTime =  time - lastTime;
	lastTime = time;
	
	dropCounter += deltaTime;
	if(dropCounter > dropInterval){
		playerDrop();
	}
	draw();
	requestAnimationFrame(update);

}

document.addEventListener('keydown', function(event){
    if(event.keyCode === 37){
    	playerMove(-1);
    }else if(event.keyCode === 39){
         playerMove(1);
    }else if(event.keyCode === 40){
    	 playerDrop();
    }
})

var player = {
	pos : {x: 5,y: 5},
	matrix : matrix
}

update();


