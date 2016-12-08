 Entropy.System({
    name: 'CountdownSystem',

    initialize() {
        this.counterQuery = new Entropy.Query({
            name: 'Counter'
        })

        this.hasRun = false
    },

    update(delta, event) {
        if (this.hasRun) {
            return
        }

        const counter = this.engine.getEntities(this.counterQuery)[0]
        const animation = counter.components.animation.animation

        animation.on('end', function () {
            this.engine.remove(counter)
            this.engine.addSystem('PhysicsStep')
            this.engine.removeSystem(this)
        }, this)

        animation.play()

        this.hasRun = true
    }
})