import './App.css';
import Grid from "./components/Grid";
import Nav from "./components/Nav";
import {useEffect, useRef, useState} from "react";
import Sidebar from "./components/Sidebar";
import {simplifyConstant} from "mathjs";


export default function App() {
    const [state, setState] = useState(1)
    const [showSidebar, toggleSidebar] = useState(false)
    const [sidebarWidth, setSidebarWidth] = useState(Math.min(window.innerWidth * 0.30, 576))

    useEffect(() => {
        const handleResize = function () {
            setSidebarWidth(Math.max(410, Math.min(window.innerWidth * 0.30, 576)))
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);


    //lets the current scroll position of sidebar content to handle the state,
    //diverts clicking on the nav bars to scroll to the correct position instead
    const containerRef = useRef(null)
    const stageOneRef = useRef(null)
    const stageTwoRef = useRef(null)
    const stageThreeRef = useRef(null)
    const stageFourRef = useRef(null)
    function scrollTo(state) {
        let scrollYAmount = 0;
        if (state >= 2) {
            scrollYAmount += stageOneRef.current.getBoundingClientRect().height
        }
        if (state >= 3) {
            scrollYAmount += stageTwoRef.current.getBoundingClientRect().height
        }
        if (state >= 4) {
            scrollYAmount += stageThreeRef.current.getBoundingClientRect().height
        }
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
                    <Grid state={state} setState={setState}/>
                </div>
                <div
                    className={`relative`}
                    style={{
                        transition: "width 300ms ease-in-out",
                        width: !showSidebar ? "0px" : `${sidebarWidth}px`
                    }}
                >
                    <Sidebar
                        state={state}
                        setState={setState}
                        showSidebar={showSidebar}
                        toggleSidebar={toggleSidebar}
                        containerRef={containerRef}
                        stageOneRef={stageOneRef}
                        stageTwoRef={stageTwoRef}
                        stageThreeRef={stageThreeRef}
                        stageFourRef={stageFourRef}
                        sidebarWidth={sidebarWidth}
                        scrollTo={scrollTo}
                    />
                </div>
            </div>
        </div>
    );
}