import {useEffect, useRef, useState} from "react";

export default function NavTitle() {

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


    //move the title in 550ms after the window has loaded, this ensures that it has completed its animation and is def.
    const [titleXTransform, setTitleXTransform] = useState(-200) //this is percentage value
    useEffect(() => {
        setTimeout(() => {
            setTitleXTransform(0);
        }, 550)
    }, []);

    //call the queue handler every time the hover is changed
    useEffect(() => {
        runAnimation(titleHovered)
    }, [titleHovered]);

    //stores the interval delays that run the animations, which should be cleared if a new animation interrupts it
    const stage1Ref = useRef(null)
    const stage2Ref = useRef(null)
    //if animationAllowed changes to true, pop a thing off the queue, and run it
    function runAnimation(titleHovered) {
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
            }, 150)
            stage2Ref.current = setTimeout(() => {
                setHiddenOpacityValue(100)
            }, 300)
        } else {
            const x1 = hiddenMond.current.getBoundingClientRect().width
            const x2 = hiddenSpace.current.getBoundingClientRect().width
            const x3 = hiddenIan.current.getBoundingClientRect().width
            setHiddenOpacityValue(0)
            stage1Ref.current = setTimeout(() => {
                setB1XTransform(-x1)
                setB2XTransform(-(x1 + x2))
                setDotDevXTransform(-(x1 + x2 + x3))
            }, 150)
            stage2Ref.current = setTimeout(() => {
                setDevOpacityValue(100)
            }, 300)
        }
    }

    return (
        <div
            className={"text-7xl font-semibold transition duration-500 ease-in-out whitespace-nowrap"}
            onMouseEnter={() => setTitleHovered(true)}
            onMouseLeave={() => setTitleHovered(false)}
            style={{transform: `translate(${titleXTransform}%, 0px)`}}
        >
            {/*Span elements need inline block to be transformed*/}
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
        </div>
    )
}