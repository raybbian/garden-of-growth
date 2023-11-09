/*
const posToScreen = [
    [0.25 * tileWidth, 0.25 * tileWidth],
    [-0.5 * tileHeight, 0.5 * tileHeight]
]
*/

export function gridToScreenCoordinates(x, z, tileSize) {
    return [[0.25 * tileSize * x + 0.25 * tileSize * z], [-0.5 * tileSize * x + 0.5 * tileSize * z]]
}

export function getZIndex(x, z) {
    return x + z - 999
}
