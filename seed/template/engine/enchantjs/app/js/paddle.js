//paddle
window.Paddle = Class.create(Sprite, {
    initialize() {
        Sprite.apply(this,[48,16])

        const game = enchant.Game.instance

        this.image = game.assets['assets/tiles.png']
        //select spritesheet frame
        this.frame = 16
        this.x = game.width/2-this.width/2
        this.y = game.height-48
    } //end initialize
})