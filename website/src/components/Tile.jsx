import {gridToScreenCoordinates, getZIndex} from "../utils/tile-mapping"
import {memo, useEffect, useState} from "react";

function Tile({x, y, z, spriteData, spriteSheet, tileSize}) {
    const screenCoordinates = gridToScreenCoordinates(x, z, tileSize)

    return (
        <div
            className={"absolute -translate-y-full -translate-x-1/2"}
            style={{
                top: `${screenCoordinates[0][0] - y}px`,
                left: `${screenCoordinates[1][0]}px`,
                zIndex: getZIndex(x, z),
                width: `${spriteData.w}px`,
                height: `${spriteData.h}px`,
                backgroundImage: `url(${spriteSheet})`,
                backgroundPosition: `-${spriteData.x}px -${spriteData.y}px`,
                transformOrigin: "top center",
                imageRendering: "crisp-edges"
            }}
        ></div>
    );
}

const MemoizedTile = memo(Tile)
export default MemoizedTile