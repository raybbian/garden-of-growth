import React from 'react';
import './App.css';
import Tile from "./components/Tile";

export default function App() {
    const mapLength = 19

    const tiles = []
    for(let i = 0; i < mapLength; i++) {
        for(let j = 0; j < mapLength; j++) {
            tiles.push(<Tile x={i} y={0} z={j}/>)
        }
    }

    return (
        <div
            className={"relative left-1/2"}
        >
            {tiles}
        </div>
    );
}