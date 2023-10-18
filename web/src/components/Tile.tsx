import {useEffect, useState} from "react";
import math, {matrix, multiply, inv} from "mathjs";
import {gridToScreenCoordinates, getZIndex} from "../utils/TileMapping"
import "./Tile.css"

export default function Tile({x, y, z}: {x: number; y: number; z: number}) {
    let screenCoordinates: math.Matrix = gridToScreenCoordinates(matrix([[x], [z]]))
    return (
        <img
            src={"/cube-tile.svg"}
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