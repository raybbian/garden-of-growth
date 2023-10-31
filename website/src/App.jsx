import './App.css';
import Grid from "./components/Grid";
import Nav from "./components/Nav";
import {useEffect, useState} from "react";
import Sidebar from "./components/Sidebar";


export default function App() {
    const [state, setState] = useState(0)

    const [sidebarWidth, setSidebarWidth] = useState(Math.min(window.innerWidth * 0.30, 576))

    useEffect(() => {
        const handleResize = function () {
            setSidebarWidth(Math.min(window.innerWidth * 0.30, 576))
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    return (
        <div className={"relative h-screen w-screen bg-[#d7e4c2] flex flex-col overflow-hidden"}>
            <Nav state={state} setState={setState}/>
            <div className={"grow w-full min-h-0 flex flex-row"}>
                <div
                    className={`relative`}
                    style={{
                        transition: "width 300ms ease-in-out",
                        width: state === 0 ? "0px" : `${sidebarWidth}px`
                    }}
                >
                    <Sidebar state={state} setState={setState}/>
                </div>
                <div
                    className={`relative grow`}
                    style={{
                        transition: "max-width 300ms ease-in-out",
                    }}
                >
                    <Grid state={state} setState={setState}/>
                </div>
            </div>
        </div>
    );
}