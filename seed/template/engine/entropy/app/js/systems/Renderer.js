Entropy.System({
    name: 'Renderer',

    initialize() {
        this.stage = this.game.stage
        this.renderer = this.game.renderer
    },

    update(delta, event) {
        this.renderer.render(this.stage)
    }
})