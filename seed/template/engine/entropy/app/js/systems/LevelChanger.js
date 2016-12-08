Entropy.System({
    name: 'LevelChanger',

    initialize() {
        const playerQuery = new Entropy.Query({
            name: 'Player'
        })

        this.handleLevelChange = (e) => {
            const player = this.engine.getOne(playerQuery)

            if (!player || !player.components || !player.components.stats) {
                return
            }

            let newLevel

            if (e.keyCode === 37) { //prev
                newLevel = player.components.stats.level - 1

                if (newLevel < 1) {
                    return
                }
            } else if (e.keyCode === 39) { //next
                newLevel = player.components.stats.level + 1

                if (newLevel > 2) {
                    return
                }
            } else {
                return
            }

            player.components.stats.level = newLevel

            this.engine.addSystem('InitializeLevel', newLevel)
        }

        window.addEventListener('keyup', this.handleLevelChange)
    },

    update(delta, event) {},

    remove() {
        window.removeEventListener('keyup', this.handleLevelChange)
    }
})