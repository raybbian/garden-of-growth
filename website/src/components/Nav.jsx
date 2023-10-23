import {useState} from "react";

export default function Nav() {

    return (
        <div className={"bg-[#fffef4] w-full h-32 z-[999] flex justify-between items-center py-4 px-32 font-sarala"}>
            <div className={"text-7xl font-semibold"}>
                <p>raybb.dev</p>
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