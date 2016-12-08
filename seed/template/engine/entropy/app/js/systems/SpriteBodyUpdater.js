 Entropy.System({
    name: 'SpriteBodyUpdater',

    initialize() {
        this.query = new Entropy.Query(['Sprite', 'Body'])
    },

    update(delta, event) {
        const renderableBodies = this.engine.getEntities(this.query)

        let e
        let i = 0
        while (e = renderableBodies[i]) {
            const sprite = e.components.sprite.sprite
            const body = e.components.body.body

            sprite.position.x = body.position[0]
            sprite.position.y = body.position[1]

            i++
        }
    }
})