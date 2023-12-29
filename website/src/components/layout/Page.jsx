import Grid from "./Grid";
import {useRef, useState} from "react";
import About from "../sidebar/About";
import Experience from "../sidebar/Experience";
import Contact from "../sidebar/Contact";
import Projects from "../sidebar/Projects";
import Skills from "../sidebar/Skills";
import {NavEntry} from "./Nav";


export default function Page() {
    const [state, setState] = useState(0)
    const [hoverState, setHoverState] = useState(0)
    const [showRightSidebar, setShowRightSidebar] = useState(false)

    function getSidebarContent() {
        switch (state) {
            case 1:
                return <About/>;
            case 2:
                return <Skills/>;
            case 3:
                return <Projects/>
            case 4:
                return <Experience/>
            case 5:
                return <Contact/>
            default:
                return <div/>
        }
    }

    function closeSidebar(e) {
        e.stopPropagation()
        containerRef.current.scrollTo({top: 0, left: 0, behavior: "smooth"})
        setTimeout(() => {
            setState(-1)
            containerRef.current.scrollTo({top: 0, left: 0})
        }, 300)
        setShowRightSidebar(false)
    }

    const containerRef = useRef(null)

    return (
        <div
            className={`relative h-[100dvh] w-[100dvw] bg-[#d7e4c2] flex flex-col ${state === -1 ? "overflow-hidden" : "overflow-scroll"}`}
            ref={containerRef}
        >
            <div className={"grow w-full min-h-0 flex flex-row mobile:flex-col relative"}>
                <div
                    className={`relative flex-auto transition-all duration-300 ease-in-out overflow-hidden mobile:min-h-[15%]`}>
                    <div
                        className={`w-full h-full absolute bg-black cursor-pointer ${showRightSidebar ? "bg-opacity-20 pointer-events-auto" : "bg-opacity-0 pointer-events-none"} z-10 transition-all duration-300 ease-in-out`}
                        onClick={(e) => closeSidebar(e)}
                    />
                    <Grid state={state} setState={setState} hoverState={hoverState} setHoverState={setHoverState}
                          setShowRightSidebar={setShowRightSidebar}/>
                </div>
                <div
                    className={`relative ${showRightSidebar ? "w-[65%] h-auto" : "w-0 mobile:h-0"} max-w-[36rem] bg-cream mobile:w-full h-full z-10 border-l-2 mobile:border-l-0 mobile:border-t-2 border-black transition-all duration-300 ease-in-out`}>
                    <div
                        className={"w-6 h-12 top-1/2 mobile:w-12 mobile:h-8 left-2 mobile:top-2 mobile:left-1/2 absolute grid place-items-center cursor-pointer -translate-y-1/2 -translate-x-1/2"}
                        onClick={(e) => closeSidebar(e)}
                    >
                        <div className={"rounded-full bg-black bg-opacity-60 w-1 h-8 mobile:w-8 mobile:h-1"}></div>
                    </div>
                    <div
                        className={"bg-cream h-auto desktop:h-full w-full p-12 mobile:p-8 grid place-items-center mobile:place-items-start overflow-y-scroll"}>
                        {getSidebarContent()}
                    </div>
                </div>
                <div
                    className={"absolute flex flex-col bottom-0 right-0 p-8 place-items-end gap-2 mobile:gap-1 select-none"}>
                    <NavEntry stateNum={1} label={"About"} setState={setState} setHoverState={setHoverState}
                              setShowRightSidebar={setShowRightSidebar}/>
                    <NavEntry stateNum={2} label={"Skills"} setState={setState} setHoverState={setHoverState}
                              setShowRightSidebar={setShowRightSidebar}/>
                    <NavEntry stateNum={3} label={"Projects"} setState={setState} setHoverState={setHoverState}
                              setShowRightSidebar={setShowRightSidebar}/>
                    <NavEntry stateNum={4} label={"Experience"} setState={setState} setHoverState={setHoverState}
                              setShowRightSidebar={setShowRightSidebar}/>
                    <NavEntry stateNum={5} label={"Contact"} setState={setState} setHoverState={setHoverState}
                              setShowRightSidebar={setShowRightSidebar}/>
                </div>
            </div>
        </div>
    );
}
