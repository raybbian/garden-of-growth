import {useState} from "react";
import SkillEntry from "./SkillEntry";

export default function Skills({elRef}) {
    const [skillsArray, setSkillsArray] = useState([
        <SkillEntry
            name={"React"}
            icon={`${process.env.PUBLIC_URL}/skills/react.svg`}
            description={"My go-to frontend for all my web apps (including this one!)."}
        />,
        <SkillEntry
            name={"Javascript"}
            icon={`${process.env.PUBLIC_URL}/skills/js.svg`}
            description={"Supplements the projects and experiences I make with React."}
        />,
        <SkillEntry
            name={"TailwindCSS"}
            icon={`${process.env.PUBLIC_URL}/skills/tailwind.png`}
            description={"My choice for styling and organizing web applications."}
        />,
    ]);

    return (
        <div ref={elRef} className={"flex flex-col gap-4"}>
            <p className={"top-0 text-3xl font-semibold"}>Skills</p>
            <div className={"w-full grid h-36"}>
                <div className={"flex flex-row gap-4 items-center overflow-x-scroll max-w-fit snap-x"}>
                    {skillsArray}
                </div>
            </div>
        </div>
    )
}