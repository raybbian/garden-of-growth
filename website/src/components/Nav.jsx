import NavTitle from "./NavTitle";

export default function Nav({state, setState}) {
    return (
        <div className={"bg-[#fffef4] w-full h-32 z-[999] flex justify-between items-center py-4 px-32 font-sarala"}>
            <button onClick={() => setState(0)}>
                <NavTitle/>
            </button>
            <div className={"flex justify-between items-center gap-16 text-4xl font-semibold"}>
                <button onClick={() => setState(1)} className={state === 1 && "font-normal italic"}>about me</button>
                <button onClick={() => setState(2)} className={state === 2 && "font-normal italic"}>experience</button>
                <button onClick={() => setState(3)} className={state === 3 && "font-normal italic"}>projects</button>
                <button onClick={() => setState(4)} className={state === 4 && "font-normal italic"}>contact</button>
            </div>
        </div>
    )
}