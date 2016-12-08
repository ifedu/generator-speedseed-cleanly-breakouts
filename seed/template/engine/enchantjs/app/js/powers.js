//var powerUps = []

//var powerDowns = []
window.powers = []

//powers parent class
window.Power = Class.create(Sprite, {
    initialize(x,y) {
        Sprite.apply(this,[16,16])

        this.image = enchant.Game.instance.assets['assets/tiles.png']
        this.x = x
        this.y = y
    },

    move() {
        this.y += 2
    }
})

window.PowerDown = Class.create(Power, {
    initialize(x,y) {
        Power.call(this,x,y)

        this.frame = 79
    },

    action() {
        const game = enchant.Game.instance
        const paddle = game.currentScene.paddle

        game.assets['assets/sfx/powerdown.mp3'].play()

        paddle.width = 32
        paddle.frame = 30
    }
})

window.PowerUp = Class.create(Power, {
    initialize(x,y) {
        Power.call(this,x,y)
        this.frame = 78
    },

    action() {
        const game = enchant.Game.instance

        balls.push(addBall(3,3))

        game.assets['assets/sfx/powerup.mp3'].play()
        game.currentScene.addChild(balls[balls.length -1])
    }
})