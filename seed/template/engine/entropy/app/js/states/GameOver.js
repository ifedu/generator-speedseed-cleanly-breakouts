Entropy.State({
    name: 'GameOver',

    enter(game, done) {
        fadeInScreen('.gameover-screen', () => done())
    },

    exit(game, done) {
        fadeOutScreen('.gameover-screen', () => done())
    }
})