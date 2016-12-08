window.balls = []

window.Ball = Class.create(Sprite, {
    initialize(x, y, dx, dy) {
        Sprite.apply(this, [16, 16])

        this.image = enchant.Game.instance.assets['assets/tiles.png']
        this.frame = 51

        this.x = x
        this.y = y

        this.dx = dx
        this.dy = dy
    },

    move() {
        this.x += this.dx
        this.y += this.dy
        //change the image to make ball spin
        //this is not too fast and spins in correct direction
        //depending on if ball is moving up or down
        switch (Math.floor(this.y / 16) % 5) {
            case 0:
                return this.frame = 55
            case 1:
                return this.frame = 54
            case 2:
                return this.frame = 53
            case 3:
                return this.frame = 52
            default:
                return this.frame = 51
        }
    }
})

//calculate dx change
Ball.prototype.determineBounceVelocity = function(p) {
    const ratio = (p.width / 10) / 2

    return ((this.x - p.x) / 10) - ratio
}

//add starting ball
window.addBall = function(dx, dy) {
    const game = enchant.Game.instance

    return new Ball(game.width / 4, game.height / 2, dx, dy)
}