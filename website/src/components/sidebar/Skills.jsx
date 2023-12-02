import {useEffect, useRef, useState} from "react";
import SkillEntry from "./SkillEntry";

export default function Skills({elRef}) {

    return (
        <div ref={elRef} className={"flex flex-col gap-4"}>
            <p className={"top-0 text-3xl font-semibold"}>Skills</p>
            <SkillsGallery toRight={true}>
                <SkillEntry
                    name={"Javascript"}
                    icon={`${process.env.PUBLIC_URL}/skills/js.svg`}
                    description={"Supplements the projects and experiences I make with React."}
                    left={true}
                />
                <SkillEntry
                    name={"Python"}
                    icon={`${process.env.PUBLIC_URL}/skills/python.svg`}
                    description={"My go-to scripting language, used in backends and more."}
                    left={true}
                />
                <SkillEntry
                    name={"C++"}
                    icon={`${process.env.PUBLIC_URL}/skills/cpp_logo.svg`}
                    description={"Used for my comp programming journey, and interview prep."}
                    left={true}
                />
                <SkillEntry
                    name={"Java"}
                    icon={`${process.env.PUBLIC_URL}/skills/java.svg`}
                    description={"3 years experience through AP CS-A, CS1331, and CS1332."}
                    left={true}
                />
            </SkillsGallery>
            <SkillsGallery toRight={false}>
                <SkillEntry
                    name={"React"}
                    icon={`${process.env.PUBLIC_URL}/skills/react.svg`}
                    description={"My go-to frontend for all my web apps (including this one!)."}
                    left={false}
                />
                <SkillEntry
                    name={"TailwindCSS"}
                    icon={`${process.env.PUBLIC_URL}/skills/tailwind.svg`}
                    description={"My choice for styling and organizing web applications."}
                    left={false}
                />
                <SkillEntry
                    name={"FastAPI"}
                    icon={`${process.env.PUBLIC_URL}/skills/fastapi.svg`}
                    description={"My desired backend for all my web applications and services."}
                    left={false}
                />
                <SkillEntry
                    name={"Linux"}
                    icon={`${process.env.PUBLIC_URL}/skills/Tux.svg`}
                    description={"My daily driver OS. Experience in bash, systemd, nginx, etc."}
                    left={false}
                />
            </SkillsGallery>
        </div>
    )
}

function SkillsGallery({children, toRight}) {
    const skillRef = useRef(null);
    const autoScrollIntervalRef = useRef(null);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (hover) {
            clearInterval(autoScrollIntervalRef.current)
            autoScrollIntervalRef.current = null;
        } else {
            autoScrollIntervalRef.current = setInterval(() => {
                const skillEl = skillRef.current
                if (toRight) {
                    if (skillEl.scrollLeft + 112 >= skillEl.scrollWidth / 2) {
                        skillEl.scrollTo({left: 0})
                    }
                    skillEl.scrollTo({
                        left: skillEl.scrollLeft + 112,
                        behavior: "smooth"
                    })
                } else {
                    if (skillEl.scrollLeft - 112 + skillEl.clientWidth <= skillEl.scrollWidth / 2) {
                        skillEl.scrollTo({left: skillEl.scrollWidth - skillEl.clientWidth})
                    }
                    skillEl.scrollTo({
                        left: skillEl.scrollLeft - 112,
                        behavior: "smooth"
                    })
                }
            }, 2000)
        }
        return () => {
            clearInterval(autoScrollIntervalRef.current)
        }
    }, [hover]);

    useEffect(() => {
        if (!toRight) {
            const skillEl = skillRef.current
            skillEl.scrollLeft = skillEl.scrollWidth - skillEl.clientWidth
        }
    }, []);

    return (
        <div className={`w-full grid h-36`}>
            <div
                ref={skillRef}
                className={"flex flex-row gap-4 items-center overflow-x-scroll max-w-fit snap-x"}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {children.concat(children)}
            </div>
        </div>
    )
}