import {gridToScreenCoordinates, getZIndex} from "../utils/tile-mapping"
import {memo, useEffect, useState} from "react";

function Tile({x, y, z, spriteData, spriteSheet, tileSize, scale}) {
    const [screenCoordinates, setScreenCoordinates] = useState(gridToScreenCoordinates(x, z, scale))

    useEffect(() => {
        setScreenCoordinates(gridToScreenCoordinates(x, z, scale))
    }, [scale]);

    return (
        <div
            className={"absolute -translate-x-1/4 -translate-y-full"}
            style={{
                top: `${screenCoordinates[0][0] - y}px`,
                left: `${screenCoordinates[1][0]}px`,
                zIndex: getZIndex(x, z),
                width: `${spriteData.w}px`,
                height: `${spriteData.h}px`,
                backgroundImage: `url(${spriteSheet})`,
                backgroundPosition: `-${spriteData.x}px -${spriteData.y}px`,
                scale: `${100 * scale / tileSize}%`,
                transformOrigin: "top",
                imageRendering: "crisp-edges"
            }}
        ></div>
    );
}

const MemoizedTile = memo(Tile)
export default MemoizedTile