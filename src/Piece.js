export default class Piece {
    constructor(x, y, sprite, scale = 0.05) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.scale = scale;
    }

    render = (context) => {
        context.add.image(this.x, this.y, this.sprite).setScale(this.scale);
    } 
}

export class Pawn extends Piece {
    constructor(context, x, y, colour) {
        let sprite;
        Object.keys(context.textures.list).slice(3).forEach((name) => {
            if (name.match("spr_piece_"+colour+"_pawn"))
                sprite = name;
        });
        super(x, y, sprite);
    }

    getValidMoves() {
        
    }
}

export class Knight extends Piece {
    constructor(context, x, y, colour) {
        let sprite;
        Object.keys(context.textures.list).slice(3).forEach((name) => {
            if (name.match("spr_piece_"+colour+"_knight"))
                sprite = name;
        });
        super(x, y, sprite);
    }
}

export class Bishop extends Piece {
    constructor(context, x, y, colour) {
        let sprite;
        Object.keys(context.textures.list).slice(3).forEach((name) => {
            if (name.match("spr_piece_"+colour+"_bishop"))
                sprite = name;
        });
        super(x, y, sprite);
    }
}

export class Rook extends Piece {
    constructor(context, x, y, colour) {
        let sprite;
        Object.keys(context.textures.list).slice(3).forEach((name) => {
            if (name.match("spr_piece_"+colour+"_rook"))
                sprite = name;
        });
        super(x, y, sprite);
    }
}

export class Queen extends Piece {
    constructor(context, x, y, colour) {
        let sprite;
        Object.keys(context.textures.list).slice(3).forEach((name) => {
            if (name.match("spr_piece_"+colour+"_queen"))
                sprite = name;
        });
        super(x, y, sprite);
    }
}

export class King extends Piece {
    constructor(context, x, y, colour) {
        let sprite;
        Object.keys(context.textures.list).slice(3).forEach((name) => {
            if (name.match("spr_piece_"+colour+"_king"))
                sprite = name;
        });
        super(x, y, sprite);
    }
}