import ExperienceEntry from "./ExperienceEntry";

export default function Experience({elRef}) {
    return (
        <div ref={elRef} className={"flex flex-col gap-4"}>
            <p className={"text-4xl font-bold"}>Experience</p>
            <p className={"text-lg"}>
                The path I've taken in my career so far.
            </p>
            <div className={"relative w-full h-auto"}>
                <div className={"absolute pointer-events-none select-none w-full h-full"}>
                    <div
                        className={"bg-cream absolute w-6 border-2 border-black rounded-full aspect-square left-1/2 -translate-x-1/2 z-10"}></div>
                    <div className={"absolute w-[2px] h-full bg-black left-1/2 -translate-x-1/2"}></div>
                    <div
                        className={"bg-cream absolute w-6 border-2 border-black rounded-full aspect-square bottom-0 left-1/2 -translate-x-1/2 z-10"}></div>
                </div>
                <ExperienceEntry
                    title={"DMECC"}
                    detail={"Lead developer and project manager for an org-wide volunteer portal."}
                    startDate={new Date('5/1/2022')}
                    endDate={new Date()}
                    src={`${process.env.PUBLIC_URL}/experience-icons/dmecc.png`}
                    left={true}
                    last={false}
                />
                <ExperienceEntry
                    title={"Epoch Tech."}
                    detail={"Business English teacher and instructor for 25 workforce professionals."}
                    startDate={new Date("6/1/2021")}
                    endDate={new Date("9/1/2021")}
                    src={`${process.env.PUBLIC_URL}/experience-icons/epoch.png`}
                    left={false}
                    last={true}
                />
            </div>
        </div>
    )
}