import {useEffect, useState} from 'react';
import './App.css';
import Tile from "./components/Tile";
import {screenToGridCoordinates} from "./utils/TileMapping";
import {WaveFunction} from "./utils/WaveFunction";
import {matrix} from "mathjs";


const socketList = {
    "0-0": {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
    },
    "1-0": {
        0: 1,
        1: 0,
        2: 0,
        3: 0,
    },
    "1-1": {
        0: 0,
        1: 1,
        2: 0,
        3: 0,
    },
    "1-2": {
        0: 0,
        1: 0,
        2: 1,
        3: 0,
    },
    "1-3": {
        0: 0,
        1: 0,
        2: 0,
        3: 1,
    },
    "2-0": {
        0: 1,
        1: 1,
        2: 0,
        3: 0,
    },
    "2-1": {
        0: 0,
        1: 1,
        2: 1,
        3: 0,
    },
    "2-2": {
        0: 0,
        1: 0,
        2: 1,
        3: 1,
    },
    "2-3": {
        0: 1,
        1: 0,
        2: 0,
        3: 1,
    },
    "3-0": {
        0: 1,
        1: 1,
        2: 1,
        3: 0,
    },
    "3-1": {
        0: 0,
        1: 1,
        2: 1,
        3: 1,
    },
    "3-2": {
        0: 1,
        1: 0,
        2: 1,
        3: 1,
    },
    "3-3": {
        0: 1,
        1: 1,
        2: 0,
        3: 1,
    },
    "4-0": {
        0: 1,
        1: 1,
        2: 1,
        3: 1,
    }
}

export default function App() {
    const waveFunction = new WaveFunction(19, socketList)
    const [tiles, setTiles] = useState(waveFunction.tiles);
    const [mouseGridXPosition, updateMouseGridXPosition] = useState(0)
    const [mouseGridZPosition, updateMouseGridZPosition] = useState(0)

    function onMouseMove(e) {
        let gridCoordinates = screenToGridCoordinates(matrix([[e.pageY], [e.pageX]]));
        if (waveFunction.gridCoordinateOutOfBounds(gridCoordinates)) {
            return;
        }
        updateMouseGridXPosition(gridCoordinates.get([0,0]))
        updateMouseGridZPosition(gridCoordinates.get([1,0]))
    }

    useEffect(() => {
        const display = setInterval(() => {
            if(!waveFunction.iterate()) {
                clearInterval(display)
            }
            setTiles(waveFunction.tiles.map(row => row.slice()))
        }, 0)
    }, [])

    useEffect(() => {
        const mouseGridPosition = matrix([[mouseGridXPosition], [mouseGridZPosition]])

        const newTiles = tiles.map(row => row.slice())
        newTiles[mouseGridPosition.get([0,0])][mouseGridPosition.get([1,0])].y = 24
        setTiles(newTiles)

        setTimeout(() => {
            const newTiles = tiles.map(row => row.slice())
            newTiles[mouseGridPosition.get([0,0])][mouseGridPosition.get([1,0])].y = 0
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