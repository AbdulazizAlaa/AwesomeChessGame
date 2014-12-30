function Board(squareWidth, squareHeight){
    this.squares = [];
    this.pieces = [];
    this.pieceWidth = squareWidth/2.5;
    this.pieceHeight = squareHeight;
    this.squareWidth = squareWidth;
    this.squareHeight = squareHeight;
    
}
//var board = {'squares': [], 'pieces': []};

Board.prototype.createPieces = function(){
    //var piecesArray = [];
    var pSide;
    if(this.pieceWidth && this.pieceHeight){
        var w = this.pieceWidth;
        var h = this.pieceHeight;    
    }
    var p = new Piece(pSide, "", 0, 0, w, h);
    //white pieces
    pSide = 'white';
    this.pieces.push(new Piece(pSide, p.images.white.rook, 0, 0, w, h));
    this.pieces.push(new Piece(pSide, p.images.white.knight, 0, 0, w, h));
    this.pieces.push(new Piece(pSide, p.images.white.bishop, 0, 0, w, h));

    this.pieces.push(new Piece(pSide, p.images.white.queen, 0, 0, w, h));
    this.pieces.push(new Piece(pSide, p.images.white.king, 0, 0, w, h));

    this.pieces.push(new Piece(pSide, p.images.white.bishop, 0, 0, w, h));
    this.pieces.push(new Piece(pSide, p.images.white.knight, 0, 0, w, h));
    this.pieces.push(new Piece(pSide, p.images.white.rook, 0, 0, w, h));

    for(var i=0 ; i<8 ; i++){
        this.pieces.push(new Piece(pSide, p.images.white.pawn, 0, 0, w, h));
    }

    //black pieces
    pSide = 'black';

    for(var i=0 ; i<8 ; i++){
        this.pieces.push(new Piece(pSide, p.images.black.pawn, 0, 0, w, h));
    }

    this.pieces.push(new Piece(pSide, p.images.black.rook, 0, 0, w, h));
    this.pieces.push(new Piece(pSide, p.images.black.bishop, 0, 0, w, h));
    this.pieces.push(new Piece(pSide, p.images.black.knight, 0, 0, w, h));

    this.pieces.push(new Piece(pSide, p.images.black.king, 0, 0, w, h));
    this.pieces.push(new Piece(pSide, p.images.black.queen, 0, 0, w, h));   

    this.pieces.push(new Piece(pSide, p.images.black.bishop, 0, 0, w, h));
    this.pieces.push(new Piece(pSide, p.images.black.knight, 0, 0, w, h));
    this.pieces.push(new Piece(pSide, p.images.black.rook, 0, 0, w, h));
    
};
Board.prototype.createBoard = function(w, h){
    //var sq = [];
    var isOddRow = true;
    var isOddCol = true;
    var x, y;
    x = y = 0;
    if(this.squareWidth && this.squareHeight){
        w = this.squareWidth;
        h = this.squareHeight;    
    }
    //construct board array of squares
    for(var i=0 ; i<8 ; i++){
        //create a row in the array of squares
        //sq[i] = [];
        this.squares[i] = [];
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
                this.squares[i].push(new Square(0, 'white', '#119DA4', -1, x, y, w, h));
            }else{
                //black square
                this.squares[i].push(new Square(0, 'black', '#0C7489', -1, x, y, w, h));
            }
            isOddCol = !isOddCol;
            x += w;
        }
        isOddRow = !isOddRow;
        x = 0;
        y += h;
    }
    this.squares[0][0].selected = 1;    
};

Board.prototype.initBoard = 
    function(canvas, context){                
                
                //create pieces array
                this.createPieces();
                //construct board array of squares
                this.createBoard();
    
                console.log(this.squares);
                console.log(this.pieces);
    
                //placing chess pieces on squares logically
                for(var i=0 ; i<2 ; i++){
                    for(var j=0 ; j<8 ; j++){
                        this.squares[i][j].pieceID = j+i*8;
                        this.squares[6+i*1][j].pieceID = j+16+i*8;
                    }
                }
    
                //make board squares
                for(var i=0 ; i<8 ; i++){
                    for(var j=0 ; j<8 ; j++){
                        this.squares[i][j].fillSquare(this, context, true);
                        //square.fillsquare(this, i, j, context, true);
                    }
                }

    };