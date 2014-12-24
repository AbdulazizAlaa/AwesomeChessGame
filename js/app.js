function loadImage(src, onLoad){
    
    var image = new Image();
    image.onload = onLoad;
    image.src = src;
    
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
                        fillsquare(i, j, context, true);
                    }
                }

                //make board border
               /* context.beginPath();
                context.strokeStyle = "black";
                context.moveTo(0,0);
                context.lineTo(canvas.width, 0);
                context.lineTo(canvas.width, canvas.height);
                context.lineTo(0, canvas.height);
                context.lineTo(0, 0);                    
                context.stroke();*/

    };

function makeMove(){

}

function fillsquare(i, j, context, init){
    var s = board.squars[i][j]; 
    
    context.fillStyle = s.color;
    context.fillRect(s.x, s.y, s.width, s.height);

    if(s.pieceID !== -1){
        board.pieces[s.pieceID].x = s.x+s.width/4;
        board.pieces[s.pieceID].y = s.y;
        
        var p = board.pieces[s.pieceID];
        if(p.image.cache == null && !init){
            context.drawImage(p.image, p.x, p.y, p.width, p.height); 
        }else{
            p.image.onload = 
                function(){
                    context.drawImage(this.image, this.x, this.y, p.width, p.height); 
                }.bind(p);
        }
        
    }

}

function getClickedSquare(x, y, canvas){
    return {'row': Math.ceil(y/(canvas.height/8)), 'col': Math.ceil(x/(canvas.width/8))};
}

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
            fillsquare(previousSquare.j, previousSquare.i, c.context, false);
            fillsquare(clickedSquare.j, clickedSquare.i, c.context, false);
            clickedSquare = previousSquare = initialSquare;
            ck = 0;
        }
    });
    
    k.down('up', function(){
        if(j > 0){
            j--;
            if(j<8)
                fillsquare(j+1, i, c.context, false);

            c.context.fillStyle = 'rgba(0,0,0, .4)';
            c.context.fillRect(board.squars[j][i].x, board.squars[j][i].y, board.squars[j][i].width, board.squars[j][i].height);
        }
    });
    
    k.down('down', function(){
        if(j < 7){
            j++;
            if(j>0)
                fillsquare(j-1, i, c.context, false);

            c.context.fillStyle = 'rgba(0,0,0, .4)';
            c.context.fillRect(board.squars[j][i].x, board.squars[j][i].y, board.squars[j][i].width, board.squars[j][i].height);
        }
    });
    
    k.down('right', function(){
        if(i < 7){
            i++;
            if(i>0)
                fillsquare(j, i-1, c.context, false);

            c.context.fillStyle = 'rgba(0,0,0, .4)';
            c.context.fillRect(board.squars[j][i].x, board.squars[j][i].y, board.squars[j][i].width, board.squars[j][i].height);
        }else if(j < 7){
            fillsquare(j, i, c.context, false);
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
                fillsquare(j, i+1, c.context, false);

            c.context.fillStyle = 'rgba(0,0,0, .4)';
            c.context.fillRect(board.squars[j][i].x, board.squars[j][i].y, board.squars[j][i].width, board.squars[j][i].height);
        }else if(j > 0){
            fillsquare(j, i, c.context, false);
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