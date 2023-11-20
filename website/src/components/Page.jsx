import Grid from "./Grid";
import Nav from "./Nav";
import {useRef, useState} from "react";
import Sidebar from "./Sidebar";


export default function Page() {
    const [state, setState] = useState(1)
    const [progress, setProgress] = useState(0);

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

    const raisedTilesRef = useRef([])

    function raiseTile(pos) {
        raisedTilesRef.current.push(pos)
    }

    return (
        <div className={"relative h-[100dvh] w-[100dvw] bg-[#d7e4c2] flex flex-col overflow-hidden"}>
            <Nav
                state={state}
                scrollTo={scrollTo}
            />
            <div className={"grow w-full min-h-0 flex flex-row"}>
                <div
                    className={`relative flex-auto tablet:absolute tablet:w-full tablet:h-full`}
                    style={{
                        /*https://stackoverflow.com/questions/3508605/how-can-i-transition-height-0-to-height-auto-using-css/8331169#8331169*/
                        transition: "max-width 300ms ease-in-out",
                    }}
                >
                    <Grid
                        progress={progress}
                        raisedTilesRef={raisedTilesRef}
                        raiseTile={raiseTile}
                    />
                </div>
                <div className={`relative tablet:w-screen w-[36rem]`}
                >
                    <Sidebar
                        setState={setState}
                        progress={progress}
                        setProgress={setProgress}
                        containerRef={containerRef}
                        stageOneRef={stageOneRef}
                        stageTwoRef={stageTwoRef}
                        stageThreeRef={stageThreeRef}
                        stageFourRef={stageFourRef}
                        raiseTile={raiseTile}
                    />
                </div>
            </div>
        </div>
    );
}