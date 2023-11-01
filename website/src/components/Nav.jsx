import NavTitle from "./NavTitle";

export default function Nav({state, showSidebar, toggleSidebar, scrollTo}) {
    function handleClick(ind) {
        scrollTo(ind)
        toggleSidebar(true)
    }

    return (
        <div
            className={`select-none bg-[#fffef4] w-full z-50 flex justify-between items-center py-4 px-12 
                        font-semibold whitespace-nowrap h-auto border-b-2 border-black text-title`}
        >
            <button
                onClick={() => toggleSidebar(false)}
            >
                <NavTitle/>
            </button>
            <div
                className={"flex justify-between items-center gap-8 font-semibold text-header"}
            >
                <button onClick={() => handleClick(1)} className={showSidebar && state === 1 && "text-[#fd2e5f] text-title"} style={{transition: "all 200ms ease-in-out"}}>about me</button>
                <button onClick={() => handleClick(2)} className={showSidebar && state === 2 && "text-[#fd2e5f] text-title"} style={{transition: "all 200ms ease-in-out"}}>experience</button>
                <button onClick={() => handleClick(3)} className={showSidebar && state === 3 && "text-[#fd2e5f] text-title"} style={{transition: "all 200ms ease-in-out"}}>projects</button>
                <button onClick={() => handleClick(4)} className={showSidebar && state === 4 && "text-[#fd2e5f] text-title"} style={{transition: "all 200ms ease-in-out"}}>contact</button>
            </div>
        </div>
    )
}