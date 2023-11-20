import {useEffect, useRef, useState} from "react";
import {SimpleTiledModel} from "../terrain/simple-tiled-model";
import MemoizedTile from "./Tile";
import {screenToGridCoordinates} from "../utils/tile-mapping";

export default function Grid({progress, raisedTilesRef, raiseTile}) {

    const destLen = 16;
    const tileSize = 48;

    const [tiles, setTiles] = useState(initTiles());

    //only have one model for each grid, but clear it on refresh instead of making a new one
    //i might change this back if different stages require different models, but I could also just store 4 models in refs as well
    const dataRef = useRef(require('../terrain/japanese'))
    const modelRef = useRef(new SimpleTiledModel(dataRef.current, null, destLen, destLen, false))

    const [scale, setScale] = useState(1)
    const init = useRef(true);

    function initTiles() {
        const newTiles = new Array(destLen * destLen)
        for (let i = 0; i < newTiles.length; i++) {
            const z = i % destLen;
            const x = i / destLen | 0;
            newTiles[i] = {
                "x": x - destLen / 2,
                "y": 0,
                "z": z - destLen / 2,
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
                newTiles[pos].spriteData = data.tiles[model.process[i][j][1]].sprite
                if (raisedTilesRef.current.includes(pos)) {
                    newTiles[pos].y = 10;
                }
            }
        }
        setTiles(newTiles)
    }

    useEffect(() => {
        if (init.current) return;
        updateTiles()
    }, [progress, scale]);

    useEffect(() => {
        const model = modelRef.current;
        while (!model.generate()) {
            model.clear()
        }
        updateTiles()
        const handleResize = function () {
            setScale(Math.max(Math.floor(window.innerWidth / 16 / tileSize), 1))
        }
        handleResize()
        init.current = false

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);


    const gridRef = useRef(null);
    const [mouseOnX, setMouseOnX] = useState(0)
    const [mouseOnZ, setMouseOnZ] = useState(0)

    function handleMouseMove(e) {
        if (gridRef == null) return;
        const {clientX, clientY} = e;
        const {left, top} = gridRef.current.getBoundingClientRect();

        const relativeX = clientX - left;
        //because all tiles are shifted tileSize up, need to do same with Y
        const relativeY = clientY - top + scale * tileSize

        const gridPos = screenToGridCoordinates(relativeY, relativeX, scale * tileSize)
        setMouseOnX(gridPos[0])
        setMouseOnZ(gridPos[1])
    }

    useEffect(() => {
        if (init.current) return;
        if (mouseOnX < -destLen / 2 || mouseOnZ < -destLen / 2 || mouseOnX >= destLen / 2 || mouseOnZ >= destLen / 2) return;
        const idx = (mouseOnX + destLen / 2) * destLen + (mouseOnZ + destLen / 2);
        raiseTile(idx)
        updateTiles()
    }, [mouseOnX, mouseOnZ])


    return (
        <div
            className={"h-full w-full overflow-hidden select-none"}
        >
            <div
                className={"relative w-full h-full translate-x-1/2 translate-y-1/2"}
                onMouseMove={(e) => handleMouseMove(e)}
                ref={gridRef}
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