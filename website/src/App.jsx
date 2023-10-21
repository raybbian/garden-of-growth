import {useEffect, useState} from 'react';
import './App.css';
import Tile from "./components/Tile";
import {screenToGridCoordinates} from "./utils/TileMapping";
import {matrix} from "mathjs";
import {addBitmapDataToStructure} from "./wfc/initialization";
import {SimpleTiledModel} from "./wfc/simple-tiled-model";
const Jimp = require('jimp/browser/lib/jimp')


export default function App() {
    const [tiles, setTiles] = useState(initTiles());
    const [mouseGridXPosition, updateMouseGridXPosition] = useState(0)
    const [mouseGridZPosition, updateMouseGridZPosition] = useState(0)
    const [imageURL, setImageURL] = useState("/cube-tile.svg");

    function onMouseMove(e) {
        let gridCoordinates = screenToGridCoordinates(matrix([[e.pageY], [e.pageX]]));
        const x = gridCoordinates.get([0,0])
        const z = gridCoordinates.get([1,0])
        if (x < 0 || z < 0 || x >= 19 || z >= 19) return;
        updateMouseGridXPosition(x)
        updateMouseGridZPosition(z)
    }

    function initTiles() {
        const tilesInit = [];
        for(let i = 0; i < 19; i++) {
            tilesInit[i] = []
            for(let j = 0; j < 19; j++) {
                tilesInit[i][j] = {"x": i, "y": 0, "z": j, "type": "cube-tile"}
            }
        }
        return tilesInit
    }

    useEffect(() => {
        const data = require('./wfc/castle.definition')
        addBitmapDataToStructure(data, function (err, definition) {
            if (err) {
                throw err;
            }

            const destWidth = 20;
            const destHeight = 20;

            //try catch to prevent the eventual errors from being silenced by the promise...

            try {
                const model = new SimpleTiledModel(definition, null, destWidth, destHeight, false);
                const finished = model.generate(0);

                if (finished) {
                    console.log('Success');
                    console.log(model.graphics())
                    const result = model.graphics();
                    const image = new Jimp(destWidth * definition.tilesize, destHeight * definition.tilesize, function (err, image) {
                        image.bitmap.data = Buffer.from(result.buffer);
                        image.getBase64(Jimp.MIME_PNG, (err, dataURL) => {
                            if (err) throw err

                            setImageURL(dataURL)
                        })
                    });
                } else {
                    console.log('The generation ended in a contradiction');
                }
            } catch(e) {
                console.log('An error occurred');
                console.log(e);
            }
        });
    }, []);

    useEffect(() => {
        const newTiles = tiles.map(row => row.slice())
        newTiles[mouseGridXPosition][mouseGridZPosition].y = 24
        setTiles(newTiles)

        setTimeout(() => {
            const newTiles = tiles.map(row => row.slice())
            newTiles[mouseGridXPosition][mouseGridZPosition].y = 0
            setTiles(newTiles)
        }, 1000)
    }, [mouseGridXPosition, mouseGridZPosition])


    return (
        <div
            className={"relative"}
            onMouseMove={onMouseMove}
        >
            {tiles.map((tileRow, rowIndex) => (
                <div key={rowIndex}>
                    {tileRow.map((tile, colIndex) => (
                        <Tile key={`${rowIndex}-${colIndex}`} x={tile.x} y={tile.y} z={tile.z} type={tile.type}/>
                    ))}
                </div>
            ))}
            <img src={imageURL} alt={'temp'}/>
        </div>
    );
}