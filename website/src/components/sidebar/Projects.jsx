import ProjectEntry from "./ProjectEntry";

export default function Projects({elRef}) {
    return (
        <div ref={elRef} className={"flex flex-col gap-4"}>
            <p className={"top-0 text-4xl font-bold"}>Projects</p>
            <p className={"text-lg"}>
                A collection of my projects, in no particular order.
            </p>
            <ProjectEntry
                title={"Graphscii"}
                detail={"An orthogonal graph representation framework (Topology-Shape-Metrics, Kandinksy Model), implemented using NetworkX and Python."}
                link={"https://graphscii.raybb.dev"}
                github={"https://github.com/raybbian/graphscii"}
                src={`${process.env.PUBLIC_URL}/project-covers/graphscii.png`}
                left={false}
            />
            <ProjectEntry
                title={"Garden of Growth"}
                detail={"The website you are looking at right now! Terrain generated with Wave Function Collapse, presented using React."}
                link={"https://raybb.dev"}
                github={"https://github.com/raybbian/garden-of-growth"}
                src={`${process.env.PUBLIC_URL}/project-covers/garden-of-growth.png`}
                left={true}
            />
            <ProjectEntry
                title={"Choreolyzer"}
                detail={"Dance choreography analysis AI that uses multi-object image recognition to display the birds-eye position of dancers."}
                github={"https://github.com/orgs/Choreolyzer/repositories"}
                src={`${process.env.PUBLIC_URL}/project-covers/choreolyzer.png`}
                left={false}
            />
            <ProjectEntry
                title={"LoL CD Tracker"}
                detail={"External tool for League of Legends developed with ReClass, ImGUI, and reverse engineering techniques."}
                src={`${process.env.PUBLIC_URL}/project-covers/lol-cd-tracker.jpg`}
                left={true}
            />
            <ProjectEntry
                title={"CP Library"}
                detail={"My resources for competitive programming, featuring C++ template metaprogramming in a debug header file."}
                github={"https://github.com/raybbian/comp-programming"}
                src={`${process.env.PUBLIC_URL}/project-covers/cp-library.png`}
                left={false}
            />
            <ProjectEntry
                title={"GT Multibooker"}
                detail={"Intuitive UI that allows users to book multiple GT Library rooms at once. Developed with React, FastAPI and Postman."}
                link={"https://multibooker.raybb.dev/"}
                github={"https://github.com/raybbian/gt-multibooker"}
                src={`${process.env.PUBLIC_URL}/project-covers/gt-multibooker.png`}
                left={true}
            />
            <ProjectEntry
                title={"USACO Checklist"}
                detail={"Sophisticated web scraper to pull problem progress and stats from USACO, with sharable progress."}
                github={"https://github.com/orgs/USACO-Checklist/repositories"}
                src={`${process.env.PUBLIC_URL}/project-covers/usaco-checklist.png`}
                left={false}
            />
            <ProjectEntry
                title={"Prom RSVP"}
                detail={"Simple and streamlined seating registration made with React and FastAPI for seating reservations during DAIS Prom 2023."}
                github={"https://github.com/orgs/DAIS-Prom-2023/repositories"}
                src={`${process.env.PUBLIC_URL}/project-covers/prom-reservations.png`}
                left={true}
            />
        </div>
    )
}