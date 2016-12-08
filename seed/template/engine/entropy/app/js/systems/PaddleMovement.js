 Entropy.System({
    name: 'PaddleMovement',

    initialize() {
        const stage = this.game.stage

        const mousePosition = {
            x: 0
        }

        this.mousePosition = mousePosition

        stage.on('mousemove', (e) => mousePosition.x = stage.toLocal(e.data.global).x)

        this.query = new Entropy.Query({
            name: 'Paddle'
        })
    },

    update(delta, event) {
        const paddle = this.engine.getEntities(this.query)[0]
        const paddleBody = paddle.components.body.body

        const maxLeft = -(Entropy.WIDTH / Entropy.ZOOM / 2) + (paddleBody.shapes[0].width / 2)
        const maxRight = (Entropy.WIDTH / Entropy.ZOOM / 2) - (paddleBody.shapes[0].width / 2)

        let paddlePosition = this.mousePosition.x

        if (paddlePosition < maxLeft) {
            paddlePosition = maxLeft
        }

        if (paddlePosition > maxRight) {
            paddlePosition = maxRight
        }

        paddleBody.position[0] = paddlePosition
    }
})