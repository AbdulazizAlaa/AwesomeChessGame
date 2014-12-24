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

var board = {'squars': [], 'pieces': []};

board.initBoard = 
    function(canvas, context){

                //board related variables
                var isOddRow = true;
                var isOddCol = true;
                var x, y, squareWidth, squareHeight;
                x = y = 0;
                squareWidth = canvas.width/8;
                squareHeight = canvas.height/8;

                var pSide, pSrc, pWidth = 20, pHeight = 50;
                
                /*var p = 
                    [
                        piece(pSide, pieceSrc.white.rook, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.white.knight, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.white.bishop, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.white.queen, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.white.king, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.white.bishop, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.white.knight, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.white.rook, 0, 0, pWidth, pHeight),
                        
                        piece(pSide, pieceSrc.black.rook, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.black.knight, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.black.bishop, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.black.queen, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.black.king, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.black.bishop, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.black.knight, 0, 0, pWidth, pHeight),
                        piece(pSide, pieceSrc.black.rook, 0, 0, pWidth, pHeight)
                    ];
                board.pieces = p;*/
                //white pieces
                pSide = 'white';
                board.pieces.push(piece(pSide, pieceSrc.white.rook, 0, 0, pWidth, pHeight));
                board.pieces.push(piece(pSide, pieceSrc.white.knight, 0, 0, pWidth, pHeight));
                board.pieces.push(piece(pSide, pieceSrc.white.bishop, 0, 0, pWidth, pHeight));
                
                board.pieces.push(piece(pSide, pieceSrc.white.queen, 0, 0, pWidth, pHeight));
                board.pieces.push(piece(pSide, pieceSrc.white.king, 0, 0, pWidth, pHeight));
                
                board.pieces.push(piece(pSide, pieceSrc.white.bishop, 0, 0, pWidth, pHeight));
                board.pieces.push(piece(pSide, pieceSrc.white.knight, 0, 0, pWidth, pHeight));
                board.pieces.push(piece(pSide, pieceSrc.white.rook, 0, 0, pWidth, pHeight));
    
                for(var i=0 ; i<8 ; i++){
                    board.pieces.push(piece(pSide, pieceSrc.white.pawn, 0, 0, pWidth, pHeight));
                }
    
                //black pieces
                pSide = 'black';
                board.pieces.push(piece(pSide, pieceSrc.black.rook, 0, 0, pWidth, pHeight));
                board.pieces.push(piece(pSide, pieceSrc.black.bishop, 0, 0, pWidth, pHeight));
                board.pieces.push(piece(pSide, pieceSrc.black.knight, 0, 0, pWidth, pHeight));
                
                board.pieces.push(piece(pSide, pieceSrc.black.king, 0, 0, pWidth, pHeight));
                board.pieces.push(piece(pSide, pieceSrc.black.queen, 0, 0, pWidth, pHeight));   
                
                board.pieces.push(piece(pSide, pieceSrc.black.bishop, 0, 0, pWidth, pHeight));
                board.pieces.push(piece(pSide, pieceSrc.black.knight, 0, 0, pWidth, pHeight));
                board.pieces.push(piece(pSide, pieceSrc.black.rook, 0, 0, pWidth, pHeight));
    
                for(var i=0 ; i<8 ; i++){
                    board.pieces.push(piece(pSide, pieceSrc.black.pawn, 0, 0, pWidth, pHeight));
                }

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
                            board.squars[i][j] = square('white', '#119DA4', -1, x, y, squareWidth, squareHeight);
                        }else{
                            //black square
                            board.squars[i][j] = square('black', '#0C7489', -1, x, y, squareWidth, squareHeight);
                        }
                        isOddCol = !isOddCol;
                        x += squareWidth;
                    }
                    isOddRow = !isOddRow;
                    x = 0;
                    y += squareHeight;
                }

               // console.log(board.squars);
                //console.log(board.pieces);
    
                //placing chess pieces on squares logically
                for(var i=0 ; i<2 ; i++){
                    for(var j=0 ; j<8 ; j++){
                        board.squars[i][j].pieceID = j+i*j;
                        board.squars[6+i*1][j].pieceID = j+16+i*8;
                    }
                }
    
                //make board squares
                for(var i=0 ; i<8 ; i++){
                    for(var j=0 ; j<8 ; j++){
                        
                        var s = board.squars[i][j];                       
                        context.fillStyle = s.color;
                        context.fillRect(s.x, s.y, s.width, s.height);
                        
                        if(s.pieceID !== -1){
                            board.pieces[s.pieceID].x = s.x;
                            board.pieces[s.pieceID].y = s.y;
                            
                            console.log(s.x, s.y);
                            var p = board.pieces[s.pieceID];
                            console.log(p.x, p.y);
                            p.image.onload = 
                                function(){
                                    console.log(this.x, this.y);
                                    context.drawImage(this, p.x, p.y, p.width, p.height); 
                                };
                        }
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