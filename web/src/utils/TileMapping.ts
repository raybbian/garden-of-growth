import math, {matrix, multiply, inv, floor} from "mathjs"

const tileWidth = 128;
const tileHeight = 128;
const numTiles = 20;
const posToScreen = matrix([
    [0.25 * tileWidth, 0.25 * tileWidth],
    [-0.5 * tileHeight, 0.5 * tileHeight]
])

export function gridToScreenCoordinates(gridCoordinates: math.Matrix) {
    let x = gridCoordinates.get([0, 0])
    let z = gridCoordinates.get([1, 0])
    return multiply(posToScreen, matrix([[x],[z]]))
}

export function screenToGridCoordinates(screenCoordinates: math.Matrix) {
    let x = screenCoordinates.get([0, 0])
    let z = screenCoordinates.get([1, 0])
    return floor(multiply(inv(posToScreen), matrix([[x], [z]])))
}

export function getZIndex(x: number, z: number) {
    return x + z
}

export function initTiles() {
    let tiles : any[][] = []
    for(let i = 0; i < numTiles; i++) {
        tiles[i] = []
        for(let j = 0; j < numTiles; j++) {
            tiles[i].push({"x": i, "y": 0, "z": j})
        }
    }
    return tiles
}

export function gridCoordinateOutOfBounds(gridCoordinates: math.Matrix) {
    let x = gridCoordinates.get([0, 0])
    let z = gridCoordinates.get([1, 0])
    return (x < 0 || z < 0 || x >= numTiles || z >= numTiles)
}