import './App.css';
import Grid from "./components/Grid";
import Nav from "./components/Nav";
import {useState} from "react";


export default function App() {
    const [state, setState] = useState(0)

    return (
        <div className={"relative h-screen w-screen overflow-hidden bg-[#d7e4c2]"}>
            <Nav state={state} setState={setState}/>
            <Grid state={state} setState={setState}/>
        </div>
    );
}