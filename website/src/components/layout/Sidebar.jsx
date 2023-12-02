import {FaArrowDown} from "react-icons/fa6";
import About from "../sidebar/About";
import Skills from "../sidebar/Skills";
import Projects from "../sidebar/Projects";
import Experience from "../sidebar/Experience";
import Contact from "../sidebar/Contact";

export default function Sidebar({
                                    setState,
                                    progress,
                                    setProgress,
                                    containerRef,
                                    stageOneRef,
                                    stageTwoRef,
                                    stageThreeRef,
                                    stageFourRef,
                                    stageFiveRef
                                }) {
    function getVisibility(ref) {
        if (ref.current == null || containerRef.current == null) return 0;
        const rect = ref.current.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()

        const visibleHeight = Math.min(rect.bottom, containerRect.bottom) - Math.max(rect.top, containerRect.top)
        return visibleHeight / rect.height
    }

    function handleScroll() {
        const scrollProgress = containerRef.current.scrollTop
        const scrollTotal = containerRef.current.scrollHeight - containerRef.current.clientHeight
        const progress = Math.max(Math.min(scrollProgress / scrollTotal, 1), 0)
        setProgress(progress)
        const arr = [stageOneRef, stageTwoRef, stageThreeRef, stageFourRef, stageFiveRef]
        const maxRef = arr.reduce((a, b) => {
            return (getVisibility(a) < getVisibility(b)) ? b : a
        })
        if (maxRef === stageOneRef) setState(1)
        else if (maxRef === stageTwoRef) setState(2)
        else if (maxRef === stageThreeRef) setState(3)
        else if (maxRef === stageFourRef) setState(4)
        else if (maxRef === stageFiveRef) setState(5)
    }

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className={"grid place-items-center h-full overflow-y-scroll tablet:w-screen w-[36rem] border-l-2 border-black mobile:border-l-0"}
        >
            <div
                className={"h-full max-w-[36rem] px-12 mobile:px-5 bg-cream tablet:border-x-2 border-black mobile:border-none flex flex-col gap-4 py-4"}>
                <div
                    className={`z-50 grid place-items-center absolute bottom-0 left-0 h-28 aspect-square w-full transform-colors duration-300 ease-in-out ${progress === 0 ? "" : "opacity-0"} pointer-events-none`}
                    style={{
                        boxShadow: "inset 0 -100px 100px -100px #000000"
                    }}
                >
                    <FaArrowDown size={72} className={"text-koi-red animate-bounce"}/>
                </div>
                <About elRef={stageOneRef}/>
                <Skills elRef={stageTwoRef}/>
                <Projects elRef={stageThreeRef}/>
                <Experience elRef={stageFourRef}/>
                <Contact elRef={stageFiveRef}/>
            </div>
        </div>
    )
}