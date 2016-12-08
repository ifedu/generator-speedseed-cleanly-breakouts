{
    let spritesCreated = false

    function createSprites() {
        if (!spritesCreated) {
            spritesCreated = true
            Crafty.sprite(breakout.TILE_SIZE, 'assets/tiles.png', {
                paddle: [0, 4, 3, 1],
                paddleMini: [0, 5, 2, 1]
            })
        }
    }

    Crafty.c('Paddle', {
        _powerDownLength: 10,

        init() {
            createSprites()

            return this.requires('Edges, paddle')
        },

        _setMiniSize() {
            this.w = breakout.TILE_SIZE * 2
            this.sprite(0, 5, 2, 1)
        },

        _setFullSize() {
            this.w = breakout.TILE_SIZE * 3
            this.sprite(0, 4, 3, 1)
        },

        onPowerDown() {
            Crafty.audio.play('powerdown')

            this._setMiniSize()

            if (this._miniTimeout) {
                clearTimeout(this._miniTimeout)

                delete this._miniTimeout
            }

            this._miniTimeout = setTimeout(() => {
                this._setFullSize()
                Crafty.audio.play('recover')
            }, 1000 * this._powerDownLength)
        }
    })
}