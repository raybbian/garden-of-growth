import {useEffect, useState} from 'react';
import './App.css';
import Tile from "./components/Tile";
import {screenToGridCoordinates} from "./utils/TileMapping";
import {matrix} from "mathjs";


import SimpleTiledModel from "./wfc/simple-tiled-model";

export default function App() {
    const [tiles, setTiles] = useState(initTiles());
    const [mouseGridXPosition, updateMouseGridXPosition] = useState(0)
    const [mouseGridZPosition, updateMouseGridZPosition] = useState(0)

    function onMouseMove(e) {
        let gridCoordinates = screenToGridCoordinates(matrix([[e.pageY], [e.pageX]]));
        const x = gridCoordinates.get([0,0])
        const z = gridCoordinates.get([1,0])
        if (x < 0 || z < 0 || x >= 19 || z >= 19) return;
        updateMouseGridXPosition(x)
        updateMouseGridZPosition(z)
    }

    function initTiles() {
        const tilesInit = [];
        for(let i = 0; i < 19; i++) {
            tilesInit[i] = []
            for(let j = 0; j < 19; j++) {
                tilesInit[i][j] = {"x": i, "y": 0, "z": j, "type": "cube-tile"}
            }
        }
        return tilesInit
    }

    useEffect(() => {
        const data = require('./wfc/example/data/castle.definition')
        const wfc = new SimpleTiledModel(data, null, 20, 20, false);
    }, []);

    useEffect(() => {
        const newTiles = tiles.map(row => row.slice())
        newTiles[mouseGridXPosition][mouseGridZPosition].y = 24
        setTiles(newTiles)

        setTimeout(() => {
            const newTiles = tiles.map(row => row.slice())
            newTiles[mouseGridXPosition][mouseGridZPosition].y = 0
            setTiles(newTiles)
        }, 1000)
    }, [mouseGridXPosition, mouseGridZPosition])

    return (
        <div
            className={"relative"}
            onMouseMove={onMouseMove}
        >
            {tiles.map((tileRow, rowIndex) => (
                <div key={rowIndex}>
                    {tileRow.map((tile, colIndex) => (
                        <Tile key={`${rowIndex}-${colIndex}`} x={tile.x} y={tile.y} z={tile.z} type={tile.type}/>
                    ))}
                </div>
            ))}
        </div>
    );
}