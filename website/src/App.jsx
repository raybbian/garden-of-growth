import './App.css';
import Grid from "./components/Grid";
import Nav from "./components/Nav";
import {useState} from "react";
import Sidebar from "./components/Sidebar";


export default function App() {
    const [state, setState] = useState(0)

    return (
        <div className={"relative h-screen w-screen overflow-hidden bg-[#d7e4c2] grid grid-cols-4 grid-rows-1 place-items-stretch"}>
            <Nav state={state} setState={setState}/>
            <div className={`${state === 0 ? "col-span-4": "col-span-3"} overflow-hidden w-full h-full select-none pointer-events-none`}>
                <Grid state={state} setState={setState}/>
            </div>
            <div className={`col-span-1`}>
                <Sidebar state={state} setState={setState}/>
            </div>
        </div>
    );
}