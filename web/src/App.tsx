import React, {useRef, useState} from 'react';
import './App.css';
import Tile from "./components/Tile";
import {initTiles, screenToGridCoordinates, gridCoordinateOutOfBounds} from "./utils/TileMapping";
import {matrix} from "mathjs";

export default function App() {
    const [tiles, setTiles] = useState(initTiles());


    function onMouseMove(e: any) {
        let gridCoordinates = screenToGridCoordinates(matrix([[e.pageY], [e.pageX]]));
        if (gridCoordinateOutOfBounds(gridCoordinates)) {
            return;
        }

        //copy the current tiles, modify the one tile, and reset the state
        const newTiles = tiles.map(row => row.slice())
        newTiles[gridCoordinates.get([0,0])][gridCoordinates.get([1,0])].y = 24
        setTiles(newTiles)
    }

    return (
        <div
            className={"relative"}
            onMouseMove={onMouseMove}
        >
            {tiles.map((tileRow: any[], rowIndex: number) => (
                <div key={rowIndex}>
                    {tileRow.map((tile: any, colIndex: number) => (
                        <Tile x={tile.x} y={tile.y} z={tile.z}/>
                    ))}
                </div>
            ))}
        </div>
    );
}