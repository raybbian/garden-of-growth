import './App.css';
import Grid from "./components/Grid";
import Nav from "./components/Nav";
import {useState} from "react";
import Sidebar from "./components/Sidebar";


export default function App() {
    const [state, setState] = useState(0)

    return (
        <div className={"relative h-screen w-screen bg-[#d7e4c2] flex flex-col"}>
            <Nav state={state} setState={setState}/>
            <div className={"relative grow w-full"}>
                <div className={`absolute h-full ${state === 0 ? "w-full" : "w-[70%] left-[30%]"}`}>
                    <Grid state={state} setState={setState}/>
                </div>
                <div
                    className={`absolute top-0 left-0 h-full w-[30%] transition ease-in-out duration-300 ${state === 0 ? "-translate-x-[100%]" : ""}`}
                >
                    <Sidebar state={state} setState={setState}/>
                </div>
            </div>
        </div>
    );
}