function initCanvas(){
    var canvas = $('#canvas')[0];
    var context = canvas.getContext('2d');
    
    return {'canvas': canvas, 'context': context};
}

$(document).ready(function(){
    //getting the canvas object and the context
    var c = initCanvas();
    
    board.initBoard(c.canvas, c.context);
    
    var k = new Kibo();
    
    c.context.fillStyle = 'rgba(0,0,0, .4)';
    c.context.fillRect(board.squars[0][0].x, board.squars[0][0].y, board.squars[0][0].width, board.squars[0][0].height);
    var i = 0, j=0;
    
    var initialSquare = {'i': -1,'j': -1};
    var clickedSquare, previousSquare;
    clickedSquare = previousSquare = initialSquare;
    var ck = 0;
    
    k.down('enter', function(){
        ck++;
        previousSquare = clickedSquare;
        clickedSquare = {'i': i, 'j': j};
        
        if(previousSquare !== clickedSquare && previousSquare !== initialSquare && ck === 2 && board.squars[previousSquare.j][previousSquare.i].pieceID !== -1){
            board.squars[clickedSquare.j][clickedSquare.i].pieceID = board.squars[previousSquare.j][previousSquare.i].pieceID;
            board.squars[previousSquare.j][previousSquare.i].pieceID = -1;
            square.fillsquare(previousSquare.j, previousSquare.i, c.context, false);
            square.fillsquare(clickedSquare.j, clickedSquare.i, c.context, false);
            clickedSquare = previousSquare = initialSquare;
            ck = 0;
        }
    });
    
    k.down('up', function(){
        if(j > 0){
            j--;
            if(j<8)
                square.fillsquare(j+1, i, c.context, false);

            c.context.fillStyle = 'rgba(0,0,0, .4)';
            c.context.fillRect(board.squars[j][i].x, board.squars[j][i].y, board.squars[j][i].width, board.squars[j][i].height);
        }
    });
    
    k.down('down', function(){
        if(j < 7){
            j++;
            if(j>0)
                square.fillsquare(j-1, i, c.context, false);

            c.context.fillStyle = 'rgba(0,0,0, .4)';
            c.context.fillRect(board.squars[j][i].x, board.squars[j][i].y, board.squars[j][i].width, board.squars[j][i].height);
        }
    });
    
    k.down('right', function(){
        if(i < 7){
            i++;
            if(i>0)
                square.fillsquare(j, i-1, c.context, false);

            c.context.fillStyle = 'rgba(0,0,0, .4)';
            c.context.fillRect(board.squars[j][i].x, board.squars[j][i].y, board.squars[j][i].width, board.squars[j][i].height);
        }else if(j < 7){
            square.fillsquare(j, i, c.context, false);
            j++;
            i=0;
            c.context.fillStyle = 'rgba(0,0,0, .4)';
            c.context.fillRect(board.squars[j][i].x, board.squars[j][i].y, board.squars[j][i].width, board.squars[j][i].height);
        }
    });
    
    k.down('left', function(){
        if(i>0){
            i--;
            if(i<8)
                square.fillsquare(j, i+1, c.context, false);

            c.context.fillStyle = 'rgba(0,0,0, .4)';
            c.context.fillRect(board.squars[j][i].x, board.squars[j][i].y, board.squars[j][i].width, board.squars[j][i].height);
        }else if(j > 0){
            square.fillsquare(j, i, c.context, false);
            j--;
            i=7;
            c.context.fillStyle = 'rgba(0,0,0, .4)';
            c.context.fillRect(board.squars[j][i].x, board.squars[j][i].y, board.squars[j][i].width, board.squars[j][i].height);
        }
    });
    
    /*var clickedSquare, previousSquare;
    
    $('#canvas').mousedown(function(e){
        previousSquare = clickedSquare;
        clickedSquare = getClickedSquare(e.offsetX, e.offsetY, c.canvas);
        
        
        fillsquare(previousSquare.row, previousSquare.col, c.context, false);
        c.context.fillStyle = 'rgba(0,0,0, .4)';
        c.context.fillRect(clickedSquare.col, clickedSquare.row, board.squars[clickedSquare.row][clickedSquare.col].width, board.squars[clickedSquare.row][clickedSquare.col].height);
        
        if(previousSquare !== clickedSquare){
            if(board.squars[previousSquare.row][previousSquare.col].pieceID != -1){
                console.log(board.pieces[board.squars[previousSquare.row][previousSquare.col].pieceID].src);
            }
        }
        console.log(e.offsetX, e.offsetY);
        console.log(getClickedSquare(e.offsetX, e.offsetY, c.canvas));
    
    });*/
    
    
    //requestAnimationFrame();
});