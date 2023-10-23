import {useState} from "react";

export default function Nav() {

    const [titleHovered, setTitleHovered] = useState(false)

    return (
        <div className={"bg-[#fffef4] w-full h-32 z-[999] flex justify-between items-center py-4 pr-32 pl-4 font-sarala"}>
            <div
                onMouseEnter={() => setTitleHovered(true)}
                onMouseLeave={() => setTitleHovered(false)}
                className={"text-7xl font-semibold overflow-hidden w-1/3"}
            >
                <div className={`transition duration-500 w-[200%] flex items-center justify-around ${titleHovered ? "-translate-x-1/2" : ""}`}>
                    <p>raybb.dev</p>
                    <p>Raymond Bian</p>
                </div>
            </div>
            <div className={"flex justify-between items-center gap-16 font-semibold text-4xl"}>
                <p>about me</p>
                <p>experience</p>
                <p>projects</p>
                <p>contact</p>
            </div>
        </div>
    )
}