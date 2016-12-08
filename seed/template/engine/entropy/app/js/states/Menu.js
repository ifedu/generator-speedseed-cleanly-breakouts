Entropy.State({
    name: 'Menu',

    initialize(game, done) {
        this.menuScreen = document.querySelector('.menu-screen')

        return done()
    },

    enter(game, done) {
        this.startGameHandler = (e) => game.state.change('Gameplay')

        this.menuScreen.addEventListener('click', this.startGameHandler)

        fadeInScreen('.menu-screen', () => done())
    },

    exit(game, done) {
        this.menuScreen.removeEventListener('click', this.startGameHandler)

        fadeOutScreen('.menu-screen', () => done())
    }
})