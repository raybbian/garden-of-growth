import axios from "axios";
import {FaCheck} from "react-icons/fa6";
import {useState} from "react";

export default function Contact({elRef}) {
    const [formSucceeded, setFormSucceeded] = useState(false);

    return (
        <div ref={elRef} className={"flex flex-col gap-4"}>
            <p className={"top-0 text-3xl font-semibold"}>Contact</p>
            <div className={"grid place-items-center w-full"}>
                <img alt={'headshot'} src={`${process.env.PUBLIC_URL}/img/contact.jpg`}
                     className={"w-[40%] hover:w-[45%] m-4 aspect-square rounded-full border-2 border-black object-cover transition-all duration-300 ease-in-out"}/>
            </div>
            <p className={"text-base mobile:text-sm"}>
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
                className={"flex flex-col gap-4 mt-4 text-base mobile:text-sm"}
            >
                <input type="email" name="email"
                       className={"w-full border-2 border-black bg-cream py-2 px-4 hover:border-koi-red transition-colors duration-150 ease-in-out"}
                       placeholder={"john.doe@gmail.com"}/>
                <textarea name="message"
                          className={"w-full border-2 border-black bg-cream py-2 px-4 hover:border-koi-red transition-colors duration-150 ease-in-out"}
                          placeholder={"The quick brown fox jumps over the lazy dog."}></textarea>
                <div className={"flex flex-row justify-end items-center gap-4"}>
                    <div className={`transition-opacity ${formSucceeded ? "opacity-100" : "opacity-0"}`}>
                        <FaCheck size={48}/>
                    </div>
                    <button type="submit"
                            className={"border-2 border-black p-2 w-1/4 justify-self-center hover:border-koi-red transition-colors duration-150 ease-in-out bg-cream"}>Send
                    </button>
                </div>
            </form>
        </div>
    )
}