import {gridToScreenCoordinates, getZIndex} from "../utils/tile-mapping"
import {memo, useEffect, useState} from "react";

function Tile({x, y, z, src, tileSize}) {
    const [screenCoordinates, setScreenCoordinates] = useState(gridToScreenCoordinates(x, z, tileSize))

    useEffect(() => {
        setScreenCoordinates(gridToScreenCoordinates(x, z, tileSize))
    }, [tileSize]);

    return (
        <img
            src={`${src}`}
            alt={`cube-tile-${x}-${z}`}
            className={"scale-100 absolute -translate-x-1/2 -translate-y-1/4"}
            style={{
                top: `${screenCoordinates[0][0] - y}px`,
                left: `${screenCoordinates[1][0]}px`,
                zIndex: getZIndex(x, z),
            }}
        ></img>
    );
}

const MemoizedTile = memo(Tile)
export default MemoizedTile