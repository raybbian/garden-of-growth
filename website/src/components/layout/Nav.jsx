import {useEffect, useRef, useState} from "react";
import {FaBars} from "react-icons/fa6";

export default function Nav({state, scrollTo}) {
    const [showMobileNav, setShowMobileNav] = useState(false)
    return (
        <div
            className={`select-none bg-cream w-full z-50 flex justify-between py-4 px-8
                        font-semibold whitespace-nowrap h-auto border-b-2 border-black`}
        >
            <div className={"w-2/5 text-4xl mobile:pointer-events-none"}
            >
                <NavTitle/>
            </div>
            <button
                className={"grid place-items-center h-full aspect-square desktop:hidden"}
                onClick={() => {
                    setShowMobileNav(!showMobileNav)
                }}
            >
                <FaBars size={36}/>
            </button>
            <button
                className={`desktop:hidden absolute w-full h-full top-0 left-0 bg-black ${showMobileNav ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"}`}
                onClick={() => setShowMobileNav(false)}
                style={{
                    transition: "background 300ms ease-in-out"
                }}
            />
            <div
                className={"flex justify-between items-center gap-4 text-2xl bg-cream border-black desktop:transition-none tablet:transition-translate duration-300 ease-in-out " +
                    `tablet:absolute ${showMobileNav ? "tablet:-translate-x-full" : ""} tablet:left-full tablet:top-0 tablet:h-full tablet:flex-col tablet:justify-start tablet:p-6 tablet:items-end tablet:border-l-2 tablet:w-60`}
            >
                <button onClick={() => {
                    scrollTo(1);
                    setShowMobileNav(false)
                }} className={state === 1 && "text-koi-red text-3xl"}
                        style={{transition: "all 200ms ease-in-out"}}>about me
                </button>
                <button onClick={() => {
                    scrollTo(2);
                    setShowMobileNav(false)
                }} className={state === 2 && "text-koi-red text-3xl"}
                        style={{transition: "all 200ms ease-in-out"}}>skills
                </button>
                <button onClick={() => {
                    scrollTo(3);
                    setShowMobileNav(false)
                }} className={state === 3 && "text-koi-red text-3xl"}
                        style={{transition: "all 200ms ease-in-out"}}>projects
                </button>
                <button onClick={() => {
                    scrollTo(4);
                    setShowMobileNav(false)
                }} className={state === 4 && "text-koi-red text-3xl"}
                        style={{transition: "all 200ms ease-in-out"}}>experience
                </button>
                <button onClick={() => {
                    scrollTo(5);
                    setShowMobileNav(false)
                }} className={state === 5 && "text-koi-red text-3xl"}
                        style={{transition: "all 200ms ease-in-out"}}>contact
                </button>
            </div>
        </div>
    )
}

function NavTitle() {

    const [titleHovered, setTitleHovered] = useState(false)

    const hiddenMond = useRef(null)
    const hiddenSpace = useRef(null)
    const hiddenIan = useRef(null)

    //if titlehovered changes, we need to update the desired trasform x for the persistent parts of the title
    const [b1XTransform, setB1XTransform] = useState(0);
    const [b2XTransform, setB2XTransform] = useState(0);
    const [dotDevXTransform, setDotDevXTransform] = useState(0);
    //have state for the opacity value so we can set it to change one second after the b's move
    const [hiddenOpacityValue, setHiddenOpacityValue] = useState(0);
    const [devOpacityValue, setDevOpacityValue] = useState(100);

    //while the animation is initializing, hide it and prevent any animations from plalying
    const [animationCanPlay, setAnimationCanPlay] = useState(false)

    //call the queue handler every time the hover is changed
    useEffect(() => {
        runAnimation(titleHovered, 150)
    }, [titleHovered]);

    useEffect(() => {
        setTimeout(() => {
            setAnimationCanPlay(true)
        }, 300)
    }, [])

    //stores the interval delays that run the animations, which should be cleared if a new animation interrupts it
    const stage1Ref = useRef(null)
    const stage2Ref = useRef(null)

    //if animationAllowed changes to true, pop a thing off the queue, and run it
    function runAnimation(titleHovered, delay) {
        if (!hiddenMond.current || !hiddenSpace.current || !hiddenIan.current) {
            return;
        }
        clearInterval(stage1Ref.current)
        clearInterval(stage2Ref.current)
        if (titleHovered) {
            setDevOpacityValue(0)
            stage1Ref.current = setTimeout(() => {
                setB1XTransform(0)
                setB2XTransform(0)
            }, delay)
            stage2Ref.current = setTimeout(() => {
                setHiddenOpacityValue(100)
            }, 2 * delay)
        } else {
            const x1 = hiddenMond.current.getBoundingClientRect().width
            const x2 = hiddenSpace.current.getBoundingClientRect().width
            const x3 = hiddenIan.current.getBoundingClientRect().width
            setHiddenOpacityValue(0)
            stage1Ref.current = setTimeout(() => {
                setB1XTransform(-x1)
                setB2XTransform(-(x1 + x2))
                setDotDevXTransform(-(x1 + x2 + x3))
            }, delay)
            stage2Ref.current = setTimeout(() => {
                setDevOpacityValue(100)
            }, 2 * delay)
        }
    }

    return (
        <div
            className={"whitespace-nowrap relative text-left"}
            onMouseEnter={() => setTitleHovered(true)}
            onMouseLeave={() => setTitleHovered(false)}
        >
            <span
                className={`absolute select-none pointer-events-none ${animationCanPlay ? "opacity-0" : ""}`}>raybb.dev</span>
            <span className={`select-none pointer-events-none ${animationCanPlay ? "" : "opacity-0"}`}>
                <span>ray</span>
                <span
                    className={`${animationCanPlay && "transition duration-200 ease-in-out"}`}
                    ref={hiddenMond}
                    style={{opacity: hiddenOpacityValue}}
                >mond </span>
                <span
                    className={`inline-block ${animationCanPlay && "transition duration-200 ease-in-out"}`}
                    style={{transform: `translate(${b1XTransform}px, 0px)`}}
                >b</span>
                <span
                    ref={hiddenSpace}
                    style={{opacity: hiddenOpacityValue}}
                > </span>
                <span
                    className={`inline-block ${animationCanPlay && "transition duration-200 ease-in-out"}`}
                    style={{transform: `translate(${b2XTransform}px, 0px)`}}
                >b</span>
                <span
                    className={`${animationCanPlay && "transition duration-200 ease-in-out"}`}
                    ref={hiddenIan}
                    style={{opacity: hiddenOpacityValue}}
                >ian </span>
                <span
                    className={`inline-block ${animationCanPlay && "transition duration-200 ease-in-out"}`}
                    style={{
                        transform: `translate(${dotDevXTransform}px, 0px)`,
                        opacity: devOpacityValue
                    }}
                >.dev</span>
            </span>
        </div>
    )
}
