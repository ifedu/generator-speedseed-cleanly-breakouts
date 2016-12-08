 Entropy.System({
    name: 'PaddleHit',

    initialize() {
        this.game.world.on('beginContact', this.handlePaddleHit)
    },

    handlePaddleHit(e) {
        let ball
        let paddle

        if (e.bodyA.entId === 'ball' && e.bodyB.entId === 'paddle') {
            ball = e.bodyA
            paddle = e.bodyB
        }
        else if(e.bodyA.entId === 'paddle' && e.bodyB.entId === 'ball') {
            ball = e.bodyB
            paddle = e.bodyA
        }
        else {
            return
        }

        if (e.contactEquations[0].normalA[1] !== -1) {
            return
        }

        const currentVelocity = p2.vec2.length(ball.velocity)
        const newVelocity = p2.vec2.create()

        p2.vec2.copy(newVelocity, e.contactEquations[0].contactPointB)
        p2.vec2.add(newVelocity, newVelocity, [0, 1])
        p2.vec2.normalize(newVelocity, newVelocity)

        const angle = Math.atan2(newVelocity[1], newVelocity[0])

        const halfCircleChunk = Math.PI / 8

        let coeficient = 1
        if (angle > 6 * halfCircleChunk || angle < 2 * halfCircleChunk) {
            coeficient = 1.1
        } else if (angle > 5 * halfCircleChunk || angle < 3 * halfCircleChunk) {
            coeficient = 1.05
        } else if (angle < 5 * halfCircleChunk && angle > 3 * halfCircleChunk) {
            coeficient = 0.95
        }

        p2.vec2.scale(newVelocity, newVelocity, clamp(currentVelocity * coeficient, 11, 16))

        ball.velocity = newVelocity
    },

    update(delta, event) {},

    remove() {
        this.game.world.off('beginContact', this.handlePaddleHit)
    }
})