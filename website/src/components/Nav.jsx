import NavTitle from "./NavTitle";

export default function Nav({state, scrollTo}) {

    return (
        <div
            className={`select-none bg-cream w-full z-50 flex justify-between py-6 px-12 
                        font-semibold whitespace-nowrap h-auto border-b-2 border-black`}
        >
            <div className={"w-2/5 text-6xl small:pointer-events-none mobile:w-full"}
            >
                <NavTitle/>
            </div>
            <div className={"flex flex-col"}>

            </div>
            <div
                className={"flex justify-between items-center gap-4 text-3xl bg-cream mobile:hidden"}
            >
                <button onClick={() => scrollTo(1)} className={state === 1 && "text-koi-red text-4xl"}
                        style={{transition: "all 200ms ease-in-out"}}>about me
                </button>
                <button onClick={() => scrollTo(2)} className={state === 2 && "text-koi-red text-4xl"}
                        style={{transition: "all 200ms ease-in-out"}}>projects
                </button>
                <button onClick={() => scrollTo(3)} className={state === 3 && "text-koi-red text-4xl"}
                        style={{transition: "all 200ms ease-in-out"}}>experience
                </button>
                <button onClick={() => scrollTo(4)} className={state === 4 && "text-koi-red text-4xl"}
                        style={{transition: "all 200ms ease-in-out"}}>contact
                </button>
            </div>
        </div>
    )
}