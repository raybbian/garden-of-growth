import {floor, inv, matrix, multiply} from "mathjs";


export function gridToScreenCoordinates(x, z, tileSize) {
    const posToScreen = matrix([
        [0.25 * tileSize, 0.25 * tileSize],
        [-0.5 * tileSize, 0.5 * tileSize]
    ])
    const result = multiply(posToScreen, matrix([[x], [z]]))
    return [result.get([0, 0]), result.get([1, 0])]
}

/*
* 0.25 * tileSize   0.25 * tileSize
* -0.5 * tileSize    0.5 * tileSize
* */

/*
* 2 / tileSize   -1 / tileSize
* 2 / tileSize    1 / tileSize
* */

export function screenToGridCoordinates(y, x, tileSize) {
    const posToScreen = matrix([
        [0.25 * tileSize, 0.25 * tileSize],
        [-0.5 * tileSize, 0.5 * tileSize]
    ])
    const result = floor(multiply(inv(posToScreen), matrix([[y], [x]])))
    return [result.get([0, 0]), result.get([1, 0])]
}

export function getZIndex(x, z) {
    return x + z - 999
}
