import {memo, useEffect, useRef, useState} from "react";
import {SimpleTiledModel} from "../../terrain/simple-tiled-model";
import {getZIndex, gridToScreenCoordinates, screenToGridCoordinates} from "../../utils/tile-mapping";
import {NavTitle} from "./Nav";

export default function Grid({state, setState, hoverState, setHoverState, setShowRightSidebar}) {

    const destLen = 16; //the side length of the grid
    const tileSize = 48; //the width of each tile, in pixels

    const gridRef = useRef(null); //ref to the container that holds the grid
    const dataRef = useRef(require('../../terrain/japanese')) //stores the data for the model
    const modelRef = useRef(new SimpleTiledModel(dataRef.current, null, destLen, destLen, false)) //stores the model
    const init = useRef(true); //used to prevent certain useEffects from triggering on start
    const progRef = useRef(-1)
    const drawingRef = useRef(null)

    const [tiles, setTiles] = useState(initTiles()); //stores the tiles themselves, where each element is an object
    const [scale, setScale] = useState(1) //stores the scale of the tiles (depends on screen width)
    const [mouseOnX, setMouseOnX] = useState(-999) //grid x position of the mouse
    const [mouseOnZ, setMouseOnZ] = useState(-999) //grid z position of the mouse
    const [cursor, setCursor] = useState("default")


    //updates tiles on progress, scale, or raisedTile changes, but not initially
    useEffect(() => {
        if (init.current) return;
        updateTiles()
    }, [hoverState, scale]);

    //initialization process for this component, generates model, and sets initial scale, adding resize listener for scale
    useEffect(() => {
        initGrid()
    }, []);

    //raises tiles on mouse grid pos change, checking for OOB as well.
    useEffect(() => {
        if (init.current) return
        handleCoordinateChange()
    }, [mouseOnX, mouseOnZ])

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
                "spriteData": {x: '49', y: '145', w: '48', h: '48'},
                "group": -1
            }
        }
        return newTiles;
    }

    function initGrid() {
        const model = modelRef.current;

        while (!model.generate()) {
            model.clear()
        }
        progRef.current = model.process.length
        fancyDraw()
        const handleResize = function () {
            setScale(Math.max(Math.floor(window.innerWidth / 16 / tileSize), 1))
        }
        handleResize()
        init.current = false //finished init

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }

    function fancyDraw() {
        if (drawingRef.current !== null) return;
        progRef.current = 0
        drawingRef.current = setInterval(() => {
            if (progRef.current >= modelRef.current.process.length) {
                clearInterval(drawingRef.current)
                drawingRef.current = null
                return
            }
            updateTiles()
            progRef.current = progRef.current + 1
        }, 5)
    }

    //redraws the tiles, with changes made depending on the spriteData and if raised
    function updateTiles() {
        const data = dataRef.current
        const model = modelRef.current;

        const newTiles = [...initTiles()]
        for (let i = 0; i < progRef.current; i++) {
            for (let j = 0; j < model.process[i].length; j++) {
                const pos = model.process[i][j][0];
                const tileObj = data.tiles[model.process[i][j][1]]
                newTiles[pos].spriteData = tileObj.sprite
                if ('group' in tileObj)
                    newTiles[pos].group = tileObj.group
                if (tileObj.group === hoverState) {
                    newTiles[pos].y = 8;
                    // make all tiles in the same group raise as well
                }
            }
        }
        setTiles(newTiles)
    }


    //gets the mouse position in grid coordinates and updates the state
    function handleMouseMove(e) {
        const gridPos = getGridCoordinatesFromMouseEvent(e)
        setMouseOnX(gridPos[0])
        setMouseOnZ(gridPos[1])
    }

    function getGridCoordinatesFromMouseEvent(e) {
        if (gridRef == null) return;
        const {clientX, clientY} = e;
        const {left, top} = gridRef.current.getBoundingClientRect();

        const relativeX = clientX - left;
        //because all tiles are shifted tileSize up, need to do same with Y
        const relativeY = clientY + top - scale * tileSize

        return screenToGridCoordinates(relativeY, relativeX, scale * tileSize)
    }

    function handleCoordinateChange() {
        if (init.current) return;

        const model = modelRef.current
        const data = dataRef.current

        if (mouseOnX < -destLen / 2 || mouseOnZ < -destLen / 2 || mouseOnX >= destLen / 2 || mouseOnZ >= destLen / 2) {
            setCursor("default")
            setHoverState(-1)
            return;
        }
        const idx = (mouseOnX + destLen / 2) * destLen + (mouseOnZ + destLen / 2);
        const tileID = model.observed[idx]
        const groupVal = 'group' in data.tiles[tileID] ? data.tiles[tileID].group : -1

        setCursor(groupVal === -1 ? "default" : "pointer")
        setHoverState(groupVal)
    }

    function handleMouseClick(e) {
        const gridPos = getGridCoordinatesFromMouseEvent(e)
        const clickMouseX = gridPos[0]
        const clickMouseZ = gridPos[1]

        if (clickMouseX < -destLen / 2 || clickMouseZ < -destLen / 2 || clickMouseX >= destLen / 2 || clickMouseZ >= destLen / 2) {
            setState(-1)
            return;
        }
        const idx = (clickMouseX + destLen / 2) * destLen + (clickMouseZ + destLen / 2);
        const tileID = modelRef.current.observed[idx]
        const groupVal = 'group' in dataRef.current.tiles[tileID] ? dataRef.current.tiles[tileID].group : -1
        if (groupVal === -1) {
            return;
        }
        setState(groupVal)
        setShowRightSidebar(true)
    }

    return (
        <div
            className={"h-full w-full select-none relative"}
        >
            <div
                className={"absolute top-0 left-0 p-8 cursor-pointer"}
                onClick={() => {
                    while (!modelRef.current.generate()) {
                        modelRef.current.clear()
                    }
                    setState(-1)
                    fancyDraw()
                }}
            >
                <NavTitle/>
                <small>click me!</small>
            </div>
            <div
                className={"relative w-full h-full translate-x-1/2 -translate-y-1/2"}
                style={{
                    top: `${tileSize * scale}px`, //bandaid fix that shifts the grid down some
                    cursor: cursor
                }}
                onMouseMove={(e) => handleMouseMove(e)}
                onMouseUp={(e) => handleMouseClick(e)}
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
            className={`absolute tile-(${x},${z}) crisp-edges`}
            style={{
                bottom: `${-screenCoordinates[0] + scale * y}px`,
                left: `${screenCoordinates[1] - scale * 0.5 * spriteData.w}px`,
                zIndex: getZIndex(x, z),
                width: `${scale * spriteData.w}px`,
                height: `${scale * spriteData.h}px`,
                backgroundImage: `url(${spriteSheet})`,
                backgroundPosition: `-${scale * spriteData.x}px -${scale * spriteData.y}px`,
                transition: "bottom 100ms ease-in-out"
            }}
        ></div>
    );
}

const MemoizedTile = memo(Tile)
