import SidebarAbout from "./SidebarAbout";
import SidebarExperience from "./SidebarExperience";
import SidebarProjects from "./SidebarProjects";
import SidebarContact from "./SidebarContact";
import {useEffect, useRef, useState} from "react";

export default function Sidebar({state, setState}) {

    const [lastNonZeroState, setLastNonZeroState] = useState(0)

    useEffect(() => {
        if (state === 0) return;
        setLastNonZeroState(state);
    }, [state])

    return (
        <div className={"w-full h-full bg-[#fffef4] border-r-2 border-black"}>
            {lastNonZeroState === 1 && <SidebarAbout/>}
            {lastNonZeroState === 2 && <SidebarExperience/>}
            {lastNonZeroState === 3 && <SidebarProjects/>}
            {lastNonZeroState === 4 && <SidebarContact/>}
            <button
                className={"bg-[#fd2e5f] w-[5%] aspect-square rounded-full absolute top-12 right-12 translate-x-1/2 -translate-y-1/2"}
                onClick={() => setState(0)}
            >
            </button>
        </div>
    )
}