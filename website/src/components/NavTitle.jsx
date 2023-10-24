import {useEffect, useRef, useState} from "react";

export default function NavTitle() {

    const [titleHovered, setTitleHovered] = useState(false)
    const [hoverCount, setHoverCount] = useState(0)

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
    const animationCanPlay = useRef(false)

    //call the queue handler every time the hover is changed
    useEffect(() => {
        if(hoverCount === 0) {
            setHoverCount(hoverCount + 1)
            runAnimation(titleHovered, 0)
            setTimeout(() => {
                animationCanPlay.current = true
            }, 300)
        } else if (hoverCount >= 1 && animationCanPlay.current) {
            setHoverCount(hoverCount + 1)
            runAnimation(titleHovered, 150)
        }
    }, [titleHovered]);

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
            className={"text-7xl font-semibold whitespace-nowrap relative"}
            onMouseEnter={() => setTitleHovered(true)}
            onMouseLeave={() => setTitleHovered(false)}
        >
            <span className={`select-none pointer-events-none absolute ${hoverCount >= 2 ? "opacity-0" : ""}`}>raybb.dev</span>
            {/*Span elements need inline block to be transformed*/}
            <span className={`select-none pointer-events-none ${hoverCount < 2 ? "opacity-0" : ""}`}>
                <span>ray</span>
                <span
                    className={`transition duration-300 ease-in-out`}
                    ref={hiddenMond}
                    style={{opacity: hiddenOpacityValue}}
                >mond </span>
                <span
                    className={"inline-block transition duration-300 ease-in-out"}
                    style={{transform: `translate(${b1XTransform}px, 0px)`}}
                >b</span>
                <span
                    ref={hiddenSpace}
                    style={{opacity: hiddenOpacityValue}}
                > </span>
                <span
                    className={"inline-block transition duration-300 ease-in-out"}
                    style={{transform: `translate(${b2XTransform}px, 0px)`}}
                >b</span>
                <span
                    className={`transition duration-300 ease-in-out`}
                    ref={hiddenIan}
                    style={{opacity: hiddenOpacityValue}}
                >ian </span>
                <span
                    className={`inline-block transition duration-300 ease-in-out`}
                    style={{
                        transform: `translate(${dotDevXTransform}px, 0px)`,
                        opacity: devOpacityValue
                    }}
                >.dev</span>
            </span>
        </div>
    )
}