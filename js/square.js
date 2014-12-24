var square = 
    {
        'create': 
            function(side, color, pieceID, x, y, width, height){
                return {'side': side, 'color': color, 'pieceID': pieceID, 'x': x, 'y': y, 'width': width, 'height': height};
            },
        'fillsquare':    
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

            },
        'getClickedSquare':
            function (x, y, canvas){
                return {'row': Math.ceil(y/(canvas.height/8)), 'col': Math.ceil(x/(canvas.width/8))};
            }
    
    };