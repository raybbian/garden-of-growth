import {memo, useEffect, useRef, useState} from "react";
import {SimpleTiledModel} from "../../terrain/simple-tiled-model";
import {getZIndex, gridToScreenCoordinates, screenToGridCoordinates} from "../../utils/tile-mapping";

export default function Grid({progress}) {

    const destLen = 16; //the side length of the grid
    const tileSize = 48; //the width of each tile, in pixels

    const gridRef = useRef(null); //ref to the container that holds the grid
    const dataRef = useRef(require('../../terrain/japanese')) //stores the data for the model
    const modelRef = useRef(new SimpleTiledModel(dataRef.current, null, destLen, destLen, false)) //stores the model
    const init = useRef(true); //used to prevent certain useEffects from triggering on start
    const resetRef = useRef(null); //used to reset the tiles after some time after no movement
    const rippleRef = useRef(null); //used to store the ripple iterator interval
    const hoverQueueRef = useRef([]) //used to store max amount of hovered tiles

    const [tiles, setTiles] = useState(initTiles()); //stores the tiles themselves, where each element is an object
    const [scale, setScale] = useState(1) //stores the scale of the tiles (depends on screen width)
    const [mouseOnX, setMouseOnX] = useState(-999) //grid x position of the mouse
    const [mouseOnZ, setMouseOnZ] = useState(-999) //grid z position of the mouse
    const [raisedTiles, setRaisedTiles] = useState(new Array(modelRef.current.FMXxFMY).fill(false)) //bool array of tiles that should be raised ATM

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
                if (raisedTiles[pos]) {
                    newTiles[pos].y = 10;
                }
            }
        }
        setTiles(newTiles)
    }

    //resets all raised tiles after 500ms of no changes
    useEffect(() => {
        clearTimeout(resetRef.current)
        resetRef.current = setTimeout(() => {
            setRaisedTiles(new Array(modelRef.current.FMXxFMY).fill(false))
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
        if (rippleRef.current !== null) return;
        const newTiles = [...raisedTiles]
        newTiles[idx] = true;
        hoverQueueRef.current.push(idx)
        if (hoverQueueRef.current.length > 10) {
            const removeIdx = hoverQueueRef.current.shift()
            newTiles[removeIdx] = false;
        }
        setRaisedTiles(newTiles)
    }, [mouseOnX, mouseOnZ])

    //ripple effect
    function handleMouseClick() {
        if (rippleRef.current !== null) return;
        const rippleDiameter = [1];
        rippleRef.current = setInterval(() => {
            rippleIterator(rippleDiameter)
        }, 100)
    }

    function rippleIterator(rippleDiameter) {
        const diameter = rippleDiameter[0] += 2
        const res = drawCircle(diameter, true, mouseOnX, mouseOnZ)
        if (!res) { //if did not change any circles, empty rippleQueue
            clearInterval(rippleRef.current)
            rippleRef.current = null; //done rippling
        }
    }

    function drawCircle(diameter, raise, originX, originZ) {
        const newTiles = new Array(modelRef.current.FMXxFMY).fill(false)
        const radius = diameter / 2 - 0.5
        const r = (radius + 0.25) ** 2 + 1
        const r_min = (diameter > 5) ? (radius - 2) ** 2 + 1 : 0
        let resp = false;

        for (let i = 0; i < diameter; i++) {
            const z = (i - radius) ** 2;
            for (let j = 0; j < diameter; j++) {
                const x = (j - radius) ** 2
                const posX = Math.round(i + originX - radius);
                const posZ = Math.round(j + originZ - radius);
                const oob = posX < -destLen / 2 || posZ < -destLen / 2 || posX >= destLen / 2 || posZ >= destLen / 2
                const idx = (posX + destLen / 2) * destLen + (posZ + destLen / 2);
                if (r_min <= x + z && x + z <= r && !oob) {
                    newTiles[idx] = raise;
                    resp = true;
                }
            }
        }
        setRaisedTiles(newTiles)
        return resp;
    }

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
                onMouseDown={() => handleMouseClick()}
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

function Tile({x, y, z, spriteData, spriteSheet, tileSize, scale}) {
    const screenCoordinates = gridToScreenCoordinates(x, z, scale * tileSize)

    return (
        <div
            className={`absolute -translate-x-1/2 -translate-y-full tile-(${x},${z})`}
            style={{
                top: `${screenCoordinates[0] - scale * y}px`,
                left: `${screenCoordinates[1]}px`,
                zIndex: getZIndex(x, z),
                width: `${scale * spriteData.w}px`,
                height: `${scale * spriteData.h}px`,
                backgroundImage: `url(${spriteSheet})`,
                backgroundPosition: `-${scale * spriteData.x}px -${scale * spriteData.y}px`,
                transformOrigin: "top center",
                imageRendering: "crisp-edges",
                transition: "top 100ms ease-in-out"
            }}
        ></div>
    );
}

const MemoizedTile = memo(Tile)
