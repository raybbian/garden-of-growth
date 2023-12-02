export default function SkillEntry({name, icon, description}) {
    return (
        <div
            className={"border-2 border-black bg-cream group overflow-hidden w-auto grow-0 shrink-0 transition-all duration-300 ease-in-out snap-start flex flex-row"}>
            <img src={icon} className={"w-32 aspect-square"} alt={"Skill icon"}/>
            <div
                className={"w-0 h-full max-h-32 group-hover:w-[9rem] py-2 group-hover:px-3 bg-cream transition-all duration-300 ease-in-out overflow-hidden"}>
                <p className={"text-xl"}>{name}</p>
                <p className={"text-sm opacity-60"}>{description}</p>
            </div>
        </div>
    )
}