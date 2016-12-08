 Entropy.System({
    name: 'BlockHit',

    initialize() {
        const blocksQuery = new Entropy.Query({
            name: "Block"
        })

        const playerQuery = new Entropy.Query({
            name: "Player"
        })

        const game = this.game

        const handleBlockHit = (e) => {
            let ball
            let blockBody

            if (e.bodyA.entId === 'ball' && e.bodyB.entId === 'block') {
                ball = e.bodyA
                blockBody = e.bodyB
            } else if(e.bodyA.entId === 'block' && e.bodyB.entId === 'ball') {
                ball = e.bodyB
                blockBody = e.bodyA
            } else {
                return
            }


            if (blockBody.collisionResponse === false) {
                return
            }

            const player = this.engine.getOne(playerQuery)
            const blocks = this.engine.getEntities(blocksQuery)
            const blocksLength = blocksQuery.entitiesLength

            let block
            let i = 0

            while (e = blocks[i]) {
                if (e.components.body.body === blockBody) {
                    block = e

                    break
                }

                i++
            }

            if (block == null) {
                return
            }

            const animation = block.components.animation.animation

            player.components.stats.score += 100
            player.components.stats.scoreTextNode.text = `score:${pad(player.components.stats.score, 4)}`

            blockBody.collisionResponse = false

            game.sounds.brickDeath.play()
            animation.play()

            animation.once('end', () => {
                //we have removed the last block
                if (blocksLength === 1) {
                    const nextLevel = ++player.components.stats.level

                    if (nextLevel <= 2) {
                        this.engine.addSystem(['InitializeLevel', 0], nextLevel)
                    } else {
                        this.engine.clear()

                        this.engine.once('cleared', () => {
                            this.game.stop()
                            this.game.state.change('GameOver')
                        })
                    }
                }

                this.engine.remove(block)
            })
        }

        this.handleBlockHit = handleBlockHit
        this.game.world.on('beginContact', handleBlockHit)
    },

    update(delta, event) {

    },

    remove() {
        this.game.world.off('beginContact', this.handleBlockHit)
    }
})