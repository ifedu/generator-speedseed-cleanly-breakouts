Entropy.Entity({
    name: 'Block',

    create(game, x, y, color, material) {
        const body = new p2.Body({
            angle: 0,
            mass: 0,
            position: [x, y]
        })

        body.entId = 'block'

        const blockShape = new p2.Box({
            height: 1.6,
            width: 3.2
        })

        blockShape.material = game.materials.wallMaterial

        body.addShape(blockShape)
        game.world.addBody(body)

        const frames = [1, 2, 3, 4, 5].map((num) =>
            new Entropy.Frame(PIXI.utils.TextureCache[`${color}_0${num}.png`])
        ).reverse()

        const animation = new Entropy.Animation(frames, 20, false)

        const animationSprite = animation.getAnimationSprite()

        animationSprite.position.x = x
        animationSprite.position.y = y
        animationSprite.anchor.x = 0.5
        animationSprite.anchor.y = 0.5
        animationSprite.scale.y = -1 / Entropy.ZOOM
        animationSprite.scale.x = 1 / Entropy.ZOOM

        game.stage.addChild(animationSprite)

        animation.play()

        animation.on('end', () => animation.reverse())

        this
        .add("Sprite", animationSprite)
        .add("Animation", animation)
        .add("Body", body)
    },

    remove(game) {
        game.stage.removeChild(this.components.sprite.sprite)
        game.world.removeBody(this.components.body.body)
    }
})