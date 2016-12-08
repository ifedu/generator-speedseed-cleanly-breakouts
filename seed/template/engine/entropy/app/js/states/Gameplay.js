Entropy.State({
    name: 'Gameplay',

    initialize(game, done) {
        this.gameplayScreen = document.querySelector('.gameplay-screen')

        game.levels = [{
            powerUps: 1,
            powerDowns: 1,

            blocks: [
                'XXgogXX',
                'obgggbo',
                'XbbbbbX'
            ]
        }, {
            powerUps: 1,
            powerDowns: 1,

            blocks: [
                'XgogogX',
                'XbbbbbX',
                'gbrbrbg',
                'gbbbbbg',
                'gbXXXbg',
                'XbbbbbX'
            ]
        }]

        game.colorMap = {
            o: 'orange',
            b: 'blue',
            g: 'green',
            r: 'red'
        }

        return done()
    },

    enter(game, done) {
        //define some materials
        game.materials = {
            ballMaterial: new p2.Material(),
            wallMaterial: new p2.Material()
        }

        game.engine.addSystem(['Renderer', 0])
        game.engine.addSystem(['AnimationUpdater', 1])
        game.engine.addSystem(['SpriteBodyUpdater', 2])
        game.engine.addSystem(['BlockHit', 3])
        game.engine.addSystem(['PaddleHit', 3])
        game.engine.addSystem(['PaddleMovement', 3])
        game.engine.addSystem(['BallDeathChecker', 3])
        game.engine.addSystem(['LevelChanger', 3])

        game.engine.create('Player')
        game.engine.create('Paddle')
        game.engine.create('WallTop')
        game.engine.create('WallRight')
        game.engine.create('WallLeft')

        game.world.addContactMaterial(new p2.ContactMaterial(game.materials.ballMaterial, game.materials.wallMaterial, {
            restitution: 1.0,
            stiffness: Number.MAX_VALUE // We need infinite stiffness to get exact restitution
        }))

        game.world.addContactMaterial(new p2.ContactMaterial(game.materials.ballMaterial, game.materials.ballMaterial, {
            restitution: 1.0,
            stiffness: Number.MAX_VALUE // We need infinite stiffness to get exact restitution
        }))

        game.engine.addSystem(['InitializeLevel', 0], 1)

        //Start da game!
        fadeInScreen('.gameplay-screen', () => {
            game.start()

            return done()
        })
    },

    exit(game, done) {
        fadeOutScreen('.gameplay-screen', () => done())
    }
})

function parseLevel(game, level) {

}
