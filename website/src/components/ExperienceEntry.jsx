export default function ExperienceEntry({title, detail, startDate, endDate, src, left}) {
    return (
        <div className={`grid grid-cols-5 w-full h-auto -mb-16`}>
            <div className={`${left ? "order-first" : "order-last"} relative col-span-2 w-full h-full border-2 border-black`}>
                <div className={`grid grid-rows-5 w-full h-full`}>
                    <div className={"row-span-2 px-4 h-full border-b-2 border-black grid place-items-center"}>
                        <img className={"object-contain"} alt={'company-img'} src={src}/>
                    </div>
                    <div className={"row-span-3 p-4"}>
                        <p className={"text-2xl"}>{title}</p>
                        <p className={"text-lg opacity-60"}>{detail}</p>
                    </div>
                </div>
            </div>
            <div className={"w-full h-full grid place-items-center pointer-events-none select-none grid-rows-1"}>
                <div className={"bg-[#fffef4] absolute w-6 border-2 border-black rounded-full aspect-square z-10"}></div>
                <div className={`w-1/2 h-[2px] bg-black ${left ? "-translate-x-1/2" : "translate-x-1/2"}`}></div>
            </div>
            <div className={`w-full h-full col-span-2 flex flex-col text-xl justify-center ${left ? "order-last" : "order-first"}`}>
                <p className={`${left ? "text-left" : "text-right"}`}>{startDate.toLocaleString('default', {month: 'long', year: 'numeric'})} to</p>
                <p className={`${left ? "text-left" : "text-right"}`}>{endDate.toLocaleString('default', {month: 'long', year: 'numeric'})}</p>
            </div>
        </div>
    )
}