window.Entropy.Entity({
    name: 'Ball',

    create(game, x, y, vx, vy, material) {
        const frames = [1, 2, 3, 4, 5].map((num) =>
            new Entropy.Frame(PIXI.utils.TextureCache[`ball_0${num}.png`])
        )

        const body = new p2.Body({
            angle: 0,
            angularDamping: 0,
            angularVelocity: 0,
            damping: 0,
            mass: 1,
            position: [x, y],
            velocity: [vx, vy]
        })

        body.entId = 'ball'

        const ballShape = new p2.Circle({
            radius: 0.8
        })

        ballShape.material = game.materials.ballMaterial

        body.addShape(ballShape)
        game.world.addBody(body)

        const animation = new Entropy.Animation(frames, 20, true)

        const sprite = animation.getAnimationSprite()

        sprite.position.x = x
        sprite.position.y = y
        sprite.anchor.x = 0.5
        sprite.anchor.y = 0.5
        sprite.scale.y = -1 / Entropy.ZOOM
        sprite.scale.x = 1 / Entropy.ZOOM

        game.stage.addChild(sprite)

        animation.play()

        this
        .add('Sprite', sprite)
        .add('Animation', animation)
        .add('Body', body)
    },

    remove(game) {
        game.world.removeBody(this.components.body.body)
        game.stage.removeChild(this.components.sprite.sprite)
    }
})