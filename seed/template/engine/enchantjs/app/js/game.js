/****************************************
 * enchant.js version of Breakout
 *
 * by Maciej Kus http://maciejkus.com/
 *
 * http://enchantjs.com/
 *
 * created for http://www.jsbreakouts.org/
 ****************************************/

window.gameWidth = 320,
window.gameHeight = 416,
window.lives = 3,
window.score = 0,
window.level = 1

//load enchant
enchant()

window.onload = () => {
    const game = new Core(gameWidth,gameHeight)

    game.scale = 1
    game.fps = 50

    game.preload(
        'assets/bg_prerendered.png',
        'assets/tiles.png',
        'assets/logo.png',
        'assets/sfx/brickDeath.mp3',
        'assets/sfx/countdownBlip.mp3',
        'assets/sfx/powerdown.mp3',
        'assets/sfx/powerup.mp3',
        'assets/sfx/recover.mp3'
    )

    //once game loaded
    game.onload = () => {
        const scene = new textScene('enchant.js')

        game.pushScene(scene)
    }

    game.start()
}