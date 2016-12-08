 Entropy.System({
    name: 'AnimationUpdater',

    initialize() {
        this.query = new Entropy.Query(['Animation'])
    },

    update(delta, event) {
        const animations = this.engine.getEntities(this.query)

        let e
        let i = 0

        while (e = animations[i]) {
            e.components.animation.animation.update(delta)

            i++
        }
    }
})