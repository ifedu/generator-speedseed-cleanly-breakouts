{
window.breakout = window.breakout || {}

breakout.TILE_SIZE = 16

breakout.IS_MOBILE = (() => {
    try {
        document.createEvent("TouchEvent")

        return true
    } catch (e) {
        return false
    }
})()

window.onload = () => {
    Crafty.init(320, 416, document.getElementById('cr-stage'))
    Crafty.canvas.init()
    Crafty.scene('loading')

    setTimeout(() => window.scrollTo(0, 1), 1)
}
}