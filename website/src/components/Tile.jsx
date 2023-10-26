import {matrix} from "mathjs";
import {gridToScreenCoordinates, getZIndex} from "../utils/tile-mapping"
import {memo, useRef} from "react";

function Tile({x, y, z, src, scale}) {
    const screenCoordinatesRef = useRef(gridToScreenCoordinates(matrix([[x * scale/100], [z * scale/100]])))

    return (
        <img
            src={`${src}`}
            alt={`cube-tile-${x}-${z}`}
            className={"scale-100 absolute -translate-x-1/2"}
            style={{
                top: `${screenCoordinatesRef.current.get([0, 0]) - y}px`,
                left: `${screenCoordinatesRef.current.get([1, 0])}px`,
                zIndex: getZIndex(x, z),
                transition: "ease-in-out top 0.1s, left 0.1s",
                transform: `scale(${scale/100})`
            }}
        ></img>
    );
}

const MemoizedTile = memo(Tile)
export default MemoizedTile