{
    let spritesCreated = false

    function createSprites() {
        if (!spritesCreated) {
            spritesCreated = true

            Crafty.sprite(breakout.TILE_SIZE, 'assets/tiles.png', {
                powerup: [6, 6]
            })
        }
    }

    Crafty.c('PowerUp', {
        _enterFrame() {
            this.y += this.vel.y

            let hit = this.hit('Paddle')[0]

            if (hit) {
                hit.obj.onPowerUp()

                this.destroy()
            }

            if (this.vel.y > Crafty.stage.elem.clientHeight) this.destroy()
        },

        init() {
            createSprites()

            this.requires('powerup, Collision')

            this.bind('EnterFrame', this._enterFrame)
            .attr({
                vel: {
                    y: 80 / 60
                }
            })
        }
    })
}