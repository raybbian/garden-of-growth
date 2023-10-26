import './App.css';
import Grid from "./components/Grid";
import Nav from "./components/Nav";
import {useState} from "react";
import Dev from "./components/Dev";


export default function App() {
    const [state, setState] = useState(0)

    return (
        <div className={"relative h-screen w-screen overflow-hidden bg-[#d7e4c2]"}>
            <Nav state={state} setState={setState}/>
            {state !== 4 && <Grid state={state} setState={setState}/>}
            {state === 4 && <Dev state={state} setState={setState}/>}
        </div>
    );
}