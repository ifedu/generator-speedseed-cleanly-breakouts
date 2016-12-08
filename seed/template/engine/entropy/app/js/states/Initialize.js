Entropy.State({
    name: 'Initialize',

    initialize(game, done) {
        Entropy.Const('WIDTH', 320)
        Entropy.Const('HEIGHT', 416)
        Entropy.Const('ZOOM', 10)

        const view = document.querySelector('.game-canvas')

        const renderer = new PIXI.autoDetectRenderer(Entropy.WIDTH, Entropy.HEIGHT, {
            view: view,
            transparent: true,
            antialias: false
        })

        const scene = new PIXI.Container()
        const stage = new PIXI.Container()

        scene.addChild(stage)

        stage.position.x = Entropy.WIDTH / 2
        stage.position.y = Entropy.HEIGHT / 2

        stage.scale.x = Entropy.ZOOM
        stage.scale.y = -Entropy.ZOOM

        stage.interactive = true

        game.input = {}

        const world = new p2.World({
            gravity: [0, 0]
        })

        game.renderer = renderer
        game.stage = stage
        game.world = world

        game.state.change('Menu')

        return done()
    }
})