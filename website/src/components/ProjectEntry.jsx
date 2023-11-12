export default function ProjectEntry({title, detail, link, src, left}) {
    return (
        <div className={`grid grid-cols-5 w-full h-52 gap-4 overflow-hidden border-black border-2`}>
            <div className={`col-span-3 w-full h-52 flex flex-col justify-between pt-2 pb-3 ${left ? "pl-4" : ""}`}>
                <div>
                    <p className={"text-2xl"}>{title}</p>
                    <p className={"text-lg opacity-60"}>{detail}</p>
                </div>
                <p className={'text-lg'}>{link ? <a href={link} target={"_blank"} className={"hover:text-koi-red transition-colors duration-150 ease-in-out"}>Read More ></a> : <p>Link Unavailable</p>}</p>
            </div>
            <img src={src} alt={'projectvisual'} className={`${left ? "order-last" : "order-first"} col-span-2 object-cover ${left ? "border-l-2" : "border-r-2"} border-black h-full w-full`}/>
        </div>
    )
}