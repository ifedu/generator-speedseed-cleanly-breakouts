/**
 * Init screen class
 */

window.GameOverScreen = function(background, logo, world, isLast) {
    this.initialize(background, logo, world, isLast)
}

GameOverScreen.prototype.initialize = function(background, logo, world, isLast) {
    this.background = background
    this.logo = logo
    this.game = world

    const msg = (isLast)
        ? '    All our bricks\nare belong to you!'
        : 'Game Over'

    this.instructions = new createjs.Text(msg, '24px Arial', '#000')
    this.clickText = new createjs.Text('Click here to start', '24px Arial', '#000')
    this.clickText.hitArea = new createjs.Shape()
    this.clickText
    .hitArea
    .graphics
    .beginFill('#000')
    .drawRect(0, 0, this.clickText.getMeasuredWidth(), this.clickText.getMeasuredHeight())

    this.createScreen()
}

GameOverScreen.prototype.createScreen = function() {
    const back = new createjs.Bitmap(this.background)
    this.game.stage.addChild(back)

    const logo = new createjs.Bitmap(this.logo)
    const stageDim = this.game.stage.getBounds()
    const logoDim = logo.getBounds()

    logo.x = (stageDim.width / 2) - (logoDim.width / 2)
    logo.y = 30

    const clickDim = this.clickText.getBounds()
    const instDim = this.clickText.getBounds()

    this.clickText.y = logo.y + logoDim.height + 30
    this.clickText.x = (stageDim.width / 2) - (clickDim.width / 2)
    this.instructions.x = (stage.width / 2)

    this.instructions.y = stageDim.height - 50
    this.game.stage.addChild(logo)
        //add Text
    this.game.stage.addChild(this.clickText)
    this.game.stage.addChild(this.instructions)

    const bounds = this.instructions.getBounds()

    this.instructions.x -= Math.abs(bounds.width / 2)
    this.game.stage.update()

    //wait for Click
    this.clickText.addEventListener('click', this.game.reinit)

}
