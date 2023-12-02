export default function SkillEntry({name, icon, description, left}) {
    return (
        <div
            className={`border-2 border-black bg-cream group w-auto grow-0 shrink-0 transition-all duration-300 ease-in-out flex flex-row ${left ? "snap-start" : "snap-end"}`}>
            <div
                className={`${left ? "order-first" : "order-last"} grid place-items-center bg-neutral-800 w-32 aspect-square`}>
                <img src={icon} className={`w-24 object-contain aspect-square`}
                     alt={"Skill icon"}/>
            </div>
            <div
                className={`${left ? "order-last" : "order-first"} w-0 h-full max-h-32 group-hover:w-[9rem] py-2 group-hover:px-3 bg-cream transition-all duration-300 ease-in-out overflow-hidden`}>
                <p className={"text-xl"}>{name}</p>
                <p className={"text-sm opacity-60"}>{description}</p>
            </div>
        </div>
    )
}