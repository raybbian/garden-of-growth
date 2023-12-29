import {FaGithub, FaLink} from "react-icons/fa6";

export default function ProjectEntry({title, detail, link, github, src, left}) {
    return (
        <div className={`flex flex-row w-full overflow-hidden border-black border-2 bg-cream h-44`}>
            <div
                className={`flex-auto h-full flex flex-col justify-between py-2 px-4 overflow-hidden`}>
                <div className={"h-[80%]"}>
                    <p className={"text-xl truncate"}>{title}</p>
                    <p className={"text-base opacity-60 line-clamp-4"}>{detail}</p>
                </div>
                <div className={"flex flex-row justify-end gap-2 place-items-center"}>
                    {link && <a href={link} target={"_blank"} rel={"noreferrer"}
                                className={"hover:text-koi-red transition-colors duration-150 ease-in-out"}>
                        <FaLink size={20}/>
                    </a>}
                    {github && <a href={github} target={"_blank"} rel={"noreferrer"}
                                  className={"hover:text-koi-red transition-colors duration-150 ease-in-out"}>
                        <FaGithub size={20}/>
                    </a>}
                </div>
            </div>
            <div
                className={`${!left ? "order-first border-r-2" : "order-last border-l-2"} border-black w-[35%] hover:w-[40%] transition-all duration-300 ease-in-out h-[100%] flex-none bg-[#ffe3ed]`}>
                <img src={src} alt={'projectvisual'}
                     className={`w-full h-full object-cover`}/>
            </div>
        </div>
    )
}