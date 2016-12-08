 Entropy.System({
    name: 'InitializeLevel',
    singleton: true,

    initialize(levelNum) {
        this.blocksQuery = new Entropy.Query({
            name: 'Block'
        })

        this.ballQuery = new Entropy.Query({
            name: 'Ball'
        })

        this.playerQuery = new Entropy.Query({
            name: 'Player'
        })

        this.counterQuery = new Entropy.Query({
            name: 'Counter'
        })

        this.level = game.levels[levelNum - 1]
        this.hasRun = false
    },

    update(delta, event) {
        if (this.hasRun) {
            return
        }

        const ball = this.engine.getOne(this.ballQuery)
        const counter = this.engine.getOne(this.counterQuery)
        const player = this.engine.getOne(this.playerQuery)
        const blocks = this.engine.getEntities(this.blocksQuery)

        //Do some cleanup first
        this.engine.removeSystem('PhysicsStep')

        if (ball) {
            this.engine.remove(ball)
        }

        if (counter) {
            this.engine.remove(counter)
        }

        let block
        let i = 0
        while (block = blocks[i]) {
            this.engine.remove(block)

            i++
        }

        //now construct level
        const blocksLineWidth = this.level.blocks[0].length * 3.2
        const firstBlockX = -blocksLineWidth / 2 + 1.6
        const firstBlockY = 15

        for (let y = 0; y < this.level.blocks.length; y++) {
            const blocks = this.level.blocks[y]

            for (let x = 0; x < blocks.length; x++) {
                const blockLetter = blocks[x]

                if (blockLetter === 'X') continue

                this.engine.create('Block', firstBlockX + x * 3.2, firstBlockY - y * 1.6, game.colorMap[blockLetter])
            }
        }

        game.engine.create('Ball', -8, 0, 11, -11)
        game.engine.create('Counter')

        game.engine.addSystem(['CountdownSystem', 3])

        player.components.stats.levelTextNode.text = `lvl:${player.components.stats.level}`

        this.hasRun = true

        this.engine.removeSystem(this)
    }
})