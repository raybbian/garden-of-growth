import NavTitle from "./NavTitle";
import {useState} from "react";
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
                        style={{transition: "all 200ms ease-in-out"}}>projects
                </button>
                <button onClick={() => {
                    scrollTo(3);
                    setShowMobileNav(false)
                }} className={state === 3 && "text-koi-red text-3xl"}
                        style={{transition: "all 200ms ease-in-out"}}>experience
                </button>
                <button onClick={() => {
                    scrollTo(4);
                    setShowMobileNav(false)
                }} className={state === 4 && "text-koi-red text-3xl"}
                        style={{transition: "all 200ms ease-in-out"}}>contact
                </button>
            </div>
        </div>
    )
}