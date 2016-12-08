/*global jQuery, friGame, G */
/*jslint white: true, browser: true */

(($, fg) => {
    let ballCounter = 0

    G.addBall = (active) => {
        let ball_name = ['ball', String(ballCounter)].join('_')

        ballCounter += 1
        ballCounter %= 100000

        fg
        .s
        .playground
        .addSprite(ball_name, {
            animation: 'ball',
            centerx: 50,
            centery: fg.s.playground.halfHeight
        })


        fg.s[ball_name].userData = G.Ball(ball_name, active)

        G.balls[ball_name] = fg.s[ball_name]

        fg.s[ball_name].registerCallback(function () {
            this.userData.update()
        })
    }

    G.PBall = {
        init(name, active) {
            this.node = fg.s[name]
            this.speed = 170 / (fg.REFRESH_RATE * 2)
            this.active = active

            this.vel = {
                x: this.speed,
                y: this.speed
            }

            this.prevX = this.node.centerx
            this.prevY = this.node.centery
        },

        update() {
            if (!this.active) {
                return
            }

            this.prevX = this.node.centerx
            this.prevY = this.node.centery

            this.node.move({
                centerx: this.node.centerx + this.vel.x,
                centery: this.node.centery + this.vel.y
            })

            // did the ball get past the paddle?
            if (this.node.top >= fg.s.playground.height) {
                delete G.balls[this.node.name]

                this.node.remove()
                this.node = null

                if ($.isEmptyObject(G.balls)) {
                    G.lives -= 1

                    $('#lives').html(String(G.lives))

                    if (G.lives <= 0) {
                        G.Scene.gameOver()
                    } else {
                        G.addBall(false)
                        G.addCountdown()
                    }

                }

                return
            }

            this.checkWallCollision()
            this.checkBlockCollision()

            if (fg.s.paddle) {
                this.checkPaddleCollision()
            }
        },

        checkWallCollision() {
            // hit a vertical wall?
            if ((this.node.left < 16) || (this.node.right >= (fg.s.playground.width - 16))) {
                this.node.move({
                    centerx: this.prevX
                })

                this.vel.x *= - 1

                return
            }

            // or the top horizontal wall?
            if (this.node.top < 16) {
                this.node.move({
                    centery: this.prevY
                })

                this.vel.y *= - 1

                return
            }
        },

        checkBlockCollision() {
            const ball = this.node

            $.each(G.blocks, (name, block) => {
                if (block.collidePointRect(ball.centerx, ball.top) && (this.vel.y < 0)) {
                    G.onBlockDeath(block)

                    ball.move({
                        centery: this.prevY
                    })

                    this.vel.y *= -1
                }
                else if (block.collidePointRect(ball.centerx, ball.bottom) && (this.vel.y > 0)) {
                    G.onBlockDeath(block)

                    ball.move({
                        centery: this.prevY
                    })

                    this.vel.y *= -1
                }
                else if (block.collidePointRect(ball.left, ball.centery) && (this.vel.x < 0)) {
                    G.onBlockDeath(block)

                    ball.move({
                        centerx: this.prevX
                    })

                    this.vel.x *= -1
                }
                else if (block.collidePointRect(ball.right, ball.centery) && (this.vel.x > 0)) {
                    G.onBlockDeath(block)

                    ball.move({
                        centerx: this.prevX
                    })

                    this.vel.x *= -1
                }
            })
        },

        checkPaddleCollision() {
            if (this.vel.y > 0) {
                if (fg.s.paddle.collidePointRect(this.node.centerx, this.node.bottom) && (this.vel.y > 0)) {
                    this.node.move({
                        centery: this.prevY
                    })

                    this.vel.x = this.determineBounceVelocity()

                    this.vel.y *= -1
                }
                else if (fg.s.paddle.collidePointRect(this.node.left, this.node.centery) && (this.vel.x < 0)) {
                    this.node.move({
                        centerx: this.prevX
                    })

                    this.vel.x *= -1
                }
                else if (fg.s.paddle.collidePointRect(this.node.right, this.node.centery) && (this.vel.x > 0)) {
                    this.node.move({
                        centerx: this.prevX
                    })

                    this.vel.x *= -1
                }
            }
        },

        determineBounceVelocity() {
            const dx = fg.s.paddle.centerx - this.node.centerx
            const dy = fg.s.paddle.centery - this.node.centery
            const distance = Math.sqrt((dx * dx) + (dy * dy))
            const magnitude = distance - this.node.halfHeight - fg.s.paddle.halfHeight

            let ratio = magnitude / fg.s.paddle.halfWidth * 2.5

            if (this.node.centerx < fg.s.paddle.centerx) ratio *= -1

            return this.speed * ratio
        }
    }

    G.Ball = fg.Maker(G.PBall)
})(jQuery, friGame)