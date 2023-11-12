import SidebarContent from "./SidebarContent";
import {FaArrowDown, FaArrowLeft, FaArrowRight} from "react-icons/fa6";

export default function Sidebar({setState, progress, setProgress, showSidebar, toggleSidebar, containerRef, stageOneRef, stageTwoRef, stageThreeRef, stageFourRef}) {
    return (
        <div className={"w-[36rem] h-full bg-cream border-l-2 border-black"}>
            <div
                className={`grid place-items-center absolute bottom-0 left-0 h-28 aspect-square w-[36rem] transform-colors duration-300 ease-in-out ${progress === 0 ? "" : "opacity-0"}`}
                style={{
                    boxShadow: "inset 0 -100px 100px -100px #000000"
                }}
            >
                <FaArrowDown size={72} className={"text-koi-red animate-bounce"}/>
            </div>
            <SidebarContent
                setState={setState}
                setProgress={setProgress}
                containerRef={containerRef}
                stageOneRef={stageOneRef}
                stageTwoRef={stageTwoRef}
                stageThreeRef={stageThreeRef}
                stageFourRef={stageFourRef}
            />
        </div>
    )
}