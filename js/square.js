function Square(selected, side, color, pieceID, x, y, width, height){
    this.selected = selected;
    this.side = side;
    this.color = color;
    this.pieceID = pieceID;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    
}

Square.prototype.fillSquare = function(board, context, init){
    
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    if(this.selected === 1){
        this.selectSquare(context);
        //context.fillStyle = 'rgba(0,0,0, .4)';
        //context.fillRect(this.x, this.y, this.width, this.height);
    }
    if(this.pieceID !== -1){
        board.pieces[this.pieceID].x = this.x+this.width/4;
        board.pieces[this.pieceID].y = this.y;

        var p = board.pieces[this.pieceID];
        if(p.image.cache == null && !init){
            context.drawImage(p.image, p.x, p.y, p.width, p.height); 
        }else{
            p.image.onload = 
                function(){
                    context.drawImage(this.image, this.x, this.y, p.width, p.height); 
                }.bind(p);
        }
    }
};

Square.prototype.emptySquare = function(context){
  context.clearRect(this.x, this.y, this.width, this.height);    
};

Square.prototype.selectSquare = function(context){
    context.fillStyle = 'rgba(0,0,0, .4)';
    context.fillRect(this.x, this.y, this.width, this.height);
};

Square.prototype.getClickedSquare = function (x, y, canvas){
    return {'row': Math.ceil(y/(canvas.height/8)), 'col': Math.ceil(x/(canvas.width/8))};
};