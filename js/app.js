function loadImage(src, onLoad){
    
    var image = new Image();
    image.src = src;
    image.onload = onLoad;
    
    return image;
}


function createBoard(w, h){
    var sq = [];
    var isOddRow = true;
    var isOddCol = true;
    var x, y;
    x = y = 0;
    //construct board array of squares
    for(var i=0 ; i<8 ; i++){
        //create a row in the array of squares
        sq[i] = [];
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
                sq[i][j] = square('white', '#119DA4', -1, x, y, w, h);
            }else{
                //black square
                sq[i][j] = square('black', '#0C7489', -1, x, y, w, h);
            }
            isOddCol = !isOddCol;
            x += w;
        }
        isOddRow = !isOddRow;
        x = 0;
        y += h;
    }
    return sq;
    
}

function createPieces(w, h){
    var piecesArray = [];
    var pSide;
    
    //white pieces
    pSide = 'white';
    piecesArray.push(piece(pSide, pieceSrc.white.rook, 0, 0, w, h));
    piecesArray.push(piece(pSide, pieceSrc.white.knight, 0, 0, w, h));
    piecesArray.push(piece(pSide, pieceSrc.white.bishop, 0, 0, w, h));

    piecesArray.push(piece(pSide, pieceSrc.white.queen, 0, 0, w, h));
    piecesArray.push(piece(pSide, pieceSrc.white.king, 0, 0, w, h));

    piecesArray.push(piece(pSide, pieceSrc.white.bishop, 0, 0, w, h));
    piecesArray.push(piece(pSide, pieceSrc.white.knight, 0, 0, w, h));
    piecesArray.push(piece(pSide, pieceSrc.white.rook, 0, 0, w, h));

    for(var i=0 ; i<8 ; i++){
        piecesArray.push(piece(pSide, pieceSrc.white.pawn, 0, 0, w, h));
    }

    //black pieces
    pSide = 'black';

    for(var i=0 ; i<8 ; i++){
        piecesArray.push(piece(pSide, pieceSrc.black.pawn, 0, 0, w, h));
    }

    piecesArray.push(piece(pSide, pieceSrc.black.rook, 0, 0, w, h));
    piecesArray.push(piece(pSide, pieceSrc.black.bishop, 0, 0, w, h));
    piecesArray.push(piece(pSide, pieceSrc.black.knight, 0, 0, w, h));

    piecesArray.push(piece(pSide, pieceSrc.black.king, 0, 0, w, h));
    piecesArray.push(piece(pSide, pieceSrc.black.queen, 0, 0, w, h));   

    piecesArray.push(piece(pSide, pieceSrc.black.bishop, 0, 0, w, h));
    piecesArray.push(piece(pSide, pieceSrc.black.knight, 0, 0, w, h));
    piecesArray.push(piece(pSide, pieceSrc.black.rook, 0, 0, w, h));
    
    return piecesArray;
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
                
                //square width and height
                var squareWidth, squareHeight;
                squareWidth = canvas.width/8;
                squareHeight = canvas.height/8;
                
                //piece width and height
                var pieceWidth, pieceHeight;
                pieceWidth = squareWidth/2.5;
                pieceHeight = squareHeight;
                
                //create pieces array
                board.pieces = createPieces(pieceWidth, pieceHeight);    
                
                //construct board array of squares
                board.squars = createBoard(squareWidth, squareHeight);
    
                console.log(board.squars);
                console.log(board.pieces);
    
                //placing chess pieces on squares logically
                for(var i=0 ; i<2 ; i++){
                    for(var j=0 ; j<8 ; j++){
                        board.squars[i][j].pieceID = j+i*8;
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
                            board.pieces[s.pieceID].x = s.x+s.width/4;
                            board.pieces[s.pieceID].y = s.y;
                            
                            var p = board.pieces[s.pieceID];
                            p.image.onload = 
                                function(){
                                    context.drawImage(this.image, this.x, this.y, p.width, p.height); 
                                }.bind(p);
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
    
    
    //requestAnimationFrame();
});