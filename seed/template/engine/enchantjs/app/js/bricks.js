window.bricks = []

window.Brick = Class.create(Sprite, {
    initialize(x,y,color) {
        Sprite.apply(this,[32,16])

        this.image = enchant.Game.instance.assets['assets/tiles.png']

        const startFrame = color * 6

        this.frame = [startFrame + 4, startFrame +3, startFrame +2, startFrame+1,startFrame, null]
        this.x = x + 48
        this.y = y + 64
    }
})

Brick.prototype.powerDowns = 0
Brick.prototype.powerUps = 0