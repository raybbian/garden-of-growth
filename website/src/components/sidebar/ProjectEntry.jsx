export default function ProjectEntry({title, detail, link, src, left}) {
    return (
        <div className={`flex flex-row w-full overflow-hidden border-black border-2 bg-cream h-52`}>
            <div
                className={`flex-auto h-auto flex flex-col justify-between py-2 px-4`}>
                <div>
                    <p className={"text-xl"}>{title}</p>
                    <p className={"text-base mobile:text-sm opacity-60 text-ellipsis"}>{detail}</p>
                </div>
                <p className={'text-base mobile:text-sm'}>{link ? <a href={link} target={"_blank"} rel={"noreferrer"}
                                                                     className={"hover:text-koi-red transition-colors duration-150 ease-in-out"}>Read
                    More ></a> : <p>Link Unavailable</p>}</p>
            </div>
            <div
                className={`${!left ? "order-first border-r-2" : "order-last border-l-2"} border-black w-[35%] hover:w-[40%] transition-all duration-300 ease-in-out h-full flex-none`}>
                <img src={src} alt={'projectvisual'}
                     className={`w-full h-full object-cover`}/>
            </div>
        </div>
    )
}