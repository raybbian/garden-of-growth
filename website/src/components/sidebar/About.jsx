import {FaFile, FaGithub, FaLinkedin} from "react-icons/fa6";

export default function About({elRef}) {
    return (
        <div ref={elRef} className={"flex flex-col gap-4"}>
            <p className={"top-0 text-3xl font-semibold"}>About Me</p>
            <div className={"grid place-items-center w-full"}>
                <img alt={'headshot'} src={`${process.env.PUBLIC_URL}/img/headshot.jpg`}
                     className={"w-[40%] hover:w-[45%] m-4 aspect-square rounded-full border-2 border-black object-cover transition-all duration-300 ease-in-out"}/>
            </div>
            <p className={"text-base mobile:text-sm"}>
                Hi! My name is Raymond Bian, and I'm a freshman studying computer science at Georgia Tech.
                Welcome to my website! I'm interested in a multitude of topics, ranging from AI/ML to NLP to
                Competitive Programming. But above all, I'm most interested in always learning more.
            </p>
            <div className={"flex flex-row justify-center gap-4 p-4 w-full"}>
                <a href={"https://linkedin.com/in/raybbian"} target={"_blank"} rel={"noreferrer"}>
                    <FaLinkedin size={48}
                                className={"hover:text-koi-red transition-colors duration-150 ease-in-out"}/>
                </a>
                <a href={"https://github.com/raybbian"} target={"_blank"} rel={"noreferrer"}>
                    <FaGithub size={48}
                              className={"hover:text-koi-red transition-colors duration-150 ease-in-out"}/>
                </a>
                <a href={`${process.env.PUBLIC_URL}/resume.pdf`} target={"_blank"} rel={"noreferrer"}>
                    <FaFile size={48}
                            className={"hover:text-koi-red transition-colors duration-150 ease-in-out"}/>
                </a>
            </div>
        </div>
    )
}