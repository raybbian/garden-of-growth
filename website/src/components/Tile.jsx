import {matrix} from "mathjs";
import {gridToScreenCoordinates, getZIndex} from "../utils/tile-mapping"
import {memo} from "react";

function Tile({x, y, z, src}) {
    const screenCoordinates = gridToScreenCoordinates(matrix([[x], [z]]))

    return (
        <img
            src={`${src}`}
            alt={`cube-tile-${x}-${z}`}
            className={"scale-100 absolute -translate-x-1/2"}
            style={{
                top: `${screenCoordinates.get([0, 0]) - y}px`,
                left: `${screenCoordinates.get([1, 0])}px`,
                zIndex: getZIndex(x, z),
                transition: "ease-in-out top 0.1s, left 0.1s"
            }}
        ></img>
    );
}

const MemoizedTile = memo(Tile)
export default MemoizedTile