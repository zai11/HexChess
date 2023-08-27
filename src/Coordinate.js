
export class Coordinate {
    constructor(x, y, content, context) {
        this.x = x;
        this.y = y;
        this.content = content;
        const style = {color: '#FFF', fontSize: 20};
        context.add.text(this.x, this.y, this.content, style).setOrigin(0.5,0.5);
    }
}