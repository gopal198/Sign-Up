var canvas = document.getElementById('tetris');
var context = canvas.getContext('2d');

context.scale(20,20);
var matrix = [
  [0,0,0],
  [1,1,1],
  [0,1,0]
]
var player = {
  pos : {x : 5, y : 5},
    matrix : matrix
}

var draw = function(){
  context.fillStyle = "#000";
  context.fillRect(0,0,canvas.width,canvas.height);
   
  drawMatrix(arena, {x : 0 , y : 0});
  drawMatrix(player.matrix,player.pos);
}

var createArena = function(w,h){
   var matrix = [];
   while(h--){
     matrix.push(new Array(w).fill(0))
   }
   return matrix;
}

var arena = createArena(12,20);

var drawMatrix = function(a,b){   
   a.forEach(function(row,y){
        row.forEach(function(val,x){
             if(val !== 0){
                  context.fillStyle = "red";
                  context.fillRect(x + b.x,y + b.y,1,1);
             }
        })
   })
}

var collideArena = function(arena , player){
    var [m,o] = [player.matrix,player.pos];
    for(var i=0; i < m.length; i++){
         for(var j=0; j < m[i].length; j++){
              if(m[i][j] !== 0 && (arena[i + o.y] && arena[i + o.y][j + o.x]) !== 0){
                  return true;
              }
         }
    }
    return false;
}

function playerRotate(dir){
    rotate(player.matrix , dir);
}

function rotate(matrix , dir){
    for(var y=0; y < matrix.length; y++){
      for(var x=0; x < y ; x++){
            [
               matrix[x][y],
               matrix[y][x]
            ] = [
                matrix[y][x],
                matrix[x][y]  
             ]
      } 
    }

    if(dir > 0){
        matrix.forEach(function(row){
            row.reverse();
        })
    }else{
       matrix.reverse();
    }
}

var mergeArena = function(arena , player){
   player.matrix.forEach(function(row,y){
      row.forEach(function(val,x){
           if(val !== 0){
                arena[y + player.pos.y][x + player.pos.x] = 1;
           }
      })
   })
}

var dropCounter = 0;
var dropInterval = 1000;
var lastTime = 0;

var playerMove = function(dir){
     player.pos.x += dir;
     if(collideArena(arena,player)){
         player.pos.x -= dir;
     }
}

var playerDrop = function(){
    player.pos.y++;
    if(collideArena(arena , player)){
         player.pos.y--;
         mergeArena(arena , player);
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

document.addEventListener('keydown',function(e){
    if(e.keyCode === 37){
         playerMove(-1);
    }else if(e.keyCode === 39){
         playerMove(1);
    }else if(e.keyCode === 40){
         playerDrop();
    }else if(e.keyCode === 81){
         playerRotate(-1);
    }else if(e.keyCode === 87){
         playerRotate(1);
    }
})

update();