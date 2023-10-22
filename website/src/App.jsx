import {useEffect, useState} from 'react';
import './App.css';
import Tile from "./components/Tile";
import {SimpleTiledModel} from "./wfc/simple-tiled-model";


export default function App() {
    const destWidth = 19;
    const destHeight = 19;

    const [tiles, setTiles] = useState(new Array(destWidth * destHeight));

    useEffect(() => {
        const data = require('./wfc/redstone.definition')
        const model = new SimpleTiledModel(data, null, destWidth, destHeight, false);

        const display = setInterval(() => {
            model.iterate(1);
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
                            "src": `/tiles/redstone/${name}.svg`
                        }
                    } else {
                        newTiles[i * destHeight + j] = {
                            "x": i,
                            "y": 0,
                            "z": j,
                            "src": `/tiles/redstone/empty.svg`
                        }
                    }
                }
            }
            setTiles(newTiles)
            if (model.isGenerationComplete()) {
                clearInterval(display)
            }
        }, 100)
    }, []);

    return (
        <div
            className={"relative"}
        >
            {tiles.map((tile, tileNum) => (
                <Tile key={tileNum} x={tile.x} y={tile.y} z={tile.z} src={tile.src}/>
            ))}
        </div>
    );
}