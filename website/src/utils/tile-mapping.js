/*
const posToScreen = [
    [0.25 * tileWidth, 0.25 * tileWidth],
    [-0.5 * tileHeight, 0.5 * tileHeight]
]
*/

export function gridToScreenCoordinates(x, z, tileSize) {
    return [[0.25 * tileSize * x + 0.25 * tileSize * z], [-0.5 * tileSize * x + 0.5 * tileSize * z]]
}

/*
export function screenToGridCoordinates(screenCoordinates) {
    const x = screenCoordinates.get([0, 0])
    const z = screenCoordinates.get([1, 0])
    return floor(multiply(inv(posToScreen), matrix([[x], [z]])))
}
*/

export function getZIndex(x, z) {
    return x + z - 999
}

/*
export function gridCoordinateOutOfBounds(gridCoordinates, destWidth, destHeight) {
    const x = gridCoordinates.get([0,0])
    const z = gridCoordinates.get([1,0])
    return (x < 0 || z < 0 || x >= destWidth || z >= destHeight)
}*/
