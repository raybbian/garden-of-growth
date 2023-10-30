import NavTitle from "./NavTitle";

export default function Nav({state, setState}) {
    return (
        <div className={"bg-[#fffef4] w-full h-auto z-[999] flex justify-between items-center py-4 px-16 font-sarala font-semibold whitespace-nowrap"}>
            <button
                onClick={() => setState(0)}
                style={{
                    fontSize: "clamp(54.64px, 4dvw, 76.8px)"
                }}
            >
                <NavTitle/>
            </button>
            <div
                className={"flex justify-between items-center gap-8 text-[2rem] font-semibold"}
                style={{
                    fontSize: "clamp(27.32px, 2dvw, 38.4px)"
                }}
            >
                <button onClick={() => setState(1)} className={state === 1 && "font-normal italic"}>about me</button>
                <button onClick={() => setState(2)} className={state === 2 && "font-normal italic"}>experience</button>
                <button onClick={() => setState(3)} className={state === 3 && "font-normal italic"}>projects</button>
                <button onClick={() => setState(4)} className={state === 4 && "font-normal italic"}>contact</button>
            </div>
        </div>
    )
}