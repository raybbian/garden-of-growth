import ProjectEntry from "./ProjectEntry";

export default function Projects({elRef}) {
    return (
        <div ref={elRef} className={"flex flex-col gap-4"}>
            <p className={"top-0 text-3xl font-semibold"}>Projects</p>
            <ProjectEntry
                title={"Garden of Growth"}
                detail={"The website you are looking at right now! Terrain generated with Wave Function Collapse, presented using React."}
                link={"https://github.com/raybbian/garden-of-growth"}
                src={`${process.env.PUBLIC_URL}/project-covers/garden-of-growth.png`}
                left={true}
            />
            <ProjectEntry
                title={"Choreolyzer"}
                detail={"Dance choreography analysis AI that uses multi-object image recognition to parse and display the birds-eye position of dancers."}
                link={"https://github.com/orgs/Choreolyzer/repositories"}
                src={`${process.env.PUBLIC_URL}/project-covers/choreolyzer.png`}
                left={false}
            />
            <ProjectEntry
                title={"LoL CD Tracker"}
                detail={"External tool for League of Legends developed with ReClass, ImGUI, and reverse engineering techniques."}
                link={null}
                src={`${process.env.PUBLIC_URL}/project-covers/lol-cd-tracker.jpg`}
                left={true}
            />
            <ProjectEntry
                title={"CP Library"}
                detail={"My resources for competitive programming, featuring C++ template metaprogramming in a debug header file."}
                link={"https://github.com/raybbian/comp-programming"}
                src={`${process.env.PUBLIC_URL}/project-covers/cp-library.png`}
                left={false}
            />
            <ProjectEntry
                title={"GT Multibooker"}
                detail={"Intuitive UI that allows users to book multiple GT Library rooms at once. Developed with React, FastAPI and Postman."}
                link={"https://multibooker.raybb.dev/"}
                src={`${process.env.PUBLIC_URL}/project-covers/gt-multibooker.png`}
                left={true}
            />
            <ProjectEntry
                title={"USACO Checklist App"}
                detail={"Sophisticated web scraper to pull problem progress and statistics from USACO, with sharable progress."}
                link={"https://github.com/orgs/USACO-Checklist/repositories"}
                src={`${process.env.PUBLIC_URL}/project-covers/usaco-checklist.png`}
                left={false}
            />
            <ProjectEntry
                title={"Prom Reservations"}
                detail={"Simple and streamlined seating registration made with React and FastAPI for seating reservations during DAIS Prom 2023."}
                link={"https://github.com/orgs/DAIS-Prom-2023/repositories"}
                src={`${process.env.PUBLIC_URL}/project-covers/prom-reservations.png`}
                left={true}
            />
        </div>
    )
}