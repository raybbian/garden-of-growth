import ExperienceEntry from "./ExperienceEntry";

export default function ExperienceTimeline() {
    return (
        <div className={"relative w-full h-auto"}>
            <div className={"absolute pointer-events-none select-none w-full h-full"}>
                <div className={"bg-[#fffef4] absolute w-6 border-2 border-black rounded-full aspect-square left-1/2 -translate-x-1/2 z-10"}></div>
                <div className={"absolute w-[2px] h-full bg-black left-1/2 -translate-x-1/2"}></div>
                <div className={"bg-[#fffef4] absolute w-6 border-2 border-black rounded-full aspect-square bottom-0 left-1/2 -translate-x-1/2 z-10"}></div>
            </div>
            <div className={"w-full h-full"}>
                <ExperienceEntry
                    title={"DMECC"}
                    detail={"Lead developer and project manager for a organization-wide volunteer portal and tracker."}
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