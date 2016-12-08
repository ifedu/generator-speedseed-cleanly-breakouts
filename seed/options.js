const set = (name, value, extra, exclude) => ({ name, value, extra, exclude })

module.exports = [{
    message: 'Game engine?',
    name: 'engine',

    choices: [
        set('CraftyJS', 'craftyjs'),
        set('CreateJS', 'createjs'),
        set('EnchantJS', 'enchantjs'),
        set('Entropy', 'entropy'),
        set('Frigame', 'frigame'),
        set('Phaser', 'phaser')
    ]
}, {
    message: 'HTML?',
    name: 'html',

    choices: [
        set('Jade', 'jade')
    ]
}, {
    message: 'JS?',
    name: 'js',

    choices: [
        set('BabelJS', 'babeljs', 'js')
    ]
}, {
    message: 'CSS?',
    name: 'css',

    choices: [
        set('SaSS', 'sass', 'sass')
    ]
}]