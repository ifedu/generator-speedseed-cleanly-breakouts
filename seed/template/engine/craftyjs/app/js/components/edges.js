Crafty.c('Edges', {
    init() {
        Object.defineProperties(this, {
            left: {
                get() {
                    return this.x
                }
            },
            right: {
                get() {
                    return this.x + this.w
                }
            },
            top: {
                get() {
                    return this.y
                }
            },
            bottom: {
                get() {
                    return this.y + this.h
                }
            },
            centerX: {
                get() {
                    return this.x + this.w / 2
                }
            },
            centerY: {
                get() {
                    return this.y + this.h / 2
                }
            },
            center: {
                get() {
                    return {
                        x: this.centerX,
                        y: this.centerY
                    }
                }
            }
        })
    }
})