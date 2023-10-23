import {useEffect, useRef, useState} from "react";
import {SimpleTiledModel} from "../wfc/simple-tiled-model";
import {gridCoordinateOutOfBounds, screenToGridCoordinates} from "../utils/tile-mapping";
import {matrix} from "mathjs";
import Tile from "./Tile";

export default function Grid() {

    const destWidth = 16;
    const destHeight = 16;

    const [tiles, setTiles] = useState(new Array(destWidth * destHeight));

    const [mouseGridXCoordinate, setMouseGridXCoordinate] = useState(0);
    const [mouseGridZCoordinate, setMouseGridZCoordinate] = useState(0);

    useEffect(() => {
        const data = require('../wfc/redstone.definition')
        const model = new SimpleTiledModel(data, null, destWidth, destHeight, false);

        const display = setInterval(() => {
            if (!model.iterate(1)) {
                model.clear()
                setTiles(new Array(destWidth * destHeight))
                return
            }
            const newTiles = tiles.slice()
            for(let i = 0; i < destWidth; i++) {
                for(let j = 0; j < destHeight; j++) {
                    if (model.observed[i * destHeight + j] !== undefined) {
                        const index = model.observed[i * destHeight + j]
                        const name = model.tiles[index]
                        newTiles[i * destHeight + j] = {
                            "x": i,
                            "y": 0,
                            "z": j,
                            "src": `${process.env.PUBLIC_URL}/tiles/green/${name}.png`
                        }
                    } else {
                        newTiles[i * destHeight + j] = {
                            "x": i,
                            "y": 0,
                            "z": j,
                            "src": `${process.env.PUBLIC_URL}/tiles/green/empty.png`
                        }
                    }
                }
            }
            setTiles(newTiles)
            if (model.isGenerationComplete()) {
                clearInterval(display)
            }
        }, 0)
    }, []);

    function onMouseMove(e) {
        if (!gridDivRef.current) {
            return
        }
        const rect = gridDivRef.current.getBoundingClientRect()
        const rz = e.clientX - rect.left;
        const rx = e.clientY - rect.top;
        const gridCoordinates = screenToGridCoordinates(matrix([[rx], [rz]]))
        setMouseGridXCoordinate(gridCoordinates.get([0,0]))
        setMouseGridZCoordinate(gridCoordinates.get([1,0]))
    }


    const gridDivRef = useRef(null)
    useEffect(() => {
        const newTiles = tiles.slice()
        const x = mouseGridXCoordinate
        const z = mouseGridZCoordinate
        if (gridCoordinateOutOfBounds(matrix([[x],[z]]), destWidth, destHeight) || newTiles[x * destHeight + z] === undefined) return;
        newTiles[x * destHeight + z].y = 24
        setTiles(newTiles)
    }, [mouseGridXCoordinate, mouseGridZCoordinate]);

    return (
        <div
            className={"relative translate-x-1/2 translate-y-16"}
            onMouseMove={onMouseMove}
            ref={gridDivRef}
        >
            {tiles.map((tile, tileNum) => (
                <Tile key={tileNum} x={tile.x} y={tile.y} z={tile.z} src={tile.src}/>
            ))}
        </div>
    )
}