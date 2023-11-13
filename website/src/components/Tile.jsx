import {getZIndex, gridToScreenCoordinates} from "../utils/tile-mapping"
import {memo} from "react";

function Tile({x, z, spriteData, spriteSheet, tileSize, scale}) {
    const screenCoordinates = gridToScreenCoordinates(x, z, scale * tileSize)

    return (
        <div
            className={"absolute -translate-y-full -translate-x-1/2"}
            style={{
                top: `${screenCoordinates[0][0]}px`,
                left: `${screenCoordinates[1][0]}px`,
                zIndex: getZIndex(x, z),
                width: `${scale * spriteData.w}px`,
                height: `${scale * spriteData.h}px`,
                backgroundImage: `url(${spriteSheet})`,
                backgroundPosition: `-${scale * spriteData.x}px -${scale * spriteData.y}px`,
                transformOrigin: "top center",
                imageRendering: "crisp-edges",
            }}
        ></div>
    );
}

const MemoizedTile = memo(Tile)
export default MemoizedTile