import {useEffect, useRef, useState} from "react";
import {SimpleTiledModel} from "../terrain/simple-tiled-model";
import MemoizedTile from "./Tile";
import {screenToGridCoordinates} from "../utils/tile-mapping";

export default function Grid({progress}) {

    const destLen = 16; //the side length of the grid
    const tileSize = 48; //the width of each tile, in pixels

    const [tiles, setTiles] = useState(initTiles()); //stores the tiles themselves, where each element is an object
    const [scale, setScale] = useState(1) //stores the scale of the tiles (depends on screen width)
    const [raisedTiles, setRaisedTiles] = useState([]) //list of tiles that should be raised ATM
    const [mouseOnX, setMouseOnX] = useState(-999) //grid x position of the mouse
    const [mouseOnZ, setMouseOnZ] = useState(-999) //grid z position of the mouse

    const gridRef = useRef(null); //ref to the contained that holds the grid
    const dataRef = useRef(require('../terrain/japanese')) //stores the data for the model
    const modelRef = useRef(new SimpleTiledModel(dataRef.current, null, destLen, destLen, false)) //stores the model
    const init = useRef(true); //used to prevent certain useEffects from triggering on start
    const resetRef = useRef(null); //used to reset the tiles after some time after no movement

    //generates the initial state for the tiles state
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

    //redraws the tiles, with changes made depending on the spriteData and if raised
    function updateTiles() {
        const data = dataRef.current
        const model = modelRef.current;

        const newTiles = [...initTiles()]
        const placeAmount = Math.floor(progress * (model.process.length - 1)) + 1
        for (let i = 0; i < placeAmount; i++) {
            for (let j = 0; j < model.process[i].length; j++) {
                const pos = model.process[i][j][0];
                newTiles[pos].spriteData = data.tiles[model.process[i][j][1]].sprite
                if (raisedTiles.includes(pos)) {
                    newTiles[pos].y = 10;
                }
            }
        }
        setTiles(newTiles)
    }

    //function that handles the raising of a new tile
    function raiseTile(pos) {
        const newTiles = [...raisedTiles]
        newTiles.push(pos)
        if (newTiles.length > 10) {
            newTiles.shift()
        }
        setRaisedTiles(newTiles)
    }

    //resets all raised tiles after 500ms of no movement
    useEffect(() => {
        clearTimeout(resetRef.current)
        resetRef.current = setTimeout(() => {
            setRaisedTiles([])
        }, 500)
    }, [raisedTiles])

    //updates tiles on progress, scale, or raisedTile changes, but not initially
    useEffect(() => {
        if (init.current) return;
        updateTiles()
    }, [progress, scale, raisedTiles]);

    //initialization process for this component, generates model, and sets initial scale, adding resize listener for scale
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

    //gets the mouse position in grid coordinates and updates the state
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

    //raises tiles on mouse grid pos change, checking for OOB as well.
    useEffect(() => {
        if (init.current) return;
        if (mouseOnX < -destLen / 2 || mouseOnZ < -destLen / 2 || mouseOnX >= destLen / 2 || mouseOnZ >= destLen / 2) return;
        const idx = (mouseOnX + destLen / 2) * destLen + (mouseOnZ + destLen / 2);
        raiseTile(idx)
    }, [mouseOnX, mouseOnZ])


    return (
        <div
            className={"h-full w-full overflow-hidden select-none"}
        >
            <div
                className={"relative w-full h-full translate-x-1/2 translate-y-1/2"}
                style={{
                    top: `${tileSize}px` //bandaid fix that shifts the grid down some
                }}
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