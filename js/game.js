function initCanvas(){
    var canvas = $('#canvas')[0];
    var context = canvas.getContext('2d');
    
    return {'canvas': canvas, 'context': context};
}

$(document).ready(function(){
    //getting the canvas object and the context
    var c = initCanvas();
    
    var board = new Board(c.canvas.width/8, c.canvas.height/8);
    board.initBoard(c.canvas, c.context);
    
    var k = new Kibo();
    
    var i = 0, j=0;
    
    var initialSquare = {'i': -1,'j': -1};
    var clickedSquare, previousSquare;
    clickedSquare = previousSquare = initialSquare;
    var ck = 0;
    
    k.down('enter', function(){
        ck++;
        previousSquare = clickedSquare;
        clickedSquare = {'i': i, 'j': j};
        
        if(previousSquare !== clickedSquare && previousSquare !== initialSquare && ck === 2 && board.squares[previousSquare.j][previousSquare.i].pieceID !== -1){
            board.squares[clickedSquare.j][clickedSquare.i].pieceID = board.squares[previousSquare.j][previousSquare.i].pieceID;
            board.squares[previousSquare.j][previousSquare.i].pieceID = -1;
            
            board.squares[clickedSquare.j][clickedSquare.i].fillSquare(board, c.context, false);
            board.squares[previousSquare.j][previousSquare.i].fillSquare(board, c.context, false);
            
            clickedSquare = previousSquare = initialSquare;
            ck = 0;
        }
    });
    
    k.down('up', function(){
        if(j > 0){
            j--;
            if(j<8)
                board.squares[j+1][i].fillSquare(board, c.context, false);
            
            board.squares[j][i].selectSquare(c.context);
        }
    });
    
    k.down('down', function(){
        if(j < 7){
            j++;
            if(j>0)
                board.squares[j-1][i].fillSquare(board, c.context, false);
                
            board.squares[j][i].selectSquare(c.context);
        }
    });
    
    k.down('right', function(){
        if(i < 7){
            i++;
            if(i>0)
                board.squares[ j][i-1].fillSquare(board, c.context, false);
            
             board.squares[j][i].selectSquare(c.context);   
        }else if(j < 7){
            board.squares[j][i].fillSquare(board, c.context, false);
            
            j++;
            i=0;
            
            board.squares[j][i].selectSquare(c.context);
        }
    });
    
    k.down('left', function(){
        if(i>0){
            i--;
            if(i<8)
                board.squares[j][i+1].fillSquare(board, c.context, false);
                
            board.squares[j][i].selectSquare(c.context);
        }else if(j > 0){
            board.squares[j][i].fillSquare(board, c.context, false);
            
            j--;
            i=7;
            
            board.squares[j][i].selectSquare(c.context);
        }
    });
    
    /*var clickedSquare, previousSquare;
    
    $('#canvas').mousedown(function(e){
        previousSquare = clickedSquare;
        clickedSquare = getClickedSquare(e.offsetX, e.offsetY, c.canvas);
        
        
        fillsquare(previousSquare.row, previousSquare.col, c.context, false);
        c.context.fillStyle = 'rgba(0,0,0, .4)';
        c.context.fillRect(clickedSquare.col, clickedSquare.row, board.squares[clickedSquare.row][clickedSquare.col].width, board.squares[clickedSquare.row][clickedSquare.col].height);
        
        if(previousSquare !== clickedSquare){
            if(board.squares[previousSquare.row][previousSquare.col].pieceID != -1){
                console.log(board.pieces[board.squares[previousSquare.row][previousSquare.col].pieceID].src);
            }
        }
        console.log(e.offsetX, e.offsetY);
        console.log(getClickedSquare(e.offsetX, e.offsetY, c.canvas));
    
    });*/
    
    
    //requestAnimationFrame();
});