import './App.css';
import Grid from "./components/Grid";
import Nav from "./components/Nav";
import {useEffect, useRef, useState} from "react";
import Sidebar from "./components/Sidebar";


export default function App() {
    const [state, setState] = useState(1)
    const [progress, setProgress] = useState(0);
    const [showSidebar, toggleSidebar] = useState(true)

    //lets the current scroll position of sidebar content to handle the state,
    //diverts clicking on the nav bars to scroll to the correct position instead
    const containerRef = useRef(null)
    const stageOneRef = useRef(null)
    const stageTwoRef = useRef(null)
    const stageThreeRef = useRef(null)
    const stageFourRef = useRef(null)
    function scrollTo(state) {
        let scrollYAmount = 0;
        if (state >= 2) scrollYAmount += stageOneRef.current.getBoundingClientRect().height
        if (state >= 3) scrollYAmount += stageTwoRef.current.getBoundingClientRect().height
        if (state >= 4) scrollYAmount += stageThreeRef.current.getBoundingClientRect().height
        containerRef.current.scrollTo({top: scrollYAmount, left: 0, behavior: "smooth"})
    }

    return (
        <div className={"relative h-screen w-screen bg-[#d7e4c2] flex flex-col overflow-hidden"}>
            <Nav
                state={state}
                showSidebar={showSidebar}
                toggleSidebar={toggleSidebar}
                scrollTo={scrollTo}
            />
            <div className={"grow w-full min-h-0 flex flex-row"}>
                <div
                    className={`relative grow`}
                    style={{
                        /*https://stackoverflow.com/questions/3508605/how-can-i-transition-height-0-to-height-auto-using-css/8331169#8331169*/
                        transition: "max-width 300ms ease-in-out",
                    }}
                >
                    <Grid progress={progress}/>
                </div>
                <div
                    className={`relative ${showSidebar ? "w-[36rem]" : "w-0"}`}
                    style={{
                        transition: "width 300ms ease-in-out",
                    }}
                >
                    <Sidebar
                        setState={setState}
                        progress={progress}
                        setProgress={setProgress}
                        showSidebar={showSidebar}
                        toggleSidebar={toggleSidebar}
                        containerRef={containerRef}
                        stageOneRef={stageOneRef}
                        stageTwoRef={stageTwoRef}
                        stageThreeRef={stageThreeRef}
                        stageFourRef={stageFourRef}
                    />
                </div>
            </div>
        </div>
    );
}