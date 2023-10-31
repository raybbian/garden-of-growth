import SidebarAbout from "./SidebarAbout";
import SidebarExperience from "./SidebarExperience";
import SidebarProjects from "./SidebarProjects";
import SidebarContact from "./SidebarContact";
import {useEffect, useState} from "react";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa6";

export default function Sidebar({state, setState}) {

    const [lastNonZeroState, setLastNonZeroState] = useState(0)

    useEffect(() => {
        if (state === 0) return;
        setLastNonZeroState(state);
    }, [state])

    return (
        <div className={"w-full h-full bg-[#fffef4] border-l-2 border-black"}>
            {lastNonZeroState === 1 && <SidebarAbout/>}
            {lastNonZeroState === 2 && <SidebarExperience/>}
            {lastNonZeroState === 3 && <SidebarProjects/>}
            {lastNonZeroState === 4 && <SidebarContact/>}
            <button
                className={"bg-[#fd2e5f] w-16 aspect-square rounded-full absolute top-1/2 -left-16 -translate-x-1/2 -translate-y-1/2 grid place-items-center"}
                onClick={() => {
                    if (state === 0) {
                        setState(1)
                    } else {
                        setState(0)
                    }
                }}
            >
                {state === 0 ? <FaArrowLeft size={24}/> : <FaArrowRight size={24}/> }
            </button>
        </div>
    )
}