import {useEffect, useRef, useState} from "react";
import {SimpleTiledModel} from "../wfc/simple-tiled-model";
import {gridCoordinateOutOfBounds, screenToGridCoordinates} from "../utils/tile-mapping";
import {matrix} from "mathjs";
import MemoizedTile from "./Tile";
import data from "../wfc/green.definition";

export default function Grid({state, setState}) {

    const destWidth = 16;
    const destHeight = 16;

    const [tiles, setTiles] = useState(new Array(destWidth * destHeight));

    const [mouseGridXCoordinate, setMouseGridXCoordinate] = useState(0);
    const [mouseGridZCoordinate, setMouseGridZCoordinate] = useState(0);


    //only have one model for each grid, but clear it on refresh instead of making a new one
    //i might change this back if different stages require different models, but I could also just store 4 models in refs as well
    const dataRef = useRef(require('../wfc/path.definition'))
    const modelRef = useRef(new SimpleTiledModel(dataRef.current, null, destWidth, destHeight, false))


    //initialize the model and generate once the page (and grid) loads
    useEffect(() => {
        const path = dataRef.current.path
        const tileFormat = dataRef.current.tileFormat
        const model = modelRef.current;
        model.clear()
        const display = setInterval(() => {
            if (!model.iterate(1)) {
                clearInterval(display)
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
                            "src": `${process.env.PUBLIC_URL}${path}/${name}.${tileFormat}`
                        }
                    } else {
                        newTiles[i * destHeight + j] = {
                            "x": i,
                            "y": 0,
                            "z": j,
                            "src": `${process.env.PUBLIC_URL}${path}/empty.${tileFormat}`
                        }
                    }
                }
            }
            setTiles(newTiles)
            if (model.isGenerationComplete()) {
                clearInterval(display)
            }
        }, 0)
    }, [state]);


    //gets the grid position x z of the mouse and stores it in state
    const gridDivRef = useRef(null)
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


    //pushes the tile up whenever the mouse grid position has changed
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
            className={"relative translate-x-1/2 translate-y-16 w-full h-full"}
            onMouseMove={onMouseMove}
            ref={gridDivRef}
        >
            {tiles.map((tile, tileNum) => (
                <MemoizedTile key={tileNum} x={tile.x} y={tile.y} z={tile.z} src={tile.src} scale={100}/>
            ))}
        </div>
    )
}