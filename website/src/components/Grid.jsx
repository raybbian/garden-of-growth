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

    const [tileSize, setTileSize] = useState(window.innerWidth >= 1920 ? 128 : 64);

    function updateTiles() {
        const path = dataRef.current.path
        const tileFormat = dataRef.current.tileFormat
        const model = modelRef.current;
        if (!model.observed) return;

        const newTiles = tiles.slice()
        for(let i = 0; i < destWidth; i++) {
            for(let j = 0; j < destHeight; j++) {
                if (model.observed[i * destHeight + j] !== undefined) {
                    const index = model.observed[i * destHeight + j]
                    const name = model.tiles[index]
                    newTiles[i * destHeight + j] = {
                        "x": i - destWidth/2,
                        "y": 0,
                        "z": j - destHeight/2,
                        "src": `${process.env.PUBLIC_URL}${path}/${tileSize}/${name}.${tileFormat}`
                    }
                } else {
                    newTiles[i * destHeight + j] = {
                        "x": i - destWidth/2,
                        "y": 0,
                        "z": j - destHeight/2,
                        "src": `${process.env.PUBLIC_URL}${path}/${tileSize}/empty.${tileFormat}`
                    }
                }
            }
        }
        setTiles(newTiles)
    }

    //initialize the model and generate once the page (and grid) loads
    useEffect(() => {
        const model = modelRef.current;
        const display = setInterval(() => {
            const result = model.iterate(1)
            if (result === false) {
                model.clear()
            } else if (model.isGenerationComplete()) {
                clearInterval(display)
                return;
            }
            updateTiles()
        }, 0)
        return () => {
            model.clear()
        }
    }, [state]);


    function handleResize() {
        if (window.innerWidth >= 1920) {
            setTileSize(128)
        } else {
            setTileSize(64)
        }
    }

    useEffect(() => {
        updateTiles()
    }, [tileSize])

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);


    return (
        <div className={"h-full w-full overflow-hidden select-none pointer-events-none "}>
            <div
                className={"relative translate-x-1/2 translate-y-1/2 w-full h-full"}
            >
                {tiles.map((tile, tileNum) => (
                    <MemoizedTile key={tileNum} x={tile.x} y={tile.y} z={tile.z} src={tile.src} tileSize={tileSize}/>
                ))}
            </div>
        </div>
    )
}