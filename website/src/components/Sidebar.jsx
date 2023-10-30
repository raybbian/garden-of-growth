import {Fragment, useEffect, useState} from "react";

export default function Sidebar({state, setState}) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (state !== 0) {
            setWidth(200)
        } else {
            setWidth(0)
        }
    }, [state]);

    return (
        <Fragment>
            <button
                className={"bg-black w-16 h-16 rounded-full absolute top-8 left-8"}
                onClick={() => setState(0)}
            >
            </button>
            <div
                className={"w-full h-full bg-[#fffef4]"}
                style={{
                    transition: "width 1s ease-in-out"
                }}
            >

            </div>
        </Fragment>
    )
}