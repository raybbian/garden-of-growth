import {useEffect, useRef, useState} from "react";
import {SimpleTiledModel} from "../terrain/simple-tiled-model";
import MemoizedTile from "./Tile";

export default function Grid({state, setState}) {

    const destWidth = 16;
    const destHeight = 16;

    const [tiles, setTiles] = useState(new Array(destWidth * destHeight));

    //only have one model for each grid, but clear it on refresh instead of making a new one
    //i might change this back if different stages require different models, but I could also just store 4 models in refs as well
    const dataRef = useRef(require('../terrain/path.definition'))
    const modelRef = useRef(new SimpleTiledModel(dataRef.current, null, destWidth, destHeight, false))


    //initialize the model and generate once the page (and grid) loads
    useEffect(() => {
        const path = dataRef.current.path
        const tileFormat = dataRef.current.tileFormat
        const model = modelRef.current;
        model.clear()
        const display = setInterval(() => {
            if (!model.iterate(1) || model.isGenerationComplete()) {
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
        }, 0)
    }, [state]);


    return (
        <div
            className={"relative translate-x-1/2 translate-y-16 w-full h-full"}
        >
            {tiles.map((tile, tileNum) => (
                <MemoizedTile key={tileNum} x={tile.x} y={tile.y} z={tile.z} src={tile.src} scale={100}/>
            ))}
        </div>
    )
}