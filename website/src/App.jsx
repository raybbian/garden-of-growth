import './App.css';
import Grid from "./components/Grid";
import Nav from "./components/Nav";
import {useState} from "react";
import Sidebar from "./components/Sidebar";


export default function App() {
    const [state, setState] = useState(0)

    return (
        <div className={"relative h-screen w-screen bg-[#d7e4c2] flex flex-col overflow-hidden"}>
            <Nav state={state} setState={setState}/>
            <div className={"grow w-full min-h-0 flex flex-row"}>
                <div
                    className={`relative ${state === 0 ? "w-0" : "w-[30%]"}`}
                    style={{
                        transition: "all 300ms ease-in-out"
                    }}
                >
                    <Sidebar state={state} setState={setState}/>
                </div>
                <div
                    className={`relative ${state === 0 ? "w-[100%]" : "w-[70%]"}`}
                    style={{
                        transition: "all 300ms ease-in-out"
                    }}
                >
                    <Grid state={state} setState={setState}/>
                </div>
            </div>
        </div>
    );
}