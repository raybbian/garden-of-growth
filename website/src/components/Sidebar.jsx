import SidebarAbout from "./SidebarAbout";
import SidebarExperience from "./SidebarExperience";
import SidebarProjects from "./SidebarProjects";
import SidebarContact from "./SidebarContact";

export default function Sidebar({state, setState}) {
    return (
        <div className={"w-full h-full bg-[#fffef4] border-r-2 border-black"}>
            {state === 1 && <SidebarAbout/>}
            {state === 2 && <SidebarExperience/>}
            {state === 3 && <SidebarProjects/>}
            {state === 4 && <SidebarContact/>}
            <button
                className={"bg-[#fd2e5f] w-[5%] aspect-square rounded-full absolute top-16 right-16 translate-x-1/2 -translate-y-1/2"}
                onClick={() => setState(0)}
            >
            </button>
        </div>
    )
}