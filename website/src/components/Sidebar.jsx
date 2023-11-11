import SidebarContent from "./SidebarContent";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa6";

export default function Sidebar({setState, setProgress, showSidebar, toggleSidebar, containerRef, stageOneRef, stageTwoRef, stageThreeRef, stageFourRef}) {
    return (
        <div className={"w-full h-full bg-[#fffef4] border-l-2 border-black"}>
            <SidebarContent
                setState={setState}
                setProgress={setProgress}
                containerRef={containerRef}
                stageOneRef={stageOneRef}
                stageTwoRef={stageTwoRef}
                stageThreeRef={stageThreeRef}
                stageFourRef={stageFourRef}
            />
            <button
                className={"bg-[#fd2e5f] w-16 aspect-square rounded-full absolute top-1/2 -left-16 -translate-x-1/2 -translate-y-1/2 grid place-items-center"}
                onClick={() => {
                    toggleSidebar(!showSidebar)
                }}
            >
                {!showSidebar ? <FaArrowLeft size={24}/> : <FaArrowRight size={24}/> }
            </button>
        </div>
    )
}