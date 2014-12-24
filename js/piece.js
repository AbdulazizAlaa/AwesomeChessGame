var piece = 
    {
        'images':
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
            },
        'loadImage':    
            function(src, onLoad){

                var image = new Image();
                image.onload = onLoad;
                image.src = src;

                return image;
            },
        'create':
            function(side, src, x, y, width, height, onLoad){
                return {'side': side, 'src': src, 'image': piece.loadImage(src, onLoad), 'x': x, 'y': y, 'width': width, 'height': height};
            }
    };
    