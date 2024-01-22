export class Coordinate {
    constructor(x, y, content, scene) {
        this.x = x;
        this.y = y;
        this.content = content;
        const style = {color: '#FFF', fontSize: 20};
        this.sprite = scene.add.text(this.x, this.y, this.content, style).setOrigin(0.5,0.5);
    }

    destroy = function () {
        this.sprite.destroy();
    }
}