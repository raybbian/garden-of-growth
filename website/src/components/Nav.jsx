import NavTitle from "./NavTitle";

export default function Nav({state, setState}) {
    return (
        <div
            className={`select-none bg-[#fffef4] w-full z-50 flex justify-between items-center py-4 px-12 
                        font-semibold whitespace-nowrap h-auto border-b-2 border-black text-title`}
        >
            <button
                onClick={() => setState(0)}
            >
                <NavTitle/>
            </button>
            <div
                className={"flex justify-between items-center gap-8 font-semibold text-header"}
            >
                <button onClick={() => setState(1)} className={state === 1 && "text-[#fd2e5f] text-title"} style={{transition: "all 200ms ease-in-out"}}>about me</button>
                <button onClick={() => setState(2)} className={state === 2 && "text-[#fd2e5f] text-title"} style={{transition: "all 200ms ease-in-out"}}>experience</button>
                <button onClick={() => setState(3)} className={state === 3 && "text-[#fd2e5f] text-title"} style={{transition: "all 200ms ease-in-out"}}>projects</button>
                <button onClick={() => setState(4)} className={state === 4 && "text-[#fd2e5f] text-title"} style={{transition: "all 200ms ease-in-out"}}>contact</button>
            </div>
        </div>
    )
}