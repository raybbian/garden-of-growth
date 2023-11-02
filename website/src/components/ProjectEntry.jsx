export default function ProjectEntry({title, detail, link, src, left}) {
    return (
        <div className={`grid grid-cols-5 w-full h-52 gap-4 overflow-hidden `}>
            <div className={"col-span-3 w-full h-52 flex flex-col justify-between"}>
                <div>
                    <p className={"text-subheader"}>{title}</p>
                    <p className={"text-body"}>{detail}</p>
                </div>
                <p className={'text-body'}>{link ? <a href={link} target={"_blank"}>Read More ></a> : <p>Link Unavailable</p>}</p>
            </div>
            <img src={src} alt={'projectvisual'} className={`${left ? "order-last" : "order-first"} col-span-2 object-cover border-2 border-black h-full w-full`}/>
        </div>
    )
}