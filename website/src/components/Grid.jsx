import {useEffect, useRef, useState} from "react";
import {SimpleTiledModel} from "../terrain/simple-tiled-model";
import MemoizedTile from "./Tile";

export default function Grid({progress}) {

    const destWidth = 16;
    const destHeight = 16;
    const tileSize = 48;

    const [tiles, setTiles] = useState(initTiles());

    //only have one model for each grid, but clear it on refresh instead of making a new one
    //i might change this back if different stages require different models, but I could also just store 4 models in refs as well
    const dataRef = useRef(require('../terrain/japanese'))
    const modelRef = useRef(new SimpleTiledModel(dataRef.current, null, destWidth, destHeight, false))

    const [scale, setScale] = useState(1)

    function initTiles() {
        const newTiles = new Array(destWidth * destHeight)
        for (let i = 0; i < newTiles.length; i++) {
            const z = i % destWidth;
            const x = i / destWidth | 0;
            newTiles[i] = {
                "x": x - destWidth / 2,
                "y": 0,
                "z": z - destHeight / 2,
                // "spriteData": {x: '0', y: '0', w:'48', h: '48'},
                "spriteData": {x: '48', y: '144', w: '48', h: '48'},
            }
        }
        return newTiles;
    }

    function updateTiles() {
        const data = dataRef.current
        const model = modelRef.current;

        const newTiles = [...initTiles()]
        const placeAmount = Math.floor(progress * (model.process.length - 1)) + 1
        for (let i = 0; i < placeAmount; i++) {
            for (let j = 0; j < model.process[i].length; j++) {
                const pos = model.process[i][j][0];
                const z = pos % destWidth;
                const x = pos / destWidth | 0;
                newTiles[pos] = {
                    "x": x - destWidth / 2,
                    "z": z - destHeight / 2,
                    "spriteData": data.tiles[model.process[i][j][1]].sprite
                }
            }
        }
        setTiles(newTiles)
    }

    //initialize the model and generate once the page (and grid) loads
    useEffect(() => {
        const model = modelRef.current;
        while (!model.generate()) {
            model.clear()
        }
        updateTiles()
    }, []);

    useEffect(() => {
        updateTiles()
    }, [progress, scale]);

    //for resizing events
    useEffect(() => {
        const handleResize = function () {
            setScale(Math.max(Math.floor(window.innerWidth / 16 / tileSize), 1))
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
                    top: `${1.5 * tileSize}px`,
                }}
            >
                {tiles.map((tile, tileNum) => (
                    <MemoizedTile
                        key={tileNum}
                        x={tile.x}
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