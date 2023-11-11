import {useEffect, useRef, useState} from "react";
import {SimpleTiledModel} from "../terrain/simple-tiled-model";
import MemoizedTile from "./Tile";
import {get} from "axios";

export default function Grid({state, setState}) {

    const destWidth = 16;
    const destHeight = 16;
    const tileSize = 48;

    const [tiles, setTiles] = useState(new Array(destWidth * destHeight));

    //only have one model for each grid, but clear it on refresh instead of making a new one
    //i might change this back if different stages require different models, but I could also just store 4 models in refs as well
    const dataRef = useRef(require('../terrain/japanese'))
    const modelRef = useRef(new SimpleTiledModel(dataRef.current, null, destWidth, destHeight, false))
    modelRef.current.place(180, 5)

    const [scale, setScale] = useState(2)

    function updateTiles() {
        const data = dataRef.current
        const model = modelRef.current;
        if (!model.observed) return;

        const newTiles = [...tiles];
        for(let i = 0; i < destWidth; i++) {
            for(let j = 0; j < destHeight; j++) {
                if (model.observed[i * destHeight + j] !== undefined) {
                    const index = model.observed[i * destHeight + j]
                    newTiles[i * destHeight + j] = {
                        "x": i - destWidth/2,
                        "y": 0,
                        "z": j - destHeight/2,
                        "spriteData": data.tiles[index].sprite,
                    }
                } else {
                    newTiles[i * destHeight + j] = {
                        "x": i - destWidth/2,
                        "y": 0,
                        "z": j - destHeight/2,
                        "spriteData": {x: '48', y: '144', w:'48', h: '48'}
                    }
                }
            }
        }
        setTiles(newTiles)
    }

    //initialize the model and generate once the page (and grid) loads
    useEffect(() => {
        const model = modelRef.current;
        model.place(180, 5)
        const display = setInterval(() => {
            const result = model.iterate(1)
            if (result === false) {
                model.clear()
                model.place(180, 5)
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
        setScale(Math.floor(window.innerWidth / 16 / tileSize))
    }

    useEffect(() => {
        updateTiles()
    }, [scale])

    useEffect(() => {
        for(let dir = 0; dir < 4; dir++) {
            for(let i = 0; i < modelRef.current.propagator[dir][21].length; i++) {
                console.log(dir, modelRef.current.tiles[modelRef.current.propagator[dir][21][i]])
            }
        }



        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);


    return (
        <div className={"h-full w-full overflow-hidden select-none pointer-events-none"}>
            <div
                className={"relative w-full h-full translate-x-1/2 translate-y-1/2"}
                style={{
                    top: `${1.5*tileSize}px`,
                }}
            >
                {tiles.map((tile, tileNum) => (
                    <MemoizedTile
                        key={tileNum}
                        x={tile.x}
                        y={tile.y}
                        z={tile.z}
                        spriteData={tile.spriteData}
                        spriteSheet={`${process.env.PUBLIC_URL}/${dataRef.current.sprites[scale]}`}
                        tileSize={tileSize}
                        scale={scale}
                    />
                ))}
            </div>
        </div>
    )
}