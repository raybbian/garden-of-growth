export default function ExperienceEntry(
    {title, detail, startDate, endDate, src, left, last},
) {
    return (
        <div className={`grid grid-cols-7 w-full h-auto ${!last ? "-mb-16" : ""}`}>
            <div
                className={`${
                    left ? "order-first" : "order-last"
                } relative col-span-3 w-full h-auto border-2 border-black`}
            >
                <div className={`flex flex-col w-full h-auto bg-cream`}>
                    <div
                        className={"w-full grid place-items-center border-b-2 border-black flex-none h-32 hover:h-40 transition-all duration-300 ease-in-out bg-[#cedaa2]"}
                    >
                        <img
                            className={"object-contain w-full h-full"}
                            alt={"company-img"}
                            src={src}
                        />
                    </div>
                    <div className={"py-2 px-4 flex-auto"}>
                        <p className={"text-xl"}>{title}</p>
                        <p className={"text-base opacity-60 line-clamp-6"}>{detail}</p>
                    </div>
                </div>
            </div>
            <div
                className={"w-full h-full grid place-items-center pointer-events-none select-none"}
            >
                <div
                    className={`w-1/2 h-[2px] bg-black ${
                        left ? "-translate-x-1/2" : "translate-x-1/2"
                    }`}
                >
                </div>
            </div>
            <div
                className={`w-full h-full col-span-3 flex flex-col text-lg justify-center ${
                    left ? "order-last" : "order-first"
                }`}
            >
                <p className={`${left ? "text-left" : "text-right"}`}>
                    {startDate.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                    })} to
                </p>
                <p className={`${left ? "text-left" : "text-right"}`}>
                    {endDate.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                    })}
                </p>
            </div>
        </div>
    );
}
