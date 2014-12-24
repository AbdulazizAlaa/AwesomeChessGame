var board = function(){
    
    var b = 
    {   'squars': [],
        'initBoard': 
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
                                board.squars[i][j] = square('#119DA4', -1, x, y, width, height);
                            }else{
                                //black square
                                board.squars[i][j] = square('#0C7489', -1, x, y, width, height);
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
        
                }
    
    
    };

    return b;
    
};