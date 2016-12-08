/*global jQuery, friGame, G */
/*jslint white: true, browser: true */

(($, fg) => {
    'use strict';

    const r = 'red'
    const b = 'blue'
    const o = 'orange'
    const g = 'green'
    const X = null

    G.LevelSetups = [{
        name: 'letsa begin',
        powerUps: 1,
        powerDowns: 1,

        bricks: [
            [X, X, g, o, g, X, X],
            [o, b, g, g, g, b, o],
            [X, b, b, b, b, b, X]
        ]
    }, {
        name: "how's it going?",
        powerUps: 1,
        powerDowns: 1,

        bricks: [
            [X, g, o, g, o, g, X],
            [X, b, b, b, b, b, X],
            [g, b, r, b, r, b, g],
            [g, b, b, b, b, b, g],
            [g, b, X, X, X, b, g],
            [X, b, b, b, b, b, X]
        ]
    }, {
        name: 'tie fighta!',
        powerUps: 2,
        powerDowns: 2,

        bricks: [
            [X, b, X, g, X, b, X],
            [b, X, b, o, b, X, b],
            [b, g, b, o, b, g, b],
            [b, X, b, o, b, X, b],
            [X, b, X, X, X, b, X],
            [r, X, r, X, r, X, r]
        ]
    }, {
        name: 'swirl',
        powerUps: 2,
        powerDowns: 3,

        bricks: [
            [r, g, o, b, r, g, o],
            [b, X, X, X, X, X, X],
            [o, X, o, b, r, g, o],
            [g, X, g, X, X, X, b],
            [r, X, r, X, r, X, r],
            [b, X, b, o, g, X, g],
            [o, X, X, X, X, X, o],
            [g, r, b, o, g, r, b]
        ]
    }]
})(jQuery, friGame)