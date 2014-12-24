var board = {'squars': [], 'pieces': []};

board.createPieces = function(w, h){
    var piecesArray = [];
    var pSide;
    
    //white pieces
    pSide = 'white';
    piecesArray.push(piece.create(pSide, piece.images.white.rook, 0, 0, w, h));
    piecesArray.push(piece.create(pSide, piece.images.white.knight, 0, 0, w, h));
    piecesArray.push(piece.create(pSide, piece.images.white.bishop, 0, 0, w, h));

    piecesArray.push(piece.create(pSide, piece.images.white.queen, 0, 0, w, h));
    piecesArray.push(piece.create(pSide, piece.images.white.king, 0, 0, w, h));

    piecesArray.push(piece.create(pSide, piece.images.white.bishop, 0, 0, w, h));
    piecesArray.push(piece.create(pSide, piece.images.white.knight, 0, 0, w, h));
    piecesArray.push(piece.create(pSide, piece.images.white.rook, 0, 0, w, h));

    for(var i=0 ; i<8 ; i++){
        piecesArray.push(piece.create(pSide, piece.images.white.pawn, 0, 0, w, h));
    }

    //black pieces
    pSide = 'black';

    for(var i=0 ; i<8 ; i++){
        piecesArray.push(piece.create(pSide, piece.images.black.pawn, 0, 0, w, h));
    }

    piecesArray.push(piece.create(pSide, piece.images.black.rook, 0, 0, w, h));
    piecesArray.push(piece.create(pSide, piece.images.black.bishop, 0, 0, w, h));
    piecesArray.push(piece.create(pSide,piece.images.black.knight, 0, 0, w, h));

    piecesArray.push(piece.create(pSide, piece.images.black.king, 0, 0, w, h));
    piecesArray.push(piece.create(pSide, piece.images.black.queen, 0, 0, w, h));   

    piecesArray.push(piece.create(pSide, piece.images.black.bishop, 0, 0, w, h));
    piecesArray.push(piece.create(pSide, piece.images.black.knight, 0, 0, w, h));
    piecesArray.push(piece.create(pSide, piece.images.black.rook, 0, 0, w, h));
    
    return piecesArray;
};
board.createBoard = function(w, h){
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
                sq[i][j] = square.create('white', '#119DA4', -1, x, y, w, h);
            }else{
                //black square
                sq[i][j] = square.create('black', '#0C7489', -1, x, y, w, h);
            }
            isOddCol = !isOddCol;
            x += w;
        }
        isOddRow = !isOddRow;
        x = 0;
        y += h;
    }
    return sq;
    
};

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
                board.pieces = board.createPieces(pieceWidth, pieceHeight);    
                
                //construct board array of squares
                board.squars = board.createBoard(squareWidth, squareHeight);
    
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
                        square.fillsquare(i, j, context, true);
                    }
                }

    };