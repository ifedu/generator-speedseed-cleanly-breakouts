Crafty.c('Center', {
    init() {
        this.attr({
            x: Crafty.stage.elem.clientWidth / 2 - this.w / 2,
            y: Crafty.stage.elem.clientHeight / 2 - this.h / 2
        })
    }
})