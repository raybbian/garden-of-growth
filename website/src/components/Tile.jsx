import {matrix} from "mathjs";
import {gridToScreenCoordinates, getZIndex} from "../utils/tile-mapping"
import "./Tile.css"
import React from "react";

export default function Tile({x, y, z, src}) {
    const screenCoordinates = gridToScreenCoordinates(matrix([[x], [z]]))

    return (
        <img
            src={`${src}`}
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