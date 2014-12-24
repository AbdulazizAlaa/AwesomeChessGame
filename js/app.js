function loadImage(src, onLoad){
    
    var image = new Image();
    image.src = src;
    image.onload = onLoad;
    
    return image;
}

var pieceSrc = 
    {
        'white': 
            {
                'king': 'images/pieces/king_white.png',
                'queen': 'images/pieces/queen_white.png',
                'bishop': 'images/pieces/bishop_white.png',
                'knight': 'images/pieces/knight_white.png',
                'rook': 'images/pieces/rook_white.png',
                'pawn': 'images/pieces/pawn_white.png'
            },
        'black': 
            {
                'king': 'images/pieces/king_black.png',
                'queen': 'images/pieces/queen_black.png',
                'bishop': 'images/pieces/bishop_black.png',
                'knight': 'images/pieces/knight_black.png',
                'rook': 'images/pieces/rook_black.png',
                'pawn': 'images/pieces/pawn_black.png'
            }
    };

var piece = function(side, src, x, y, width, height, onLoad){
    return {'side': side, 'src': src, 'image': loadImage(src, onLoad), 'x': x, 'y': y, 'width': width, 'height': height};
};


var square = function(side, color, pieceID, x, y, width, height){
    return {'side': side, 'color': color, 'pieceID': pieceID, 'x': x, 'y': y, 'width': width, 'height': height};
};

var board = {'squars': []};

board.initBoard = 
    function(canvas, context){

                //board related variables
                var isOddRow = true;
                var isOddCol = true;
                var x, y, width, height;
                x = y = 0;
                width = canvas.width/8;
                height = canvas.height/8;

                //construct board array of squares
                for(var i=0 ; i<8 ; i++){
                    //create a row in the array of squares
                    board.squars[i] = [];
                    //populating the row in the array of squares
                    for(var j=0 ; j<8 ; j++){
                        if(j===0){
                            if(isOddRow){
                                isOddCol = true;
                            }else{
                                isOddCol = false;
                            }
                        }
                        if(isOddCol){
                            //white square
                            board.squars[i][j] = square('white', '#119DA4', -1, x, y, width, height);
                        }else{
                            //black square
                            board.squars[i][j] = square('black', '#0C7489', -1, x, y, width, height);
                        }
                        isOddCol = !isOddCol;
                        x += width;
                    }
                    isOddRow = !isOddRow;
                    x = 0;
                    y += height;
                }

                //make board squares
                for(var i=0 ; i<8 ; i++){
                    for(var j=0 ; j<8 ; j++){
                        context.fillStyle = board.squars[i][j].color;
                        context.fillRect(board.squars[i][j].x, board.squars[i][j].y, board.squars[i][j].width, board.squars[i][j].height);
                    }
                }

                //make board border
                context.beginPath();
                context.strokeStyle = "black";
                context.moveTo(0,0);
                context.lineTo(canvas.width, 0);
                context.lineTo(canvas.width, canvas.height);
                context.lineTo(0, canvas.height);
                context.lineTo(0, 0);                    
                context.stroke();

    };

function initCanvas(){
    var canvas = $('#canvas')[0];
    var context = canvas.getContext('2d');
    
    return {'canvas': canvas, 'context': context};
}

$(document).ready(function(){
    //getting the canvas object and the context
    var c = initCanvas();
   // var board = board();
    board.initBoard(c.canvas, c.context);
    

});