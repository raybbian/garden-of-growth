import {matrix, add, multiply, inv, floor, subtract} from "mathjs"

const tileWidth = 128;
const tileHeight = 128;
const screenOrigin = matrix([
    [0],
    [window.screen.width / 2],
])
const posToScreen = matrix([
    [0.25 * tileWidth, 0.25 * tileWidth],
    [-0.5 * tileHeight, 0.5 * tileHeight]
])

export function gridToScreenCoordinates(gridCoordinates) {
    const x = gridCoordinates.get([0, 0])
    const z = gridCoordinates.get([1, 0])
    return add(multiply(posToScreen, matrix([[x],[z]])), screenOrigin)
}

export function screenToGridCoordinates(screenCoordinates) {
    const x = screenCoordinates.get([0, 0])
    const z = screenCoordinates.get([1, 0])
    return floor(multiply(inv(posToScreen), subtract(matrix([[x], [z]]), screenOrigin)))
}

export function getZIndex(x, z) {
    return x + z
}
