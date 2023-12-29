import {FaFile, FaGithub, FaLinkedin} from "react-icons/fa6";

export default function About({elRef}) {
    return (
        <div ref={elRef} className={"flex flex-col gap-4"}>
            <p className={"top-0 text-4xl font-bold"}>About Me</p>
            <div className={"grid place-items-center w-full"}>
                <img alt={'headshot'} src={`${process.env.PUBLIC_URL}/img/headshot.jpg`}
                     className={"w-[40%] hover:w-[45%] m-4 aspect-square rounded-full border-2 border-black object-cover transition-all duration-300 ease-in-out"}/>
            </div>
            <p className={"text-lg"}>
                Hi! My name is <b>Raymond Bian</b>, and I'm a freshman studying computer science at <b>Georgia Tech</b>.
                I'm interested in a multitude of topics, ranging from AI/ML to Game Development, Computational
                Complexity to Competitive Programming. I also like to play Saxophone, Volleyball, and Video Games.
                Welcome to my website!
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