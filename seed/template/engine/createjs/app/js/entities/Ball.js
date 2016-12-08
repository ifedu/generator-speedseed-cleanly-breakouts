/**
 * Ball class
 * @param {Number} x initial x position
 * @param {Number} y initial y position
 */
window.Ball = function(x, y, world) {
    this.game = world
    this.Sprite_constructor(this.game.spriteSheets.ball, 'ball')
    this.x = x
    this.y = y
    this.vely = -3
    this.velx = -3
    this.active = false

    let bounds = this.game.spriteSheets.ball.getFrameBounds(1)
    this.width = bounds.width
    this.height = bounds.height
    //registration point in the middle
    this.regX = this.width/2
    this.regY = this.height/2

    const stage = document.getElementById('stage')
    this.viewportHeight = stage.height - this.height
    this.viewportWidth = stage.width - this.width
    this.lowerBound = 0
    this.upperBound = 0

    bounds = this.game.spriteSheets.bricks.getFrameBounds(1)
    this.brickWidth = bounds.width
    this.brickHeight = bounds.height
}

// setup inheritance
createjs.extend(Ball, createjs.Sprite)

//ball animation
Ball.prototype.tick = function() {
    //capture upper/lower bounds to narrow hit testing
    if (this.lowerBound==0) {
        const info = this.game.currentLevel.getBounds()
        this.lowerBound = info.lower
        this.upperBound = info.upper
    }

    //move
    this.x +=this.velx
    this.y +=this.vely
    //check first canvas limits
    this.wallWidth = 20

    if (this.x < this.wallWidth || this.x >this.viewportWidth-(this.wallWidth/2)) {
        this.x = (this.velx <0)
            ? this.wallWidth
            : this.viewportWidth-(this.wallWidth/2)

        this.velx = -this.velx
    }

    if (this.y < this.wallWidth){
        this.y = this.wallWidth
        this.vely = -this.vely
    }
    //check paddle
    const paddle = this.game.currentLevel.paddle
    if (((this.y + (this.height/2)) >= paddle.y) && this.y < paddle.y+paddle.height) {
        if (this.x >= (paddle.x)) {
            if (this.x <= (paddle.x + paddle.width) && (this.vely > 0)) {
                this.y -= (this.height/2)
                this.vely = -this.vely
                this.velx = this.determineBounceVelocity(paddle)
                this.game.stage.update()
            }
        }
    }
    //check bricks if we're in range
    if (this.y<=this.lowerBound && this.y >= this.upperBound) {
        const bricks = this.game.currentLevel.bricks
        const cant = bricks.length

        for(let i = 0; i<bricks.length; i++) {
            if(this.x > bricks[i].x){
                if (this.x <  (bricks[i].x + this.brickWidth)){
                    if(this.y >  bricks[i].y){
                        if(this.y < (bricks[i].y+this.brickHeight)){
                            this.y +=(this.vely>0)?-10:10
                            this.vely *= -1
                            this.velx = this.determineBounceVelocity(bricks[i])

                            const tween = createjs
                                .Tween
                                .get(bricks[i])
                                .to({
                                    alpha:0,
                                    scaleY:0.1,
                                    scaleX:0.1,
                                    x:bricks[i].x+(bricks[i].width/2),
                                    y:bricks[i].y+(bricks[i].height/2)
                                },
                                1000)

                            bricks.splice(i, 1) //out of the colision routine

                            this.game.score += 100
                            this.game.updateScore()
                            this.game.playSound("brickDeath")

                            if (bricks.length == 0) this.nextLevel()
                        }
                    }
                }
            }
        }
    }

    //ball out reset
    if (this.y >this.viewportHeight+50) {
        //if there's another ball just dissapear, reset otherwise
        const cant = this.game.currentLevel.balls.length
        if (cant>1) {
            this.game.currentLevel.balls.splice(this.id-1, 1)
            this.game.currentLevel.container.removeChild(this)

            return
        }

        this.game.lives--

        if (this.game.lives>=0) { //continue from this point
            this.game.updateScore()
            this.game.currentLevel.reset()
        } else { //game over
            this.game.gameover(false)
        }
    }
}

//move to the net level
Ball.prototype.nextLevel = function() {
    this.lowerBound=0 //force to recalculate bounds
    this.game.currentLevel.next()
}
//bounce velocity based on hit point on the paddle
Ball.prototype.determineBounceVelocity = function(paddle) {
    const ratio = (paddle.width/10)/2

    return ((this.x-paddle.x)/10)-ratio
}

// resolve superclass overwritten methods
// (e.g. Sprite.constructor -> Ball.Sprite_constructor)
createjs.promote(Ball, 'Sprite')