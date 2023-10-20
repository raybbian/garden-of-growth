import {matrix} from "mathjs";
import {gridToScreenCoordinates, getZIndex} from "../utils/TileMapping"
import "./Tile.css"
import React from "react";

export default function Tile({x, y, z, type}) {
    const screenCoordinates = gridToScreenCoordinates(matrix([[x], [z]]))

    return (
        <img
            src={`/tiles/${type}.svg`}
            alt={`cube-tile-${x}-${z}`}
            className={"scale-100 absolute tile -translate-x-1/2"}
            style={{
                top: `${screenCoordinates.get([0, 0]) - y}px`,
                left: `${screenCoordinates.get([1, 0])}px`,
                zIndex: getZIndex(x, z)
            }}
        ></img>
    );
}