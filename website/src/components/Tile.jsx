import {gridToScreenCoordinates, getZIndex} from "../utils/tile-mapping"
import {memo, useEffect, useState} from "react";

function Tile({x, y, z, spriteData, spriteSheet, tileSize, scale}) {
    const screenCoordinates = gridToScreenCoordinates(x, z, scale * tileSize)

    return (
        <div
            className={"absolute -translate-y-full -translate-x-1/2"}
            style={{
                top: `${screenCoordinates[0][0] - y}px`,
                left: `${screenCoordinates[1][0]}px`,
                zIndex: getZIndex(x, z),
                width: `${scale * spriteData.w}px`,
                height: `${scale * spriteData.h}px`,
                backgroundImage: `url(${spriteSheet})`,
                backgroundPosition: `-${scale * spriteData.x}px -${scale * spriteData.y}px`,
                transformOrigin: "top center",
                imageRendering: "crisp-edges"
            }}
        ></div>
    );
}

const MemoizedTile = memo(Tile)
export default MemoizedTile