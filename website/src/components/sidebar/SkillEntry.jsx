export default function SkillEntry({name, icon, description, left}) {
    return (
        <div
            className={`border-2 border-black bg-cream w-auto h-full grow-0 shrink-0 transition-all duration-300 ease-in-out flex flex-row ${
                left ? "snap-start" : "snap-end"
            }`}
        >
            <div
                className={`${
                    left ? "order-first" : "order-last"
                } grid place-items-center bg-[#b4c9c2] w-32 aspect-square`}
            >
                <img
                    src={icon}
                    className={`w-24 hover:w-28 object-contain aspect-square transition-all duration-300 ease-in-out`}
                    alt={"Skill icon"}
                />
            </div>
            <div
                className={`${
                    left ? "order-last" : "order-first"
                } h-full w-[9rem] py-2 px-3 bg-cream transition-all duration-300 ease-in-out overflow-hidden`}
            >
                <p className={"text-xl"}>{name}</p>
                <p className={"text-md opacity-60"}>{description}</p>
            </div>
        </div>
    );
}
