export default function ExperienceEntry({title, detail, startDate, endDate, src, left, last}) {
    return (
        <div className={`grid grid-cols-7 w-full h-80 ${!last ? "-mb-16" : ""}`}>
            <div
                className={`${left ? "order-first" : "order-last"} relative col-span-3 w-full h-full border-2 border-black`}>
                <div className={`flex flex-col w-full h-full bg-cream`}>
                    <div
                        className={"w-full grid place-items-center border-b-2 border-black flex-none h-2/5 hover:h-[45%] transition-all duration-300 ease-in-out"}>
                        <img className={"object-contain w-full h-full"} alt={'company-img'} src={src}/>
                    </div>
                    <div className={"py-2 px-4 flex-auto"}>
                        <p className={"text-xl"}>{title}</p>
                        <p className={"text-base mobile:text-sm opacity-60"}>{detail}</p>
                    </div>
                </div>
            </div>
            <div className={"w-full h-full grid place-items-center pointer-events-none select-none"}>
                <div className={`w-1/2 h-[2px] bg-black ${left ? "-translate-x-1/2" : "translate-x-1/2"}`}></div>
            </div>
            <div
                className={`w-full h-full col-span-3 flex flex-col text-lg justify-center ${left ? "order-last" : "order-first"}`}>
                <p className={`${left ? "text-left" : "text-right"}`}>{startDate.toLocaleString('default', {
                    month: 'long',
                    year: 'numeric'
                })} to</p>
                <p className={`${left ? "text-left" : "text-right"}`}>{endDate.toLocaleString('default', {
                    month: 'long',
                    year: 'numeric'
                })}</p>
            </div>
        </div>
    )
}