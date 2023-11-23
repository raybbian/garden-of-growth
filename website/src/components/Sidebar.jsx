import {useState} from "react";
import ProjectEntry from "./ProjectEntry";
import {FaArrowDown, FaCheck, FaFile, FaGithub, FaLinkedin} from "react-icons/fa6";
import axios from "axios";
import ExperienceEntry from "./ExperienceEntry";

export default function Sidebar({
                                    setState,
                                    progress,
                                    setProgress,
                                    containerRef,
                                    stageOneRef,
                                    stageTwoRef,
                                    stageThreeRef,
                                    stageFourRef,
                                }) {
    function getVisibility(ref) {
        if (ref.current == null || containerRef.current == null) return 0;
        const rect = ref.current.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()

        const visibleHeight = Math.min(rect.bottom, containerRect.bottom) - Math.max(rect.top, containerRect.top)
        return visibleHeight / rect.height
    }

    function handleScroll() {
        const scrollProgress = containerRef.current.scrollTop
        const scrollTotal = containerRef.current.scrollHeight - containerRef.current.clientHeight
        const progress = Math.max(Math.min(scrollProgress / scrollTotal, 1), 0)
        setProgress(progress)
        const arr = [stageOneRef, stageTwoRef, stageThreeRef, stageFourRef]
        const maxRef = arr.reduce((a, b) => {
            return (getVisibility(a) < getVisibility(b)) ? b : a
        })
        if (maxRef === stageOneRef) setState(1)
        else if (maxRef === stageTwoRef) setState(2)
        else if (maxRef === stageThreeRef) setState(3)
        else if (maxRef === stageFourRef) setState(4)
    }

    const [formSucceeded, setFormSucceeded] = useState(false);

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className={"grid place-items-center h-full overflow-y-scroll tablet:w-screen w-[36rem] border-l-2 border-black mobile:border-l-0"}
        >
            <div
                className={"h-full max-w-[36rem] px-12 mobile:px-8 bg-cream tablet:bg-opacity-[80%] tablet:border-x-2 border-black mobile:border-none"}>
                <div
                    className={"h-auto"}>
                    <div
                        className={`grid place-items-center absolute bottom-0 left-0 h-28 aspect-square w-full transform-colors duration-300 ease-in-out ${progress === 0 ? "" : "opacity-0"} pointer-events-none`}
                        style={{
                            boxShadow: "inset 0 -100px 100px -100px #000000"
                        }}
                    >
                        <FaArrowDown size={72} className={"text-koi-red animate-bounce"}/>
                    </div>
                    <div ref={stageOneRef} className={"py-4"}>
                        <div className={"py-6"}>
                            <p className={"top-0 text-4xl font-semibold"}>About Me</p>
                            <div className={"h-[2px] w-[30%] mb-4 mt-2 bg-slate-600"}></div>
                        </div>
                        <div className={"grid place-items-center w-full"}>
                            <img alt={'headshot'} src={`${process.env.PUBLIC_URL}/img/headshot.jpg`}
                                 className={"w-[40%] m-4 aspect-square rounded-full border-2 border-black object-cover"}/>
                        </div>
                        <p className={"text-lg"}>
                            Hi! My name is Raymond Bian, and I'm a freshman studying computer science at Georgia Tech.
                            Welcome to my website! I'm interested in a multitude of topics, ranging from AI/ML to NLP to
                            Competitive Programming. But above all, I'm most interested in always learning more.
                        </p>
                        <div className={"flex flex-row justify-center gap-6 p-6 w-full"}>
                            <a href={"https://linkedin.com/in/raybbian"} target={"_blank"}>
                                <FaLinkedin size={48}
                                            className={"hover:text-koi-red transition-colors duration-150 ease-in-out"}/>
                            </a>
                            <a href={"https://github.com/raybbian"} target={"_blank"}>
                                <FaGithub size={48}
                                          className={"hover:text-koi-red transition-colors duration-150 ease-in-out"}/>
                            </a>
                            <a href={`${process.env.PUBLIC_URL}/resume.pdf`} target={"_blank"}>
                                <FaFile size={48}
                                        className={"hover:text-koi-red transition-colors duration-150 ease-in-out"}/>
                            </a>
                        </div>
                    </div>
                    <div ref={stageTwoRef} className={"py-4"}>
                        <div className={"py-6"}>
                            <p className={"top-0 text-4xl font-semibold"}>Projects</p>
                            <div className={"h-[2px] w-[30%] mb-4 mt-2 bg-slate-600"}></div>
                        </div>
                        <div className={"grid gap-6"}>
                            <ProjectEntry
                                title={"Garden of Growth"}
                                detail={"The website you are looking at right now! Terrain generated with Wave Function Collapse, presented using React."}
                                link={"https://github.com/raybbian/garden-of-growth"}
                                src={`${process.env.PUBLIC_URL}/project-covers/garden-of-growth.webp`}
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
                                title={"USACO Checklist App"}
                                detail={"Sophisticated web scraper to pull problem progress and statistics from USACO, with sharable progress."}
                                link={"https://github.com/orgs/USACO-Checklist/repositories"}
                                src={`${process.env.PUBLIC_URL}/project-covers/usaco-checklist.png`}
                                left={true}
                            />
                            <ProjectEntry
                                title={"Prom Reservations"}
                                detail={"Simple and streamlined seating registration made with React and FastAPI for seating reservations during DAIS Prom 2023."}
                                link={"https://github.com/orgs/DAIS-Prom-2023/repositories"}
                                src={`${process.env.PUBLIC_URL}/project-covers/prom-reservations.png`}
                                left={false}
                            />
                        </div>
                    </div>
                    <div ref={stageThreeRef} className={"py-4"}>
                        <div className={"py-6"}>
                            <p className={"top-0 text-4xl font-semibold"}>Experience</p>
                            <div className={"h-[2px] w-[30%] mb-4 mt-2 bg-slate-600"}></div>
                        </div>
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
                                detail={"Lead developer and project manager for an organization-wide volunteer portal and tracker."}
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
                    <div ref={stageFourRef} className={"py-4"}>
                        <div className={"py-6"}>
                            <p className={"top-0 text-4xl font-semibold"}>Contact</p>
                            <div className={"h-[2px] w-[30%] mb-4 mt-2 bg-slate-600"}></div>
                        </div>
                        <div className={"grid place-items-center w-full"}>
                            <img alt={'headshot'} src={`${process.env.PUBLIC_URL}/img/contact.jpg`}
                                 className={"w-[40%] m-4 aspect-square rounded-full border-2 border-black object-cover"}/>
                        </div>
                        <p className={"text-lg"}>
                            I would love to be informed of any bugs, inquiries, and knowledge that you might have! I am
                            always
                            interested in learning about new things that I may have missed.
                            <br/>
                            <br/>
                            You can contact me at
                            <span> r</span>
                            <span>a</span>
                            <span>y</span>
                            <span>b</span>
                            <span>b</span>
                            <span>i</span>
                            <span>a</span>
                            <span>n</span>
                            <span>@gmail.com. </span>
                            Alternatively, you can use the form below:
                        </p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                axios({
                                    url: 'https://formspree.io/f/myyqvzae',
                                    method: 'post',
                                    headers: {
                                        'Accept': 'application/json'
                                    },
                                    data: {
                                        email: e.target[0].value,
                                        message: e.target[1].value
                                    }
                                }).then(() => {
                                    setFormSucceeded(true);
                                })
                            }}
                            className={"flex flex-col gap-6 mt-4 text-lg"}
                        >
                            <input type="email" name="email"
                                   className={"w-full border-2 border-black bg-cream py-2 px-4 hover:border-koi-red transition-colors duration-150 ease-in-out"}
                                   placeholder={"john.doe@gmail.com"}/>
                            <textarea name="message"
                                      className={"w-full border-2 border-black bg-cream py-2 px-4 hover:border-koi-red transition-colors duration-150 ease-in-out"}
                                      placeholder={"The quick brown fox jumps over the lazy dog."}></textarea>
                            <div className={"flex flex-row justify-end items-center gap-6"}>
                                <div className={`transition-opacity ${formSucceeded ? "opacity-100" : "opacity-0"}`}>
                                    <FaCheck size={48}/>
                                </div>
                                <button type="submit"
                                        className={"border-2 border-black p-2 w-1/4 justify-self-center hover:border-koi-red transition-colors duration-150 ease-in-out bg-cream"}>Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}