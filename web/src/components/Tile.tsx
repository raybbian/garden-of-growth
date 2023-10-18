import {useEffect, useState} from "react";
import {matrix, multiply, inv} from "mathjs";
import "./Tile.css"

export default function Tile({x, y, z}: {x: number; y: number; z: number}) {
    const [yOffset, setYOffset] = useState(0);

    const tileWidth = 128;
    const tileHeight = 128;
    const posToScreen = matrix([
        [0.25 * tileWidth, 0.25 * tileWidth],
        [-0.5 * tileHeight, 0.5 * tileHeight]
    ])

    function getScreenCoordinates() {
        return multiply(posToScreen, matrix([[x],[z]]))
    }

    function getZIndex() {
        return x + z
    }

    function handleMouseEnter(e: any) {
        setYOffset(24);
    }

    function handleMouseLeave(e: any) {
        setYOffset(0);
    }

    return (
        <img
            src={"/cube-tile.svg"}
            alt={`cube-tile-${x}-${z}`}
            className={"scale-100 absolute tile -translate-x-1/2"}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                top: `${getScreenCoordinates().get([0, 0]) - (y + yOffset)}px`,
                left: `${getScreenCoordinates().get([1, 0])}px`,
                zIndex: getZIndex()
            }}
        ></img>
    );
}