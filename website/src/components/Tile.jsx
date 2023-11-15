import {getZIndex, gridToScreenCoordinates} from "../utils/tile-mapping"
import {memo} from "react";

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
export default MemoizedTile