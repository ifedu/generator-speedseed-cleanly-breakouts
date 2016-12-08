Entropy.Entity({
    name: 'WallTop',

    create(game) {
        const plane = new p2.Body({
            position : [0, 19.2],
            angle: Math.PI,
        })

        const planeShape = new p2.Plane()

        planeShape.material = game.materials.wallMaterial

        plane.addShape(planeShape)

        game.world.addBody(plane)

        this.add('Body', plane)
    }
})