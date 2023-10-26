import {Fragment, useEffect, useRef, useState} from "react";
import {SimpleTiledModel} from "../wfc/simple-tiled-model";
import Tile from "./Tile";
import MemoizedTile from "./Tile";

export default function Dev({state, setState}) {
    const [view, setView] = useState([])

    const dataRef = useRef(require('../wfc/path.definition'))
    const modelRef = useRef(new SimpleTiledModel(dataRef.current, null, 1, 1, false))

    //initialize the model and generate once the page (and grid) loads
    useEffect(() => {
        const path = dataRef.current.path
        const tileFormat = dataRef.current.tileFormat
        const model = modelRef.current;

        const dx = [0, 1, 0, -1]
        const dz = [-1, 0, 1, 0]

        const newView = [...view]
        for(let dir = 0; dir < 4; dir++) {
            for(let mainTile = 0; mainTile < model.propagator[dir].length; mainTile++) {
                if (!newView[mainTile]) newView[mainTile] = []
                if (!newView[mainTile][dir]) newView[mainTile][dir] = []
                //the first in view[mainTile][dir] , array, is the main tile
/*
                newView[mainTile][dir].push({
                    "x": 0,
                    "y": 0,
                    "z": 0,
                    "src": `${process.env.PUBLIC_URL}${path}/${model.tiles[mainTile]}.${tileFormat}`
                })
*/
                for(let nTile = 0; nTile < model.propagator[dir][mainTile].length; nTile++) {
                    newView[mainTile][dir].push({
                        "x": 1.5*(-nTile-1) - dx[dir],
                        "y": 0,
                        "z": 1.5*(nTile+1) - dz[dir],
                        "src": `${process.env.PUBLIC_URL}${path}/${model.tiles[mainTile]}.${tileFormat}`
                    })
                    newView[mainTile][dir].push({
                        "x": 1.5*(-nTile-1),
                        "y": 0,
                        "z": 1.5*(nTile+1),
                        "src": `${process.env.PUBLIC_URL}${path}/${model.tiles[model.propagator[dir][mainTile][nTile]]}.${tileFormat}`
                    })
                }
            }
        }
        setView(newView)
        console.log(newView, model.propagator)
    }, []);


    return (
        <div
            className={"relative w-full h-full grid grid-cols-4 gap-16 place-items-stretch"}
        >
            {/*should store the main node, and the node on the sied*/}
            {view.map((mainTileInfo, num) => (
                <div key={num}>
                    {mainTileInfo.map((adjList, dir) => (
                        <div key={`${num}-${dir}`} className={"relative left-16 h-24 scale-50"}>
                            {adjList.map((nTile, tNum) => (
                                <MemoizedTile key={`${num}-${dir}-${tNum}`} src={nTile.src} x={nTile.x} y={nTile.y} z={nTile.z}/>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}