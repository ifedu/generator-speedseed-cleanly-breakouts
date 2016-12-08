window.addEventListener('load', () => {
    window.game = new Entropy.Game()

    fadeInScreen('.loading-screen', () => game.state.change('Loading'))
})

//Some helper CSS animation functions
window.fadeOutScreen = (screen, done) => {
    const screenElement = document.querySelector(screen)

    screenElement.classList.add('fade-out')

    const animationEnd = () => {
        off(screenElement, 'animationend', animationEnd)

        screenElement.classList.remove('fade-out')
        screenElement.classList.remove('active')

        return done()
    }

    on(screenElement, 'animationend', animationEnd)
}

window.fadeInScreen = (screen, done) => {
    const screenElement = document.querySelector(screen)

    screenElement.classList.add('fade-in')
    screenElement.classList.add('active')

    const animationEnd = function () {
        off(screenElement, 'animationend', animationEnd)

        screenElement.classList.remove('fade-in')

        return done()
    }

    on(screenElement, 'animationend', animationEnd)
}

window.on = (element, type, callback) => {
    const pfx = ['webkit', 'moz', 'MS', 'o', '']

    for (let p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase()

        element.addEventListener(pfx[p]+type, callback, false)
    }
}

window.off = (element, type, callback) => {
    const pfx = ['webkit', 'moz', 'MS', 'o', '']

    for (let p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase()

        element.removeEventListener(pfx[p]+type, callback, false)
    }
}

window.pad = (n, width, z) => {
    z = z || '0'
    n = n + ''

    return n.length >= width
        ? n
        : new Array(width - n.length + 1).join(z) + n
}

window.clamp = (value, min, max) => {
    if (value < min) return min

    if (value > max) return max

    return value
}